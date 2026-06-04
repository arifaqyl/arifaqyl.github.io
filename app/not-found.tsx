import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="section">
        <article className="content-card">
          <p className="eyebrow">404</p>
          <h1>That page does not exist.</h1>
          <p className="muted">
            The route may have moved during the rebuild from the old static portfolio to the new full-stack app.
          </p>
          <div className="hero-actions">
            <Link href="/" className="button-primary">
              Go home
            </Link>
            <Link href="/projects" className="button-secondary">
              Browse projects
            </Link>
          </div>
        </article>
      </section>
    </SiteShell>
  );
}

