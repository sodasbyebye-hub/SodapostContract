import { isSourcingRequestId } from "@/lib/leads";

export const MAX_REFERENCE_IMAGE_SIZE = 8 * 1024 * 1024;
export const SOURCING_UPLOAD_PREFIX = "sourcing-requests";

export function sanitizeUploadFilename(filename: string) {
  const normalized = filename.normalize("NFKD");
  const lastDot = normalized.lastIndexOf(".");
  const rawStem = lastDot > 0 ? normalized.slice(0, lastDot) : normalized;
  const rawExtension = lastDot > 0 ? normalized.slice(lastDot + 1) : "";
  const stem = rawStem
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "reference-image";
  const extension = rawExtension.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10).toLowerCase();

  return extension ? `${stem}.${extension}` : stem;
}

export function getReferenceImagePath(requestId: string, filename: string) {
  if (!isSourcingRequestId(requestId)) {
    throw new Error("Invalid sourcing request ID.");
  }

  return `${SOURCING_UPLOAD_PREFIX}/${requestId}/${sanitizeUploadFilename(filename)}`;
}

export function isReferenceImagePath(pathname: string, requestId?: string) {
  const parts = pathname.split("/");
  if (parts.length !== 3 || parts[0] !== SOURCING_UPLOAD_PREFIX || !isSourcingRequestId(parts[1])) {
    return false;
  }

  return Boolean(parts[2]) && (!requestId || parts[1] === requestId);
}
