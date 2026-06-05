export function LegacyPageFrame({
  src,
  title
}: {
  src: string;
  title: string;
}) {
  return (
    <main className="legacy-frame-shell">
      <iframe className="legacy-frame" src={src} title={title} loading="eager" />
    </main>
  );
}
