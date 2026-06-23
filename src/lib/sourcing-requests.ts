import "server-only";

import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { del } from "@vercel/blob";

import type { LeadStatus, SourcingLead } from "@/lib/leads";

export type CreateSourcingRequestInput = Omit<
  SourcingLead,
  "createdAt" | "updatedAt" | "status" | "notes"
>;

type DatabaseRow = Record<string, unknown>;

let sqlClient: NeonQueryFunction<false, false> | null = null;
let schemaPromise: Promise<void> | null = null;

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!sqlClient) {
    sqlClient = neon(databaseUrl);
  }

  return sqlClient;
}

async function ensureSchema() {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS sourcing_requests (
          id TEXT PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          name TEXT NOT NULL,
          company_name TEXT NOT NULL,
          email TEXT NOT NULL,
          whatsapp TEXT NOT NULL,
          country_market TEXT NOT NULL,
          selling_platform TEXT NOT NULL,
          product_category TEXT NOT NULL,
          product_description TEXT NOT NULL,
          target_quantity TEXT NOT NULL,
          target_price TEXT NOT NULL,
          service_plan TEXT NOT NULL DEFAULT '',
          need_custom_logo BOOLEAN NOT NULL DEFAULT FALSE,
          need_custom_packaging BOOLEAN NOT NULL DEFAULT FALSE,
          need_samples BOOLEAN NOT NULL DEFAULT FALSE,
          reference_image_name TEXT,
          reference_image_url TEXT,
          message TEXT NOT NULL DEFAULT '',
          status TEXT NOT NULL DEFAULT 'New',
          notes TEXT NOT NULL DEFAULT ''
        )
      `;
      await sql`ALTER TABLE sourcing_requests ADD COLUMN IF NOT EXISTS service_plan TEXT NOT NULL DEFAULT ''`;
      await sql`CREATE INDEX IF NOT EXISTS sourcing_requests_created_at_idx ON sourcing_requests (created_at DESC)`;
      await sql`CREATE INDEX IF NOT EXISTS sourcing_requests_status_idx ON sourcing_requests (status)`;
    })().catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }

  await schemaPromise;
}

function mapRow(row: DatabaseRow): SourcingLead {
  return {
    id: String(row.id),
    createdAt: new Date(String(row.created_at)).toISOString(),
    updatedAt: new Date(String(row.updated_at)).toISOString(),
    name: String(row.name),
    companyName: String(row.company_name),
    email: String(row.email),
    whatsapp: String(row.whatsapp),
    countryMarket: String(row.country_market),
    sellingPlatform: String(row.selling_platform),
    productCategory: String(row.product_category),
    productDescription: String(row.product_description),
    targetQuantity: String(row.target_quantity),
    targetPrice: String(row.target_price),
    servicePlan: String(row.service_plan ?? ""),
    needCustomLogo: Boolean(row.need_custom_logo),
    needCustomPackaging: Boolean(row.need_custom_packaging),
    needSamples: Boolean(row.need_samples),
    referenceImageName: row.reference_image_name ? String(row.reference_image_name) : undefined,
    referenceImageUrl: row.reference_image_url ? String(row.reference_image_url) : undefined,
    message: String(row.message ?? ""),
    status: String(row.status) as LeadStatus,
    notes: String(row.notes ?? ""),
  };
}

export async function createSourcingRequest(input: CreateSourcingRequestInput) {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    INSERT INTO sourcing_requests (
      id,
      name,
      company_name,
      email,
      whatsapp,
      country_market,
      selling_platform,
      product_category,
      product_description,
      target_quantity,
      target_price,
      service_plan,
      need_custom_logo,
      need_custom_packaging,
      need_samples,
      reference_image_name,
      reference_image_url,
      message
    ) VALUES (
      ${input.id},
      ${input.name},
      ${input.companyName},
      ${input.email},
      ${input.whatsapp},
      ${input.countryMarket},
      ${input.sellingPlatform},
      ${input.productCategory},
      ${input.productDescription},
      ${input.targetQuantity},
      ${input.targetPrice},
      ${input.servicePlan},
      ${input.needCustomLogo},
      ${input.needCustomPackaging},
      ${input.needSamples},
      ${input.referenceImageName ?? null},
      ${input.referenceImageUrl ?? null},
      ${input.message}
    )
    RETURNING *
  `;

  return mapRow(rows[0] as DatabaseRow);
}

export async function listSourcingRequests() {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`SELECT * FROM sourcing_requests ORDER BY created_at DESC`;
  return rows.map((row) => mapRow(row as DatabaseRow));
}

export async function updateSourcingRequestStatus(id: string, status: LeadStatus) {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    UPDATE sourcing_requests
    SET status = ${status}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return rows[0] ? mapRow(rows[0] as DatabaseRow) : null;
}

export async function updateSourcingRequestNotes(id: string, notes: string) {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    UPDATE sourcing_requests
    SET notes = ${notes}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return rows[0] ? mapRow(rows[0] as DatabaseRow) : null;
}

export async function deleteSourcingRequests(ids: string[]) {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    DELETE FROM sourcing_requests
    WHERE id IN (
      SELECT jsonb_array_elements_text(${JSON.stringify(ids)}::jsonb)
    )
    RETURNING id, reference_image_url
  `;

  const referenceImageUrls = rows
    .map((row) => (row.reference_image_url ? String(row.reference_image_url) : ""))
    .filter(Boolean);

  if (referenceImageUrls.length > 0) {
    try {
      await del(referenceImageUrls);
    } catch (error) {
      console.error("Unable to clean up deleted sourcing request blobs:", error);
    }
  }

  return rows.map((row) => String(row.id));
}
