# M.&T Credit Union — NONa+

A polished fictional/test financial dashboard built with React + TypeScript + Tailwind CSS + Supabase.

## Safety / scope

This project is intentionally non-financial infrastructure:
- No real banking networks.
- No real payment processors.
- No real bank accounts.
- No real card issuance.
- All balances and transactions are fictional/test data.
- The UI uses **NONa+** as the fictional environment label.
- Never collect real banking credentials.

## Run locally

1. Copy `.env.example` to `.env.local`.
2. Put your Supabase project URL and **anon/public** key in `.env.local`.
3. In Supabase SQL Editor, run `supabase/schema.sql`.
4. Create a fictional test user in Supabase Authentication.
5. Optionally use `supabase/seed.sql` to give that test account a fictional starting balance.
6. Install and run:

```bash
npm install
npm run dev
```

Build for deployment:

```bash
npm run build
npm run preview
```

## Test user

The requested `nona@example.test` / `NonaUser123!` credentials are intentionally **not hard-coded** into this repository. Create the user in Supabase Auth using that email and password if you want that exact test account. If email confirmation is enabled, confirm the fictional test address through your Supabase project workflow.

## Supabase security

- The browser receives only the public anon key.
- Service-role keys must remain server-side and are not used by this client.
- RLS is enabled on every private table.
- Role checks are enforced with database policies/functions.
- Users cannot update their own role.
- Monetary operations run through the `perform_nona_transaction` database function with row locking.
- Authentication passwords are managed by Supabase Auth and never stored in application tables.

## PWA

`public/manifest.webmanifest` is included. Add a service worker through your chosen PWA builder if it requires one; the manifest and responsive UI are ready for packaging.

## Production hardening checklist

Before any public deployment:
- Configure Supabase Auth email templates and redirect URLs.
- Keep database backups and migrations in source control.
- Add rate limiting / abuse controls at the edge or server layer.
- Add automated E2E tests.
- Review RLS with Supabase's policy tooling.
- Use HTTPS and secure deployment headers.
- Do not place privileged keys in Vite environment variables.
- Keep the product clearly fictional/test-only and do not represent it as a real financial institution.
