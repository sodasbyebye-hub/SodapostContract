import { statusOptions } from "@/lib/site-data";

export type LeadStatus = (typeof statusOptions)[number];

export type SourcingLead = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  companyName: string;
  email: string;
  whatsapp: string;
  countryMarket: string;
  sellingPlatform: string;
  productCategory: string;
  productCategoryDetail: string;
  productDescription: string;
  targetQuantity: string;
  targetPrice: string;
  servicePlan: string;
  needCustomLogo: boolean;
  needCustomPackaging: boolean;
  needSamples: boolean;
  referenceImageName?: string;
  referenceImageUrl?: string;
  message: string;
  status: LeadStatus;
  notes: string;
};

export const SOURCING_REQUEST_ID_PATTERN = /^SP-\d{13}-[0-9A-F]{8}$/;
const STORED_SOURCING_REQUEST_ID_PATTERN = /^SP-[0-9A-Z-]{8,64}$/;

export function createSourcingRequestId() {
  return `SP-${Date.now()}-${crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
}

export function isSourcingRequestId(value: string) {
  return SOURCING_REQUEST_ID_PATTERN.test(value);
}

export function isStoredSourcingRequestId(value: string) {
  return STORED_SOURCING_REQUEST_ID_PATTERN.test(value);
}
