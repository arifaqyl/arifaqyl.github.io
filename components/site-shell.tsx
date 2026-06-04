import Link from "next/link";
import { clsx } from "clsx";

const navItems = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/now", label: "now" },
  { href: "/contact", label: "contact" },
  { href: "/admin", label: "admin" }
];

export function SiteShell({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="site-bg">
      <header className="shell-header">
        <nav className="shell-nav">
          <Link href="/" className="brand">
            arif aqyl
          </Link>
          <div className="nav-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className={clsx("shell-main", className)}>{children}</main>
      <footer className="shell-footer">
        <div>
          <p>Built to explain the work, not just decorate it.</p>
          <p className="muted">Next.js + Prisma + PostgreSQL-ready portfolio system.</p>
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

