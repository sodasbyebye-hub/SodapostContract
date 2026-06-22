import { statusOptions } from "@/lib/site-data";

export type LeadStatus = (typeof statusOptions)[number];

export type SourcingLead = {
  id: string;
  createdAt: string;
  name: string;
  companyName: string;
  email: string;
  whatsapp: string;
  countryMarket: string;
  sellingPlatform: string;
  productCategory: string;
  productDescription: string;
  targetQuantity: string;
  targetPrice: string;
  needCustomLogo: boolean;
  needCustomPackaging: boolean;
  needSamples: boolean;
  referenceImageName?: string;
  message: string;
  status: LeadStatus;
  notes: string;
};

export const LOCAL_LEADS_KEY = "sodapost_sourcing_requests";

export const mockLeads: SourcingLead[] = [
  {
    id: "SP-1008",
    createdAt: "2026-06-14T09:30:00.000Z",
    name: "Maya Johnson",
    companyName: "Northline Goods",
    email: "maya@northline.example",
    whatsapp: "+1 415 555 0188",
    countryMarket: "United States",
    sellingPlatform: "Shopify",
    productCategory: "Outdoor & Travel",
    productDescription: "Foldable travel organizer with recycled fabric and retail packaging.",
    targetQuantity: "1,000 pcs",
    targetPrice: "$4.20",
    needCustomLogo: true,
    needCustomPackaging: true,
    needSamples: true,
    referenceImageName: "travel-organizer-reference.jpg",
    message: "Need options for premium fabric and compact carton size.",
    status: "Quoting",
    notes: "Send shortlist with recycled material options.",
  },
  {
    id: "SP-1007",
    createdAt: "2026-06-12T15:10:00.000Z",
    name: "Oliver Smith",
    companyName: "BrightPet Market",
    email: "oliver@brightpet.example",
    whatsapp: "+44 7700 900121",
    countryMarket: "United Kingdom",
    sellingPlatform: "Amazon",
    productCategory: "Pet Supplies",
    productDescription: "Adjustable dog grooming glove with branded header card.",
    targetQuantity: "2,500 pcs",
    targetPrice: "$1.35",
    needCustomLogo: true,
    needCustomPackaging: true,
    needSamples: false,
    referenceImageName: "pet-glove.png",
    message: "Looking for better stitching than current supplier.",
    status: "Sample Stage",
    notes: "Check two sample grades before bulk quote.",
  },
  {
    id: "SP-1006",
    createdAt: "2026-06-10T11:45:00.000Z",
    name: "Sofia Martinez",
    companyName: "GlowForm Studio",
    email: "sofia@glowform.example",
    whatsapp: "+34 600 123 456",
    countryMarket: "Spain",
    sellingPlatform: "TikTok Shop",
    productCategory: "Beauty Tools",
    productDescription: "Compact LED makeup mirror for creator bundles.",
    targetQuantity: "500 pcs",
    targetPrice: "$5.80",
    needCustomLogo: false,
    needCustomPackaging: true,
    needSamples: true,
    message: "Need CE documentation and giftable packaging.",
    status: "Contacted",
    notes: "Ask about plug/battery requirements.",
  },
];
