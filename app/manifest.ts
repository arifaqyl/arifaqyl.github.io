import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "arifaqyl.me",
    short_name: "arifaqyl",
    description: "Practical tools around information people need to trust — kedai operations, transit information, and developer tooling.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e1214",
    theme_color: "#0e1214",
    icons: [
      {
        src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><rect width='96' height='96' rx='18' fill='%230e1214'/><text x='50%25' y='58%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='48' fill='%23e07a5c'>a</text></svg>",
        sizes: "96x96",
        type: "image/svg+xml"
      }
    ]
  };
}

