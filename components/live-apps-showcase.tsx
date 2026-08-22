import Link from "next/link";

const LIVE_APPS = [
  {
    slug: "sah-bukti",
    title: "Sah.Bukti",
    eyebrow: "product · whatsapp",
    accent: "#fbbf24",
    summary:
      "Micro-seller ops agent for Malaysian WhatsApp commerce — review-gated ledger, PDF receipts, and month-end export.",
    signals: [
      { label: "Trust model", value: "review-gated" },
      { label: "Runtime", value: "DigitalOcean" },
      { label: "Surface", value: "FastAPI + React" }
    ],
    preview: ["order capture", "review queue", "ledger update", "pdf receipt"],
    liveUrl: "https://arifaqyl.me/sahbukti/",
    repoUrl: "https://github.com/arifaqyl/sah-bukti"
  },
  {
    slug: "trafficmy",
    title: "TrafficMY",
    eyebrow: "data product · gtfs",
    accent: "#38bdf8",
    summary:
      "National Malaysian transport board — official MyRapid alerts, GTFS bus telemetry, social signals, and negeri filters.",
    signals: [
      { label: "Refresh", value: "5m GTFS / 30m full" },
      { label: "Coverage", value: "national" },
      { label: "Stack", value: "Playwright + GTFS-RT" }
    ],
    preview: ["official alerts", "gtfs anomalies", "social ingest", "live map"],
    liveUrl: "https://arifaqyl.me/traffic/",
    repoUrl: "https://github.com/arifaqyl/aduanmy"
  }
] as const;

export function LiveAppsShowcase() {
  return (
    <div className="live-stage">
      <div className="live-stage-grid">
        {LIVE_APPS.map((app) => (
          <article
            key={app.slug}
            className="live-app-card"
            style={{ ["--live-accent" as string]: app.accent }}
          >
            <div className="live-app-top">
              <div className="live-app-head">
                <p className="eyebrow">{app.eyebrow}</p>
                <h3>{app.title}</h3>
                <p className="muted">{app.summary}</p>
              </div>
              <span className="live-app-status">live · 2026</span>
            </div>

            <div className="live-app-preview" aria-hidden="true">
              {app.preview.map((line) => (
                <div key={line} className="live-app-preview-row">
                  <span className="live-app-preview-dot" />
                  <span>{line}</span>
                </div>
              ))}
            </div>

            <div className="live-app-signals">
              {app.signals.map((signal) => (
                <div key={signal.label} className="live-app-signal">
                  <span>{signal.label}</span>
                  <strong>{signal.value}</strong>
                </div>
              ))}
            </div>

            <div className="live-app-actions">
              <Link href={app.liveUrl} className="button-primary" target="_blank" rel="noreferrer">
                Open live
              </Link>
              <Link href={app.repoUrl} className="button-secondary" target="_blank" rel="noreferrer">
                GitHub
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
