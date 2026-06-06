# arifaqyl.me

Full-stack portfolio app for Arif Aqyl.

This repo has been rebuilt from a single heavy GitHub Pages HTML site into a structured Next.js application with:

- Next.js App Router
- TypeScript
- Prisma
- PostgreSQL-ready content model
- owner-only admin scaffold
- case-study project pages
- interactive project explainer cards on the homepage
- contact submissions
- metadata, sitemap, robots, and analytics hooks

The live root page now works as a project-first landing page:

- homepage intro
- interactive project documentation
- current focus / now sections
- contact and legacy-view links

## Stack

- Next.js
- React
- TypeScript
- Prisma
- PostgreSQL
- NextAuth (GitHub login)
- Vercel-ready deployment model

## Routes

- `/`
- `/projects`
- `/projects/[slug]`
- `/now`
- `/contact`
- `/admin`

## Local setup

```bash
npm install
cp .env.example .env
```

Fill in:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `GITHUB_ID`
- `GITHUB_SECRET`
- `ADMIN_GITHUB_LOGINS`
- `NEXT_PUBLIC_SITE_URL`

Then:

```bash
npm run prisma:generate
npm run dev
```

Optional database seed:

```bash
npm run seed
```

## Notes

- Public pages fall back to seeded in-memory content when the database is not configured.
- Write actions such as contact submission persistence and admin CRUD require a real database.
- Admin GitHub login is scaffolded and gated by allowlisted GitHub usernames.
- The old visual homepage still exists under `/legacy/index.html` if you want the previous full-screen version.
