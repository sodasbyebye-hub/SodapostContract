# SodaPost

SodaPost is a multilingual B2B sourcing website for global retailers, wholesalers, brands, and online sellers. Buyers can submit private sourcing requests, including reference images, while an authenticated admin dashboard supports review, filtering, status updates, internal notes, and CSV export.

## Stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4 and shadcn/ui
- Neon/Postgres for sourcing requests
- Vercel Blob for public reference-image storage
- Signed httpOnly cookie authentication for the shared admin account

## Local development

```bash
pnpm install
cp .env.local.example .env.local
pnpm dev
```

Required environment variables:

```dotenv
DATABASE_URL="postgresql://..."
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
ADMIN_PASSWORD="..."
ADMIN_SESSION_SECRET="..."
```

`ADMIN_SESSION_SECRET` should be a long random value. Never commit `.env.local`.

## Verification

```bash
pnpm lint
pnpm build
pnpm start
```

The public content pages can build without live storage access. Submitting a request and opening `/admin` require the corresponding Neon, Blob, and admin environment variables.

## Sourcing request flow

1. Pricing cards link to `/sourcing-request?plan=<stable-plan-value>` so the matching service plan and price option is preselected in the form.
2. The browser validates an optional reference image and uploads it directly to Vercel Blob using a short-lived, path-restricted token. Images must use an image MIME type and be no larger than 8 MB.
3. The form sends the remaining fields, the required service plan, and Blob metadata to `/api/sourcing-requests`.
4. The server validates the fields and Blob metadata, creates or extends the table if needed, and inserts the request into Neon/Postgres.
5. If persistence fails after a verified upload, the server deletes that Blob.

## Admin

- Visit `/admin/login` and sign in with `ADMIN_PASSWORD`.
- Successful login creates the signed `sodapost_admin_session` cookie for seven days.
- `/admin` reads live requests dynamically; status and note mutations re-check the signed session on the server.
- Reference-image Blob URLs are public. Anyone with the original URL can access an uploaded image.

The project does not currently include email/CRM notifications, multiple admin accounts, audit history, a supplier portal, rate limiting, or a formal migration system.

## WhatsApp placeholder

The floating WhatsApp button still uses a placeholder `wa.me` number. Replace it in `src/components/whatsapp-floating-button.tsx` before production launch.
