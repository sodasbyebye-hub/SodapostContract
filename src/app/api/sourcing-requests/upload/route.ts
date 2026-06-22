import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

import {
  isReferenceImagePath,
  MAX_REFERENCE_IMAGE_SIZE,
} from "@/lib/sourcing-upload";

export const runtime = "nodejs";

class UploadRequestError extends Error {}

export async function POST(request: Request) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error("BLOB_READ_WRITE_TOKEN is not configured.");
    }

    const body = (await request.json()) as HandleUploadBody;
    const response = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname) => {
        if (!isReferenceImagePath(pathname)) {
          throw new UploadRequestError("Invalid upload pathname.");
        }

        return {
          allowedContentTypes: ["image/*"],
          maximumSizeInBytes: MAX_REFERENCE_IMAGE_SIZE,
          addRandomSuffix: true,
          allowOverwrite: false,
          tokenPayload: pathname,
        };
      },
    });

    return Response.json(response);
  } catch (error) {
    if (error instanceof UploadRequestError) {
      return Response.json({ error: "Invalid upload request." }, { status: 400 });
    }

    console.error("Unable to authorize sourcing request upload:", error);
    return Response.json({ error: "Unable to authorize upload." }, { status: 500 });
  }
}
