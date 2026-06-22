# SodaPost

Premium B2B sourcing agency website for SodaPost, a China sourcing partner for global e-commerce sellers.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui primitives
- Framer Motion
- Local mock data and browser localStorage for demo lead capture

## Pages

- `/`
- `/services`
- `/how-it-works`
- `/product-categories`
- `/pricing`
- `/case-studies`
- `/about`
- `/contact`
- `/sourcing-request`
- `/admin`

## Local Development

```bash
pnpm install
pnpm dev
```

Build and lint:

```bash
pnpm lint
pnpm build
```

## Demo Behavior

The sourcing request form validates required buyer and product fields, shows:

> Thank you. Our sourcing team will review your request and contact you within 24 hours.

Submitted leads are stored in browser `localStorage` under `sodapost_sourcing_requests`. The `/admin` page combines those local submissions with seeded mock leads.

The admin dashboard is intentionally open for demo purposes. It is not production authentication.

## Production Notes

This demo does not include a real database, email delivery, CRM sync, file upload storage, supplier portal, or authentication. A production version should add:

- Server-side lead persistence
- Secure admin authentication
- Email or CRM notifications
- Real file storage for reference images
- Audit/history for status and notes changes

The site is buyer-facing and does not publicly list supplier contact information.

## WhatsApp Placeholder

The floating WhatsApp button currently uses a placeholder `wa.me` link. Replace it with the official SodaPost number before production use.
