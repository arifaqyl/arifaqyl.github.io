import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell>
      <section className="section">
        <div className="admin-grid">
          <aside className="admin-nav">
            <Link href="/admin">overview</Link>
            <Link href="/admin/projects">projects</Link>
            <Link href="/admin/timeline">timeline</Link>
            <Link href="/admin/awards">awards</Link>
            <Link href="/admin/contact">contact</Link>
            <Link href="/admin/settings">settings</Link>
          </aside>
          <div>{children}</div>
        </div>
      </section>
    </SiteShell>
  );
}

