import { getTimelineEntries } from "@/lib/repository";

export default async function AdminTimelinePage() {
  const timeline = await getTimelineEntries();
  return (
    <section className="admin-card">
      <div className="admin-card-head">
        <div>
          <p className="eyebrow">timeline</p>
          <h2>Timeline entries</h2>
        </div>
        <p className="muted">Read-backed from the content layer and ready for admin CRUD expansion.</p>
      </div>
      <div className="admin-stack">
        {timeline.map((entry) => (
          <article key={entry.title} className="content-card">
            <h3>{entry.title}</h3>
            <p className="muted">{entry.organization}</p>
            <p className="muted">{entry.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

