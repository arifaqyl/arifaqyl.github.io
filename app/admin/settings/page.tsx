import { getSiteSettings } from "@/lib/repository";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return (
    <section className="admin-card">
      <div className="admin-card-head">
        <div>
          <p className="eyebrow">settings</p>
          <h2>Site settings</h2>
        </div>
        <p className="muted">SEO and contact defaults are now structured records instead of inline HTML constants.</p>
      </div>
      <div className="admin-stack">
        {settings.map((setting) => (
          <article key={setting.key} className="content-card">
            <h3>{setting.key}</h3>
            <pre className="code-card">{JSON.stringify(setting.valueJson, null, 2)}</pre>
          </article>
        ))}
      </div>
    </section>
  );
}

