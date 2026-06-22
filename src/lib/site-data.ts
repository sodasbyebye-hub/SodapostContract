import {
  BadgeCheck,
  Boxes,
  ClipboardCheck,
  Factory,
  Globe2,
  PackageCheck,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Category = {
  title: string;
  description: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export type CaseStudy = {
  company: string;
  category: string;
  result: string;
  summary: string;
};

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/product-categories", label: "Categories" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const trustHighlights = [
  "Verified supplier shortlists",
  "Sample and packaging coordination",
  "Pre-shipment inspection support",
  "Shipping-ready documentation",
];

export const services: Service[] = [
  {
    title: "Product Sourcing",
    description:
      "Turn product ideas, screenshots, or competitor references into qualified sourcing options from China.",
    icon: Search,
  },
  {
    title: "Supplier Matching",
    description:
      "Get matched with factories and trading partners suited to your category, quantity, and market.",
    icon: Factory,
  },
  {
    title: "Supplier Verification",
    description:
      "Review business scope, export experience, product fit, and operational signals before you commit.",
    icon: ShieldCheck,
  },
  {
    title: "Sample Arrangement",
    description:
      "Coordinate samples, compare quality, collect feedback, and refine product requirements before bulk orders.",
    icon: PackageCheck,
  },
  {
    title: "Private Label & Packaging",
    description:
      "Develop logo placement, retail-ready packaging, inserts, barcodes, and channel-specific presentation.",
    icon: Sparkles,
  },
  {
    title: "Quality Inspection",
    description:
      "Set inspection checkpoints for materials, workmanship, packaging, cartons, and pre-shipment readiness.",
    icon: ClipboardCheck,
  },
  {
    title: "Shipping Coordination",
    description:
      "Coordinate pickup, consolidation, documentation, and freight options with your forwarder or ours.",
    icon: Plane,
  },
];

export const categories: Category[] = [
  {
    title: "Apparel & Fashion",
    description: "Seasonal basics, activewear, accessories, and custom apparel programs.",
  },
  {
    title: "Sun Protection Clothing",
    description: "UPF styles, lightweight outdoor layers, hats, sleeves, and beach-market products.",
  },
  {
    title: "Beauty Tools",
    description: "Brushes, organizers, skincare tools, mirrors, and salon-ready accessories.",
  },
  {
    title: "Pet Supplies",
    description: "Pet travel, grooming, toys, feeders, carriers, and private label accessories.",
  },
  {
    title: "Home & Kitchen",
    description: "Kitchen gadgets, storage, decor, cleaning tools, and lifestyle essentials.",
  },
  {
    title: "Outdoor & Travel",
    description: "Travel organizers, camping accessories, bags, bottles, and portable gear.",
  },
  {
    title: "Car Accessories",
    description: "Interior organizers, cleaning tools, phone mounts, and comfort accessories.",
  },
  {
    title: "Phone Accessories",
    description: "Cases, stands, chargers, lens kits, cables, and social commerce bundles.",
  },
  {
    title: "Fitness Products",
    description: "Resistance bands, recovery tools, home workout accessories, and gym add-ons.",
  },
  {
    title: "TikTok Viral Products",
    description: "Fast-moving trend products with packaging, sample, and shipping coordination.",
  },
];

export const processSteps = [
  {
    title: "Submit your request",
    description:
      "Share your product idea, target market, quantity, price range, sales channel, and reference images.",
  },
  {
    title: "Review qualified options",
    description:
      "We research matching suppliers, compare fit, and prepare a shortlist or sourcing report.",
  },
  {
    title: "Validate samples and packaging",
    description:
      "We coordinate samples, logo requirements, packaging details, and quality expectations.",
  },
  {
    title: "Move into production and shipping",
    description:
      "We help track production, inspection, cartons, documents, and shipping coordination.",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free Request",
    price: "$0",
    description: "Best for first conversations and quick feasibility checks.",
    features: ["Submit product details", "Initial review", "Recommended next step"],
  },
  {
    name: "Supplier Matching",
    price: "from $49",
    description: "Best for buyers who need vetted supplier options quickly.",
    features: ["Supplier shortlist", "Basic requirement matching", "Buyer-ready summary"],
    highlighted: true,
  },
  {
    name: "Sourcing Report",
    price: "from $99",
    description: "Best for comparing product options before samples or negotiation.",
    features: ["Category research", "Supplier comparison", "Pricing and MOQ notes"],
  },
  {
    name: "Custom Sourcing Project",
    price: "custom price",
    description: "Best for private label, complex packaging, or multi-SKU sourcing.",
    features: ["Dedicated sourcing workflow", "Sampling support", "Inspection and shipping coordination"],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    company: "Outdoor retail brand",
    category: "Sun protection clothing",
    result: "3 sample rounds completed before summer launch",
    summary:
      "SodaPost helped compare fabric, UPF claims, logo placement, and packaging options across multiple qualified factories.",
  },
  {
    company: "Beauty products wholesaler",
    category: "Beauty tools",
    result: "Private label packaging prepared for first bulk order",
    summary:
      "The buyer received supplier matching, sample consolidation, insert-card guidance, and inspection checkpoints.",
  },
  {
    company: "Pet accessories retailer",
    category: "Pet supplies",
    result: "Supplier risk reduced before re-order",
    summary:
      "We reviewed supplier fit, sample quality, carton requirements, and freight coordination for an upgraded product line.",
  },
];

export const platformOptions = [
  "Retail Store",
  "Wholesale Distribution",
  "Chain Store",
  "Brand / Private Label",
  "Shopify",
  "TikTok Shop",
  "Amazon",
  "Etsy",
  "eBay",
  "Walmart Marketplace",
  "Other",
];

export const statusOptions = [
  "New",
  "Contacted",
  "Quoting",
  "Sample Stage",
  "In Production",
  "Completed",
  "Lost",
] as const;

export const metrics = [
  { label: "Core sourcing stages", value: "7" },
  { label: "Buyer markets supported", value: "Global" },
  { label: "Response window", value: "24h" },
];

export const pageVisuals = [
  { icon: Globe2, label: "Global buyer context" },
  { icon: Boxes, label: "Product and packaging review" },
  { icon: BadgeCheck, label: "Supplier fit checks" },
  { icon: Truck, label: "Shipping coordination" },
];
