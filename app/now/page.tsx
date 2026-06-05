import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { getNowUpdates } from "@/lib/repository";

export const metadata = {
  title: "Now",
  description: "What Arif Aqyl is focused on right now."
};

export default async function NowPage() {
  const updates = await getNowUpdates();

  return (
    <SiteShell>
      <section className="section">
        <SectionHeading
          eyebrow="now"
          title="What I'm focused on right now."
          description="This page stays lighter than the main portfolio. It is more like a current direction log than a full resume."
        />
        <div className="admin-stack">
          {updates.map((update) => (
            <article key={update.title} className="content-card">
              <p className="eyebrow">{update.tag ?? "update"}</p>
              <h3>{update.title}</h3>
              <p className="muted">{update.body}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
