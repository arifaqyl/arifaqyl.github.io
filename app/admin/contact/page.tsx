import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";

export default async function AdminContactPage() {
  let submissions: Array<{
    id: string;
    subject: string;
    name: string;
    email: string;
    message: string;
  }> = [];
  if (env.databaseConfigured) {
    try {
      submissions = await prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 20
      });
    } catch {
      submissions = [];
    }
  }

  return (
    <section className="admin-card">
      <div className="admin-card-head">
        <div>
          <p className="eyebrow">contact</p>
          <h2>Recent submissions</h2>
        </div>
        <p className="muted">
          {env.databaseConfigured
            ? "Stored contact form messages appear here."
            : "Connect PostgreSQL to persist and review contact submissions."}
        </p>
      </div>
      <div className="admin-stack">
        {submissions.length ? (
          submissions.map((entry) => (
            <article key={entry.id} className="content-card">
              <h3>{entry.subject}</h3>
              <p className="muted">{entry.name} · {entry.email}</p>
              <p className="muted">{entry.message}</p>
            </article>
          ))
        ) : (
          <article className="content-card">
            <h3>No messages yet</h3>
            <p className="muted">Once the database is connected and the contact form is used, messages will show up here.</p>
          </article>
        )}
      </div>
    </section>
  );
}
