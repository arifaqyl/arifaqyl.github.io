"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { ScrollProgress } from "@/components/scroll-progress";
import { useLocale } from "@/components/locale";

const navItems = [
  { href: "/", key: "nav.home" },
  { href: "/#live", key: "nav.live" },
  { href: "/projects", key: "nav.projects" },
  { href: "/now", key: "nav.now" },
  { href: "/contact", key: "nav.contact" }
];

function LocaleToggle() {
  const { toggle, t } = useLocale();
  return (
    <button
      type="button"
      className="locale-toggle"
      onClick={toggle}
      aria-label={t("locale.toggle-to")}
    >
      {t("locale.label")}
    </button>
  );
}

function Chrome({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { t } = useLocale();
  return (
    <div className="site-bg">
      <a href="#main" className="skip-link">
        {t("a11y.skip")}
      </a>
      <ScrollProgress />
      <header className="shell-header">
        <nav className="shell-nav" aria-label="Primary">
          <Link href="/" className="brand" aria-label="Arif Aqyl — home">
            arif aqyl
          </Link>
          <div className="nav-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {t(item.key)}
              </Link>
            ))}
            <Link href="https://github.com/arifaqyl" target="_blank" rel="noreferrer">
              {t("nav.github")}
            </Link>
            <LocaleToggle />
          </div>
        </nav>
      </header>
      <main id="main" className={clsx("shell-main", className)} tabIndex={-1}>
        {children}
      </main>
      <footer className="shell-footer">
        <div>
          <p>{t("footer.tagline")}</p>
          <p className="muted">{t("footer.stack")}</p>
        </div>
        <div className="footer-links">
          <Link href="https://github.com/arifaqyl" target="_blank" rel="noreferrer">
            GitHub
          </Link>
          <Link href="https://linkedin.com/in/arifaqyl" target="_blank" rel="noreferrer">
            LinkedIn
          </Link>
          <Link href="mailto:hello@arifaqyl.me">Email</Link>
        </div>
      </footer>
    </div>
  );
}

export function SiteShell({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <Chrome className={className}>{children}</Chrome>;
}
