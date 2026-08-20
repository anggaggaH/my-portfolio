# AGENTS.md — my-portfolio

> **Read this first.** This file is the source of truth for any AI agent (Cursor, Copilot, etc.) working in this repository. It describes what this app is, how it is structured, and how to change it safely.

---

## Project Summary

**my-portfolio** is the personal portfolio website for **Angga Hermawan**, a web developer with 6+ years of experience.

| | |
|---|---|
| **Live site** | https://anggahermawan.com |
| **Purpose** | Online resume + personal brand hub |
| **Owner email** | anggah.net@gmail.com |
| **GitHub** | https://github.com/anggaggaH |
| **LinkedIn** | https://linkedin.com/in/angga-hermawan/ |

The site showcases projects (CMS-driven), skills, career timeline, and a contact form. It is deployed on **Vercel**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack in dev) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS 3, SCSS utility classes, shadcn/ui conventions |
| Animation | Framer Motion |
| CMS | Sanity v3 (headless) |
| Data fetching | Server-side GROQ fetch + TanStack React Query (client hooks) |
| Email | EmailJS |
| Security | Google reCAPTCHA v3 |
| Analytics | Google Analytics (G-51HCY01QZ4) |
| Icons | lucide-react, react-icons |
| Lightbox | yet-another-react-lightbox |
| Particles | react-tsparticles / tsparticles-slim |

---

## Repository Layout

```
my-portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages & layouts
│   │   ├── layout.tsx          # Root layout (metadata, Analytics, ClientLayout)
│   │   ├── page.tsx            # Homepage
│   │   ├── clientLayout.tsx    # Client shell: Header, React Query, AnimatePresence
│   │   ├── globals.css         # Tailwind + CSS variables (shadcn-style tokens)
│   │   ├── styles.scss         # Shared utility classes (.container-page, etc.)
│   │   ├── contact/            # Redirects to /#get-in-touch
│   │   └── projects/           # Projects list + [slug] detail pages
│   ├── components/             # React components (sections, UI, cards)
│   │   └── contact/            # Shared ContactForm (EmailJS + reCAPTCHA)
│   ├── content/                # Static homepage copy (about, career, CTA)
│   ├── hooks/                  # Custom hooks + Sanity query helpers
│   │   └── sanity/             # Server-side GROQ fetch functions
│   ├── lib/                    # Utilities (sanity client, queryClient, cn)
│   ├── providers/              # React Query provider
│   ├── sanity/                 # Sanity config scaffold (env, client, live, structure)
│   └── types/                  # Shared TypeScript types
├── studio/                     # Standalone Sanity Studio (separate package)
│   ├── sanity.config.ts
│   └── schemaTypes/            # CMS schema (project document)
├── public/                     # Static assets (images, SVGs)
├── sanity.cli.ts               # Sanity CLI config (root)
├── tailwind.config.ts
├── next.config.ts
├── components.json               # shadcn/ui config
└── package.json
```

**Path alias:** `@/*` → `./src/*` (configured in `tsconfig.json`).

---

## Routes & Pages

| Route | File | Type | Description |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Server | Homepage — hero, about, featured projects, skills, career, get in touch |
| `/projects` | `src/app/projects/page.tsx` | Server | All projects list with hover preview |
| `/projects/[slug]` | `src/app/projects/[slug]/page.tsx` | Server | Single project detail (SSR metadata + client UI) |
| `/contact` | `src/app/contact/page.tsx` | Client redirect | Redirects to `/#get-in-touch` (form lives on homepage) |
| `/studio` | `studio/` (separate app) | Sanity Studio | CMS admin — run from `studio/` directory |

### Homepage section order (`HomeWrapper.tsx`)

1. `ScrollManager` — handles hash-based scroll (e.g. `/#about-section`, `/#get-in-touch`)
2. `HomeHero` — full-screen hero (particles on desktop only)
3. `AboutSection` — bio + profile image (`id="about-section"`)
4. `FeaturedProjects` — up to 4 Sanity projects where `favorite == true` (`id="featured-projects"`)
5. `SkillsSection` — static tech stack badges (`id="skills"`)
6. `CareerTimeline` — static career data (`id="career"`)
7. `GetInTouchSection` — EmailJS form + social links (`id="get-in-touch"`)

> **Note:** `CertificatesSection` exists but is commented out on the homepage.

---

## Architecture Patterns

### Server vs Client Components

This project follows Next.js App Router conventions:

- **Server components (default):** Page files, `HomeWrapper`, `FeaturedProjects`, data fetching wrappers.
- **Client components (`'use client'`):** Anything with hooks, Framer Motion, browser APIs, interactivity.

**Naming convention:** Client wrappers use `.client.tsx` suffix:
- `FeaturedProjects.tsx` (server) → `FeaturedProjects.client.tsx` (client)
- `Projects.client.tsx`, `page.client.tsx`

When adding new interactive sections, prefer this split: server component fetches data, client component renders UI.

### Data Fetching — Two Paths

There are **two Sanity clients** — be aware of which one you use:

| Client | Location | Used by |
|---|---|---|
| `@/lib/sanity` | `src/lib/sanity.ts` | `projectQueries.ts`, `projectQuery.ts`, `useProjects`, `useProject` |
| `@/sanity/lib/client` | `src/sanity/lib/client.ts` | Sanity live API scaffold (not wired into pages yet) |

**Preferred for pages:** Server-side functions in `src/hooks/sanity/`:
- `getProjects({ favoriteOnly?, limit?, sort? })` — list query with cache tags
- `getProject({ slug })` — single project by slug

**Client hooks** (React Query) exist but pages primarily use server fetch:
- `useProjects()` — client-side project list
- `useProject(slug)` — client-side single project

GROQ queries use `_type == "project"` and order by `date`.

### Caching & Revalidation

Server fetches use Next.js cache tags:
```typescript
next: { tags: ['projects'] }        // list
next: { tags: [`project-${slug}`] }  // single project
```

Use `revalidateTag('projects')` or `revalidateTag('project-{slug}')` when implementing on-demand revalidation webhooks from Sanity.

### Layout Shell

```
RootLayout (server)
  ├── Analytics (GA script)
  ├── RouteChangeTracker (GA page views on route change)
  └── ClientLayout (client)
        ├── ReactQueryClientProvider (keyed by pathname)
        ├── Header (fixed nav, slide-out menu)
        └── {children}
```

`ClientLayout` disables browser scroll restoration and wraps each route in `AnimatePresence`.

---

## Sanity CMS

### Schema — `project` document (`studio/schemaTypes/project.ts`)

| Field | Type | Notes |
|---|---|---|
| `title` | string | |
| `slug` | slug | Generated from title |
| `overview`, `problem`, `solution`, `result` | text | Case study content |
| `technologies`, `features`, `challenges` | string[] | |
| `projectLink`, `githubLink` | url | Not currently rendered on detail page |
| `mainImage` | image | Required for cards/list |
| `gallery` | image[] | Lightbox on detail page |
| `date` | date | Used for sorting |
| `favorite` | boolean | `true` = shown on homepage |
| `location` | string | Displayed as country/region on cards |

### Running Sanity Studio

```bash
cd studio
npm install
npm run dev        # local studio
npm run deploy     # deploy hosted studio
```

Studio env vars (in `studio/.env`):
- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`

Root `sanity.cli.ts` reads `NEXT_PUBLIC_SANITY_*` for CLI commands from project root.

### TypeScript type

`src/types/project.ts` defines the `Project` type used across components. Keep it in sync with GROQ projections.

---

## Environment Variables

All env files are gitignored (`.env*`). Required variables:

### Next.js app (`.env.local`)

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=2025-04-22   # optional, has defaults

# EmailJS (contact form)
NEXT_PUBLIC_EMAIL_SERVICE=
NEXT_PUBLIC_EMAIL_TEMPLATE=
NEXT_PUBLIC_EMAIL_PUBLIC_KEY=

# reCAPTCHA v3
NEXT_PUBLIC_CAPTCHA_SITE_KEY=

# Optional
NEXT_PUBLIC_MODE=production   # controls Sanity CDN in src/lib/sanity.ts
```

### Sanity Studio (`studio/.env`)

```bash
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=
```

**Never commit secrets.** Warn the user if they ask to commit `.env` files.

---

## Styling Conventions

### Tailwind

- Config: `tailwind.config.ts` — scans `src/app/**` and `src/components/**`
- Font: Geist Sans / Geist Mono via Google Fonts in `globals.css`
- Color scheme: shadcn/ui CSS variables (light/dark tokens defined, dark mode class-based)

### SCSS utility classes (`src/app/styles.scss`)

| Class | Purpose |
|---|---|
| `.container-page` | Standard page container (padding, max-width) |
| `.section-container` | Homepage section width/padding |
| `.section-title` | Centered page heading |
| `.btn` | Cursor pointer for buttons |

Use these existing classes before inventing new layout wrappers.

### shadcn/ui

Project is configured for shadcn (`components.json`, `cn()` in `src/lib/utils.ts`). Only `button.tsx` is partially customized. New shadcn components go in `src/components/ui/`.

### Animation

Framer Motion is used extensively:
- `whileInView` + `viewport={{ once: true }}` for scroll reveals
- `AnimatePresence` for route/menu transitions
- Staggered children via `staggerChildren`

Match existing animation patterns when adding sections.

---

## Key Components Reference

| Component | Location | Role |
|---|---|---|
| `Header` | `components/Header.tsx` | Fixed nav, hamburger menu, hash scroll to about |
| `HomeHero` | `components/HomeHero.tsx` | Particle background hero |
| `AboutSection` | `components/AboutSection.tsx` | Bio — uses `/images/profile.jpeg` |
| `CareerTimeline` | `components/CareerTimeline.tsx` | Static timeline data (edit inline) |
| `SkillsSection` | `components/SkillsSection.tsx` | Static skill badges (edit inline) |
| `FeaturedProjects` | `components/FeaturedProjects.tsx` | Server fetch → client cards |
| `FeaturedProjectCard` | `components/ui/Card/FeaturedProjectCard.tsx` | Project card for homepage |
| `ProjectsClient` | `components/Projects.client.tsx` | Projects list with cursor-following preview |
| `ProjectHero` | `components/ui/Card/ProjectHero.tsx` | Detail page hero with blurred bg |
| `GetInTouchSection` | `components/GetInTouchSection.tsx` | Homepage contact form (`#get-in-touch`) |
| `ContactForm` | `components/contact/ContactForm.tsx` | EmailJS + reCAPTCHA form |
| `PageWrapper` | `components/ui/PageWrapper.tsx` | Fade-in page transition wrapper |
| `SectionWrapper` | `components/ui/SectionWrapper.tsx` | Homepage section with divider |
| `ScrollManager` | `components/ui/ScrollManager.tsx` | Hash scroll on homepage load |
| `ScrollToTop` | `components/ui/ScrollToTop.tsx` | Scroll-to-top button |
| `Analytics` | `components/Analytics.tsx` | GA4 initialization |
| `RouteChangeTracker` | `components/RouteChangeTracker.tsx` | GA4 SPA page tracking |

---

## Development Commands

```bash
# Root — Next.js app
npm install
npm run dev       # next dev --turbopack  → http://localhost:3000
npm run build     # production build
npm run start     # serve production build
npm run lint      # ESLint (eslint-config-next)

# Studio — Sanity CMS (separate terminal)
cd studio && npm install && npm run dev
```

### Image domains

`next.config.ts` allows images from `cdn.sanity.io`. Add new domains there if integrating other CDNs.

---

## Code Conventions for Agents

### Do

- Use `@/` path alias for all imports from `src/`
- Keep server/client split — fetch on server, animate on client
- Use existing utility classes (`.container-page`, `.section-container`)
- Every UI/UX change must be mobile responsive: verify small-screen layout (<=640px) for padding/overflow and touch target sizing
- Overlays/drawers must portal to `document.body`. Do not nest `position: fixed` menus inside a header that uses `backdrop-filter` / `transform` (those trap stacking and hide the panel)
- Match Framer Motion patterns already in sibling components
- Add metadata exports to new pages (see `projects/page.tsx` for SEO pattern)
- Use `clsx` / `cn()` for conditional Tailwind classes
- Prefer server-side `getProjects` / `getProject` for page data

### Don't

- Don't add unnecessary abstractions or helper files for one-off logic
- Don't commit `.env` files or hardcode API keys
- Don't use `useProject`/`useProjects` on server components — use `hooks/sanity/` functions instead
- Don't modify `studio/` schema without updating GROQ queries and `Project` type
- Don't remove cache tags from Sanity fetches without a replacement strategy
- Don't create markdown/docs files unless explicitly requested

### Metadata pattern (new pages)

```typescript
export const metadata = {
  title: 'Page Title',
  description: '...',
  keywords: ['...'],
  openGraph: { title: '...', description: '...', url: 'https://anggahermawan.com/...', type: 'website' },
  twitter: { card: 'summary_large_image', title: '...', description: '...' },
};
```

Root layout uses template: `'%s | Angga Hermawan'`.

---

## Known Quirks & Gotchas

1. **Two Sanity clients** — `src/lib/sanity.ts` (active) vs `src/sanity/lib/client.ts` (scaffold). Pages use `@/lib/sanity`.
2. **Dual API version defaults** — `env.ts` defaults to `2025-04-22`, `lib/sanity.ts` defaults to `2023-05-03`. Set `NEXT_PUBLIC_SANITY_API_VERSION` explicitly.
3. **CDN toggle mismatch** — `lib/sanity.ts` uses `NEXT_PUBLIC_MODE === 'production'`; `sanity/lib/client.ts` uses `NODE_ENV === 'production'`.
4. **Profile image** — `AboutSection` references `/images/profile.jpeg` in `public/images/`. Ensure this file exists locally.
5. **`FeaturedProjectCard`** uses the modern Next.js Image API (`fill` + `object-cover`).
6. **Sanity Live** — `src/sanity/lib/live.ts` is scaffolded but `<SanityLive />` is not mounted in the layout.
7. **`page.client.tsx`** imports `next/head` — ineffective in App Router; metadata is handled in `page.tsx` server component.
8. **Static content** — About, career (with outcomes), hero, and get-in-touch copy live in `src/content/home.ts`; skills icons stay in `SkillsSection.tsx`.
9. **Certificates section** — component exists (`CertificatesSection.tsx`) but is disabled on homepage.
10. **Contact route** — `/contact` client-redirects to `/#get-in-touch` (hash must use client redirect; HTTP redirects drop fragments).
11. **Homepage section rhythm** — alternate `SectionWrapper` backgrounds (`white` / `gray` / `gradient`); Featured Projects uses a spotlight card + compact grid.

---

## Common Agent Tasks

### Add a new homepage section
1. Create component in `src/components/`
2. Add to `HomeWrapper.tsx` inside a `SectionWrapper`
3. Use `'use client'` only if animations/interactivity needed

### Add/edit a project (content)
Use Sanity Studio (`cd studio && npm run dev`) — no code changes needed unless adding new fields.

### Add a new Sanity field
1. Update `studio/schemaTypes/project.ts`
2. Update GROQ in `projectQueries.ts` and `projectQuery.ts`
3. Update `src/types/project.ts`
4. Render in `page.client.tsx` or card components

### Add a new page
1. Create folder under `src/app/{route}/page.tsx`
2. Add metadata export
3. Wrap content in `PageWrapper` for consistent transitions
4. Add nav link in `Header.tsx` if needed

### Update skills or career info
Edit data in `SkillsSection.tsx` (skills + icons) and `src/content/home.ts` (career + about + get-in-touch copy).

### Update contact/social links
- Content/links: `src/content/home.ts`
- Header menu: `Header.tsx`
- Form: `components/contact/ContactForm.tsx`
- About section CTAs: `AboutSection.tsx`

---

## Deployment

- **Platform:** Vercel
- **Production URL:** https://anggahermawan.com
- Set all `NEXT_PUBLIC_*` env vars in Vercel project settings
- Sanity Studio can be deployed separately via `cd studio && npm run deploy`

---

## Analytics

- **GA4 Measurement ID:** `G-51HCY01QZ4`
- Initialized in `Analytics.tsx`, page views tracked in `RouteChangeTracker.tsx`
- Global type for `window.gtag` in `src/types/gtag.d.ts`

---

*Last updated: August 2026. Update this file when making architectural changes, adding routes, or changing data-fetching patterns.*
