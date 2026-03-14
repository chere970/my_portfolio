# Connect Portfolio

A modern developer portfolio built with React, TypeScript, Vite, and Tailwind CSS, with contact form submissions handled through Supabase Edge Functions.

## Features

- Single-page portfolio with sections for hero, about, skills, projects, experience, and contact
- Smooth UI animations with Framer Motion
- Reusable UI components based on Radix UI + shadcn/ui patterns
- Contact form wired to Supabase Edge Function (`contact-form`)
- Client-side routing with React Router
- Basic test setup with Vitest and Testing Library

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- Supabase JavaScript client (`@supabase/supabase-js`)
- TanStack Query
- Vitest

## Project Structure

```text
src/
  components/              # UI and page sections
  data/                    # Portfolio content data
  integrations/supabase/   # Supabase client setup
  pages/                   # Route-level pages
  test/                    # Test setup and sample test
```

## Prerequisites

- Node.js 18+ (or Bun)
- A Supabase project
- A deployed Supabase Edge Function named `contact-form`

## Environment Variables

Create a `.env` file in the project root with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Notes:

- The app reads these values in `src/integrations/supabase/client.ts`.
- `VITE_` prefix is required for values exposed to the Vite frontend.

## Install and Run

### Using npm

```bash
npm install
npm run dev
```

### Using Bun

```bash
bun install
bun run dev
```

Open `http://localhost:5173` after the dev server starts.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## Supabase Edge Function Contract

The contact form invokes:

- Function name: `contact-form`
- Invocation: `supabase.functions.invoke("contact-form", { body: formData })`
- Expected payload shape:

```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

Ensure your edge function is deployed and handles CORS for your frontend origin.

## Build and Deploy

1. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your deployment environment.
2. Build the app:

```bash
npm run build
```

3. Deploy the generated `dist/` folder to your hosting provider (Vercel, Netlify, Cloudflare Pages, etc.).

## Troubleshooting

- `Failed to send message. Please try again.`
  - Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` values.
  - Confirm `contact-form` edge function is deployed and reachable.
  - Check Supabase function logs for runtime errors.
- Blank page or build errors:
  - Run `npm run lint` and `npm run test`.
  - Remove `node_modules` and reinstall dependencies.

## License

This project is private by default (`"private": true` in `package.json`). Add a license section if you plan to publish it publicly.
