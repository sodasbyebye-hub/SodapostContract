import { requireAdminSession } from "@/lib/admin-auth";
import {
  adminExportFormats,
  createAdminExport,
  type AdminExportFormat,
  type AdminExportPayload,
} from "@/lib/admin-export";

export const runtime = "nodejs";

const contentTypes: Record<AdminExportFormat, string> = {
  csv: "text/csv; charset=utf-8",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pdf: "application/pdf",
};

class ExportValidationError extends Error {}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
  } catch {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const input = (await request.json()) as Record<string, unknown>;
    const format = String(input.format ?? "") as AdminExportFormat;
    if (!adminExportFormats.includes(format)) {
      throw new ExportValidationError("Invalid export format.");
    }

    const payload = validatePayload(input);
    const output = await createAdminExport(format, payload);
    const date = new Date().toISOString().slice(0, 10);
    const filename = `sodapost-sourcing-requests-${date}.${format}`;

    return new Response(new Uint8Array(output), {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(output.byteLength),
        "Content-Type": contentTypes[format],
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (error instanceof ExportValidationError) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    console.error("Unable to export sourcing requests:", error);
    return Response.json({ error: "Unable to export sourcing requests." }, { status: 500 });
  }
}

function validatePayload(input: Record<string, unknown>): AdminExportPayload {
  const title = cleanText(input.title, 200);
  const generatedAt = cleanText(input.generatedAt, 100);
  const columns = Array.isArray(input.columns) ? input.columns.map((value) => cleanText(value, 200)) : [];
  const rows = Array.isArray(input.rows)
    ? input.rows.map((row) => {
        if (!Array.isArray(row)) throw new ExportValidationError("Invalid export rows.");
        return row.map((value) => cleanText(value, 20_000));
      })
    : [];

  if (!title || !generatedAt || columns.length === 0 || columns.length > 30 || rows.length > 5_000) {
    throw new ExportValidationError("Invalid export data.");
  }
  if (rows.some((row) => row.length !== columns.length)) {
    throw new ExportValidationError("Export rows do not match the columns.");
  }

  const totalCharacters =
    title.length +
    generatedAt.length +
    columns.reduce((total, value) => total + value.length, 0) +
    rows.reduce((total, row) => total + row.reduce((rowTotal, value) => rowTotal + value.length, 0), 0);
  if (totalCharacters > 4_000_000) {
    throw new ExportValidationError("The export is too large.");
  }

  return { title, generatedAt, columns, rows };
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") throw new ExportValidationError("Invalid export text.");
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").slice(0, maxLength);
}
