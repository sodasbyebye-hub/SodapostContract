import { del, head, type HeadBlobResult } from "@vercel/blob";

import { isSourcingRequestId } from "@/lib/leads";
import { categories, isPricingPlanValue, platformOptions } from "@/lib/site-data";
import { createSourcingRequest } from "@/lib/sourcing-requests";
import {
  isReferenceImagePath,
  MAX_REFERENCE_IMAGE_SIZE,
} from "@/lib/sourcing-upload";

export const runtime = "nodejs";

class RequestValidationError extends Error {}

const requiredFields = [
  "name",
  "companyName",
  "email",
  "whatsapp",
  "countryMarket",
  "sellingPlatform",
  "productCategory",
  "productDescription",
  "targetQuantity",
  "targetPrice",
  "servicePlan",
] as const;

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getBoolean(formData: FormData, key: string) {
  const value = formData.get(key);
  return value === "true" || value === "on" || value === "1";
}

async function deleteUploadedBlob(blob: HeadBlobResult | null) {
  if (!blob) return;

  try {
    await del(blob.url);
  } catch (error) {
    console.error("Unable to clean up sourcing request blob:", error);
  }
}

export async function POST(request: Request) {
  let verifiedBlob: HeadBlobResult | null = null;

  try {
    const formData = await request.formData();
    const id = getText(formData, "id");
    const referenceImageUrl = getText(formData, "referenceImageUrl");
    const referenceImageName = getText(formData, "referenceImageName");

    if (!isSourcingRequestId(id)) {
      throw new RequestValidationError("Invalid sourcing request ID.");
    }

    if (referenceImageUrl || referenceImageName) {
      if (!referenceImageUrl || !referenceImageName || !process.env.BLOB_READ_WRITE_TOKEN) {
        throw new RequestValidationError("Incomplete image metadata.");
      }

      try {
        verifiedBlob = await head(referenceImageUrl);
      } catch {
        throw new RequestValidationError("Reference image was not found.");
      }

      if (
        !isReferenceImagePath(verifiedBlob.pathname, id) ||
        !verifiedBlob.contentType.startsWith("image/") ||
        verifiedBlob.size > MAX_REFERENCE_IMAGE_SIZE
      ) {
        throw new RequestValidationError("Invalid reference image.");
      }
    }

    const values = Object.fromEntries(requiredFields.map((key) => [key, getText(formData, key)])) as Record<
      (typeof requiredFields)[number],
      string
    >;

    if (requiredFields.some((key) => !values[key])) {
      throw new RequestValidationError("Missing required fields.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      throw new RequestValidationError("Invalid email address.");
    }

    if (!platformOptions.includes(values.sellingPlatform)) {
      throw new RequestValidationError("Invalid selling platform.");
    }

    if (!categories.some((category) => category.title === values.productCategory)) {
      throw new RequestValidationError("Invalid product category.");
    }

    if (!isPricingPlanValue(values.servicePlan)) {
      throw new RequestValidationError("Invalid service plan.");
    }

    await createSourcingRequest({
      id,
      ...values,
      needCustomLogo: getBoolean(formData, "needCustomLogo"),
      needCustomPackaging: getBoolean(formData, "needCustomPackaging"),
      needSamples: getBoolean(formData, "needSamples"),
      referenceImageName: verifiedBlob ? referenceImageName.slice(0, 255) : undefined,
      referenceImageUrl: verifiedBlob?.url,
      message: getText(formData, "message"),
    });

    return Response.json({ id }, { status: 201 });
  } catch (error) {
    await deleteUploadedBlob(verifiedBlob);

    if (error instanceof RequestValidationError) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    console.error("Unable to create sourcing request:", error);
    return Response.json({ error: "Unable to submit sourcing request." }, { status: 500 });
  }
}
