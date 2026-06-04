import { getAwards } from "@/lib/repository";

export default async function AdminAwardsPage() {
  const awards = await getAwards();
  return (
    <section className="admin-card">
      <div className="admin-card-head">
        <div>
          <p className="eyebrow">awards</p>
          <h2>Awards and highlights</h2>
        </div>
        <p className="muted">Structured content is already separated from layout and ready for deeper admin editing.</p>
      </div>
      <div className="admin-stack">
        {awards.map((award) => (
          <article key={award.title} className="content-card">
            <h3>{award.title}</h3>
            <p className="muted">{award.eventName} · {award.year}</p>
            <p className="muted">{award.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

