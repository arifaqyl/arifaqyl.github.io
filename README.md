# arifaqyl.me

Full-stack portfolio app for Arif Aqyl.

This repo contains two related surfaces:

- the original Manus-style GitHub Pages homepage, kept as the public visual front door
- a structured Next.js application with the same content model underneath

The public homepage keeps the original visual style and now includes a project section so the site is easier to read:

- homepage intro
- shipped work cards
- interactive project index / detail viewer
- current focus / now sections
- contact and legacy-view links
- the old visual sections are still intact

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
- The old visual homepage is the public front door, with a project index/detail viewer integrated into it.
- The richer Next.js app still exists in the repo for the droplet deployment and backend routes.
