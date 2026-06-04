export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  adminLogins: (process.env.ADMIN_GITHUB_LOGINS || "arifaqyl")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean),
  githubConfigured: Boolean(process.env.GITHUB_ID && process.env.GITHUB_SECRET),
  databaseConfigured: Boolean(process.env.DATABASE_URL),
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || ""
};

