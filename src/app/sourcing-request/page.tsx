import { SourcingRequestPageContent } from "@/components/sourcing-request-page-content";
import { isPricingPlanValue, type PricingPlanValue } from "@/lib/site-data";

type SourcingRequestPageProps = {
  searchParams: Promise<{ plan?: string | string[] }>;
};

export default async function SourcingRequestPage({ searchParams }: SourcingRequestPageProps) {
  const { plan } = await searchParams;
  const initialServicePlan: PricingPlanValue | "" =
    typeof plan === "string" && isPricingPlanValue(plan) ? plan : "";

  return <SourcingRequestPageContent initialServicePlan={initialServicePlan} />;
}
