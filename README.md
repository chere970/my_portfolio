# Connect Portfolio

A modern portfolio application built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

It includes:

- A single-page public portfolio (hero, about, skills, projects, experience, contact)
- A contact form backed by a Supabase Edge Function
- An internal admin editor route for updating site content in browser storage

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS + shadcn/ui style components
- Framer Motion
- Supabase JavaScript client (`@supabase/supabase-js`)
- React Router
- TanStack Query
- Vitest + Testing Library

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_EDITOR_PASSCODE=change-this-in-local-and-prod
```

3. Start the app:

```bash
npm run dev
```

4. Open `http://localhost:5173`.

## Routes

- `/` - Public portfolio page
- `/internal/admin` - Internal content editor

The admin editor requires a passcode (`VITE_ADMIN_EDITOR_PASSCODE`).
If this env var is missing, the app falls back to a default passcode (`change-me`), which is not secure for production.

## Environment Variables

- `VITE_SUPABASE_URL`
  - Supabase project URL
- `VITE_SUPABASE_ANON_KEY`
  - Supabase anon/public key used by the frontend client
- `VITE_ADMIN_EDITOR_PASSCODE`
  - Passcode for `/internal/admin`

All frontend-exposed variables must start with `VITE_`.

## Contact Form Integration

The contact section invokes this Edge Function:

- Function name: `contact-form`
- Client call: `supabase.functions.invoke("contact-form", { body: formData })`
- Payload:

```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

Make sure the function is deployed and CORS is configured for your frontend origin.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run build:dev` - Build using development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```text
src/
  components/              # Section components and shared UI
  context/                 # Site content context and persistence
  data/                    # Seed/default portfolio content
  integrations/supabase/   # Supabase client setup
  pages/                   # Route pages (public + admin)
  test/                    # Test setup and examples
```

## Deployment Notes

1. Set all required `VITE_` environment variables in your hosting platform.
2. Build with:

```bash
npm run build
```

3. Deploy the generated `dist/` directory.
4. Ensure the Supabase `contact-form` function is reachable from the deployed origin.

## Troubleshooting

- Contact form shows `Failed to send message. Please try again.`
  - Check `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
  - Verify `contact-form` is deployed
  - Inspect Supabase Edge Function logs
- Admin editor cannot unlock
  - Verify `VITE_ADMIN_EDITOR_PASSCODE` value in your runtime environment
  - Restart dev server after changing `.env`
- Build/runtime issues
  - Run `npm run lint`
  - Run `npm run test`
  - Reinstall dependencies if needed

## License

This project is marked private in `package.json`.
