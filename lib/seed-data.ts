import { ProjectSeed, SiteSectionContent } from "@/lib/types";

export const siteSections: SiteSectionContent[] = [
  {
    key: "hero",
    title: "I build practical systems that solve annoying, real-world problems.",
    subtitle:
      "Software Engineering student at UniKL MIIT building automation, backend tools, AI-assisted systems, and production-shaped experiments.",
    body:
      "This portfolio is now structured like a product surface instead of a static poster. The goal is simple: let people understand what I built, how I built it, and why it matters."
  },
  {
    key: "about",
    title: "Backend-minded builder with a bias for shipping.",
    subtitle:
      "I like projects that connect infrastructure, automation, data, and user experience into something useful.",
    body:
      "My best work usually starts with friction: repetitive editing, noisy signals, scattered deadlines, or systems that look impressive but are hard to operate. I build tools that reduce that friction and make the workflow cleaner."
  },
  {
    key: "contact",
    title: "Let’s build something real.",
    subtitle:
      "Open to internship opportunities in backend engineering, automation, and applied AI.",
    body:
      "If you want to talk about internships, projects, or systems work, send a message. I care most about learning fast, building useful things, and making technical work feel operationally sharp."
  }
];

export const nowUpdates = [
  {
    title: "Rebuilding my portfolio into a full-stack case-study system",
    body:
      "Moving from a single heavy HTML page to a structured app with database-backed content, project case studies, and admin-managed sections.",
    tag: "active",
    isActive: true,
    orderIndex: 1
  },
  {
    title: "Pushing AI trading research toward something operationally serious",
    body:
      "Working on paper-validated analyzers, evidence-backed market context, and execution/risk structure instead of hype-only predictions.",
    tag: "research",
    isActive: true,
    orderIndex: 2
  },
  {
    title: "Refining automation tools that save time in repetitive media workflows",
    body:
      "Improving video automation and clip-extraction tools so they behave more like real products instead of one-off scripts.",
    tag: "shipping",
    isActive: true,
    orderIndex: 3
  }
];

export const timelineEntries = [
  {
    title: "Software Engineering Student",
    organization: "UniKL MIIT",
    startDate: new Date("2024-09-01"),
    endDate: null,
    description:
      "Current focus on practical systems, automation, backend-heavy tooling, and shipping real portfolio-grade projects.",
    mediaSrc: "/media/unikl.jpg",
    orderIndex: 1
  },
  {
    title: "Pre-University",
    organization: "Kolej MARA Kuala Nerang",
    startDate: new Date("2023-01-01"),
    endDate: new Date("2024-01-01"),
    description:
      "Built momentum across technical competitions, academic work, and team collaboration.",
    mediaSrc: "/media/kmkn.jpg",
    orderIndex: 2
  },
  {
    title: "School Foundation",
    organization: "MRSM Gerik",
    startDate: new Date("2018-01-01"),
    endDate: new Date("2022-12-31"),
    description:
      "Developed the habit of building, competing, and learning in public through STEM programs and events.",
    mediaSrc: "/media/mrsm.jpg",
    orderIndex: 3
  }
];

export const awards = [
  {
    title: "Champion",
    eventName: "SCOUT STEMBoree MRSM Se-Malaysia 2022",
    year: 2022,
    description: "Won first place in a national-level STEM competition.",
    imageSrc: "/media/stemboree.jpg",
    orderIndex: 1
  },
  {
    title: "2nd Place",
    eventName: "iOS App Ideation & Prototyping MRSM 2023",
    year: 2023,
    description: "Built and pitched an app idea that placed second.",
    imageSrc: "/media/stemideation2nd.jpg",
    orderIndex: 2
  },
  {
    title: "Committee",
    eventName: "FYP Innovation Showcase UniKL MIIT 2026",
    year: 2026,
    description: "Helped organize and run a university-level final year showcase.",
    imageSrc: "/media/fypcommittee.jpg",
    orderIndex: 3
  }
];

export const projects: ProjectSeed[] = [
  {
    slug: "arifaqyl-me",
    title: "arifaqyl.me",
    summary:
      "A custom portfolio system rebuilt from a heavy static page into a structured full-stack case-study site.",
    status: "live",
    year: 2026,
    visibility: "public",
    featured: true,
    liveUrl: "https://arifaqyl.me",
    repoUrl: "https://github.com/arifaqyl/arifaqyl.github.io",
    category: "web platform",
    accent: "#CCFF00",
    sortOrder: 1,
    technologies: [
      { name: "Next.js", slug: "nextjs", category: "frontend" },
      { name: "TypeScript", slug: "typescript", category: "language" },
      { name: "Prisma", slug: "prisma", category: "backend" },
      { name: "PostgreSQL", slug: "postgresql", category: "database" }
    ],
    metrics: [
      { label: "Render mode", value: "SSR + SSG", orderIndex: 1 },
      { label: "Admin model", value: "single-owner", orderIndex: 2 },
      { label: "Goal", value: "case-study clarity", orderIndex: 3 }
    ],
    media: [
      {
        type: "image",
        src: "/media/og-image.jpg",
        alt: "Open graph preview for arifaqyl.me",
        width: 1200,
        height: 630,
        orderIndex: 1,
        isCover: true
      }
    ],
    tabs: [
      {
        key: "overview",
        label: "Overview",
        orderIndex: 1,
        richContent: [
          { type: "paragraph", text: "This site exists to explain the work, not just show polished visuals. The rebuild turns the portfolio into a content system with real structure, admin-managed sections, and project depth." },
          { type: "list", items: ["Server-rendered public pages", "SQL-backed project content", "Admin-managed homepage sections", "SEO-first metadata and structured data"] }
        ]
      },
      {
        key: "problem",
        label: "Problem",
        orderIndex: 2,
        richContent: [
          { type: "paragraph", text: "The previous site looked good, but it was a large single HTML file with expensive effects, weak maintainability, and shallow project storytelling." },
          { type: "quote", text: "A portfolio should help people understand the systems you built, not just the animations you shipped." }
        ]
      },
      {
        key: "architecture",
        label: "Architecture",
        orderIndex: 3,
        richContent: [
          { type: "paragraph", text: "The new architecture uses Next.js App Router, Prisma, PostgreSQL, route-based case studies, server-rendered metadata, and an owner-only admin surface." },
          { type: "code", title: "Routing shape", snippet: "/\n/projects\n/projects/[slug]\n/now\n/contact\n/admin" }
        ]
      },
      {
        key: "build",
        label: "Build Process",
        orderIndex: 4,
        richContent: [
          { type: "list", items: ["Migrated hardcoded content into structured seed data", "Replaced expensive always-on effects with progressive enhancement", "Built data-backed project tabs instead of giant accordions", "Made the site deployable as a real app instead of a static dump"] }
        ]
      },
      {
        key: "challenges",
        label: "Challenges",
        orderIndex: 5,
        richContent: [
          { type: "paragraph", text: "The hardest part was preserving the original personality while removing the parts that were costly, fragile, or overly decorative." }
        ]
      },
      {
        key: "results",
        label: "Results",
        orderIndex: 6,
        richContent: [
          { type: "list", items: ["Cleaner performance profile", "Clearer recruiter-facing narrative", "Maintainable content model", "Future-ready admin and analytics scaffolding"] }
        ]
      },
      {
        key: "stack",
        label: "Stack / Links",
        orderIndex: 7,
        richContent: [
          { type: "paragraph", text: "Next.js, React, TypeScript, Prisma, PostgreSQL, Vercel, Cloudflare." }
        ]
      }
    ]
  },
  {
    slug: "vlog-automation",
    title: "Vlog Automation",
    summary:
      "AI-assisted editing workflow that trims dead air, scores segments, and renders cleaner long-form video output.",
    status: "live",
    year: 2026,
    visibility: "public",
    featured: true,
    repoUrl: "https://github.com/arifaqyl/vlog-automation",
    category: "automation",
    accent: "#93c5fd",
    sortOrder: 2,
    technologies: [
      { name: "Python", slug: "python", category: "language" },
      { name: "FFmpeg", slug: "ffmpeg", category: "media" },
      { name: "faster-whisper", slug: "faster-whisper", category: "ai" },
      { name: "CUDA", slug: "cuda", category: "compute" }
    ],
    metrics: [
      { label: "Processed footage", value: "40", suffix: "+ hrs", orderIndex: 1 },
      { label: "Mode presets", value: "3", orderIndex: 2 },
      { label: "Workflow", value: "overnight", orderIndex: 3 }
    ],
    media: [
      {
        type: "image",
        src: "/media/aerodance.jpg",
        alt: "Representative media-oriented project cover",
        width: 927,
        height: 1086,
        orderIndex: 1,
        isCover: true
      }
    ],
    tabs: [
      {
        key: "overview",
        label: "Overview",
        orderIndex: 1,
        richContent: [
          { type: "paragraph", text: "This tool turns raw OBS or long-form creator footage into cleaner edits by automating the repetitive first pass." }
        ]
      },
      {
        key: "problem",
        label: "Problem",
        orderIndex: 2,
        richContent: [
          { type: "paragraph", text: "Manual editing eats hours on silence trimming, dead air cleanup, and repeated export steps." }
        ]
      },
      {
        key: "architecture",
        label: "Architecture",
        orderIndex: 3,
        richContent: [
          { type: "list", items: ["Audio transcription", "Segment scoring", "Topic grouping", "FFmpeg render pass", "Subtitle generation"] }
        ]
      },
      {
        key: "build",
        label: "Build Process",
        orderIndex: 4,
        richContent: [
          { type: "paragraph", text: "Built around practical creator pain: fast enough to use repeatedly, simple enough to run locally, and structured enough to improve over time." }
        ]
      },
      {
        key: "challenges",
        label: "Challenges",
        orderIndex: 5,
        richContent: [
          { type: "list", items: ["Balancing cut aggressiveness vs context", "Handling different genres", "Keeping render/transcription pipelines stable"] }
        ]
      },
      {
        key: "results",
        label: "Results",
        orderIndex: 6,
        richContent: [
          { type: "paragraph", text: "What used to take creators a day of repetitive editing can be turned into an overnight automated pass." }
        ]
      },
      {
        key: "stack",
        label: "Stack / Links",
        orderIndex: 7,
        richContent: [
          { type: "paragraph", text: "Python, faster-whisper, FFmpeg, CUDA. Public repo available on GitHub." }
        ]
      }
    ]
  },
  {
    slug: "clip-finder",
    title: "Clip Finder",
    summary:
      "Highlight extraction tool for long recordings using audio energy, motion cues, and automated clipping logic.",
    status: "live",
    year: 2026,
    visibility: "public",
    featured: true,
    repoUrl: "https://github.com/arifaqyl/clip-finder",
    category: "automation",
    accent: "#f9a8d4",
    sortOrder: 3,
    technologies: [
      { name: "Python", slug: "python", category: "language" },
      { name: "NumPy", slug: "numpy", category: "data" },
      { name: "FFmpeg", slug: "ffmpeg", category: "media" }
    ],
    metrics: [
      { label: "Typical source", value: "2-3", suffix: " hrs", orderIndex: 1 },
      { label: "Output goal", value: "90", suffix: " sec", orderIndex: 2 },
      { label: "Processed footage", value: "50", suffix: "+ hrs", orderIndex: 3 }
    ],
    media: [
      {
        type: "image",
        src: "/media/compostifymodel.jpg",
        alt: "Representative visual for a technical builder project",
        width: 940,
        height: 564,
        orderIndex: 1,
        isCover: true
      }
    ],
    tabs: [
      { key: "overview", label: "Overview", orderIndex: 1, richContent: [{ type: "paragraph", text: "Clip Finder scans long recordings and pulls likely highlight moments quickly enough to be useful as a repeatable workflow." }] },
      { key: "problem", label: "Problem", orderIndex: 2, richContent: [{ type: "paragraph", text: "Interesting moments are sparse and buried inside hours of footage, making manual search slow and inconsistent." }] },
      { key: "architecture", label: "Architecture", orderIndex: 3, richContent: [{ type: "list", items: ["Audio energy heuristics", "Motion detection", "Grouping and ranking", "Automated clip output"] }] },
      { key: "build", label: "Build Process", orderIndex: 4, richContent: [{ type: "paragraph", text: "The focus was not on fancy ML claims but on fast heuristic wins that creators would actually use." }] },
      { key: "challenges", label: "Challenges", orderIndex: 5, richContent: [{ type: "list", items: ["False positives from noisy segments", "Genre-specific pacing", "Balancing speed and clip quality"] }] },
      { key: "results", label: "Results", orderIndex: 6, richContent: [{ type: "paragraph", text: "The tool reduces the search phase dramatically and gives a useful first pass toward a final highlight reel." }] },
      { key: "stack", label: "Stack / Links", orderIndex: 7, richContent: [{ type: "paragraph", text: "Python, NumPy, FFmpeg. Public repo available on GitHub." }] }
    ]
  },
  {
    slug: "github-auto-sorter",
    title: "GitHub Auto-Sorter",
    summary:
      "Java-based automation for cleaning and organizing a public GitHub profile with GitHub API data.",
    status: "live",
    year: 2025,
    visibility: "public",
    featured: false,
    repoUrl: "https://github.com/arifaqyl/github-auto-sorter",
    category: "backend",
    accent: "#fcd34d",
    sortOrder: 4,
    technologies: [
      { name: "Java", slug: "java", category: "language" },
      { name: "Maven", slug: "maven", category: "tooling" },
      { name: "GitHub API", slug: "github-api", category: "api" }
    ],
    metrics: [
      { label: "Runtime", value: "CLI", orderIndex: 1 },
      { label: "API surface", value: "GitHub REST", orderIndex: 2 }
    ],
    media: [],
    tabs: [
      { key: "overview", label: "Overview", orderIndex: 1, richContent: [{ type: "paragraph", text: "A small backend-minded utility for keeping repo metadata and public profile organization more systematic." }] },
      { key: "problem", label: "Problem", orderIndex: 2, richContent: [{ type: "paragraph", text: "Public GitHub profiles get noisy quickly when repo naming, descriptions, and visibility cues drift over time." }] },
      { key: "architecture", label: "Architecture", orderIndex: 3, richContent: [{ type: "paragraph", text: "Built as a standalone Java tool with Maven and GitHub API integration." }] },
      { key: "build", label: "Build Process", orderIndex: 4, richContent: [{ type: "paragraph", text: "The point was operational cleanliness: less manual profile upkeep, more consistency." }] },
      { key: "challenges", label: "Challenges", orderIndex: 5, richContent: [{ type: "paragraph", text: "API data quality and repo-by-repo rules make automation straightforward in concept but annoying in detail." }] },
      { key: "results", label: "Results", orderIndex: 6, richContent: [{ type: "paragraph", text: "Useful for enforcing a cleaner public repo surface and metadata discipline." }] },
      { key: "stack", label: "Stack / Links", orderIndex: 7, richContent: [{ type: "paragraph", text: "Java 17, Maven, GitHub REST API." }] }
    ]
  },
  {
    slug: "student-bot",
    title: "Student Bot",
    summary:
      "Private automation stack that consolidates VLE deadlines, WhatsApp group noise, and daily digest workflows into Telegram.",
    status: "private",
    year: 2026,
    visibility: "private",
    featured: true,
    category: "automation",
    accent: "#86efac",
    sortOrder: 5,
    technologies: [
      { name: "Python", slug: "python", category: "language" },
      { name: "SQLite", slug: "sqlite", category: "database" },
      { name: "Telegram Bot API", slug: "telegram-bot-api", category: "api" },
      { name: "Gemini", slug: "gemini", category: "ai" }
    ],
    metrics: [
      { label: "Uptime target", value: "24/7", orderIndex: 1 },
      { label: "Sources", value: "3", orderIndex: 2 },
      { label: "Deployment", value: "DigitalOcean", orderIndex: 3 }
    ],
    media: [],
    tabs: [
      { key: "overview", label: "Overview", orderIndex: 1, richContent: [{ type: "paragraph", text: "A private ops-style bot stack designed to reduce deadline chaos by merging academic signals into one Telegram workflow." }] },
      { key: "problem", label: "Problem", orderIndex: 2, richContent: [{ type: "paragraph", text: "University deadlines were split across Moodle, WhatsApp groups, and email, making misses too easy." }] },
      { key: "architecture", label: "Architecture", orderIndex: 3, richContent: [{ type: "list", items: ["Playwright-based VLE scraper", "WAHA / WhatsApp bridge", "Telegram delivery layer", "Gemini-powered digest summarization", "SQLite state tracking"] }] },
      { key: "build", label: "Build Process", orderIndex: 4, richContent: [{ type: "paragraph", text: "Built more like an internal tool than a demo project: long-running, practical, and focused on keeping the student workflow quieter." }] },
      { key: "challenges", label: "Challenges", orderIndex: 5, richContent: [{ type: "list", items: ["Credential/session handling", "Mixed-quality input streams", "Daily reliability over flashy features"] }] },
      { key: "results", label: "Results", orderIndex: 6, richContent: [{ type: "paragraph", text: "Created one consistent deadline and announcement surface instead of checking multiple systems repeatedly." }] },
      { key: "stack", label: "Stack / Links", orderIndex: 7, richContent: [{ type: "paragraph", text: "Private project. Public case study only; no sensitive credentials or internal runtime details exposed." }] }
    ]
  },
  {
    slug: "flight-sniper",
    title: "Flight Sniper",
    summary:
      "A monitoring script that watches for threshold-based fare drops and alerts immediately through Telegram.",
    status: "live",
    year: 2026,
    visibility: "public",
    featured: false,
    repoUrl: "https://github.com/arifaqyl/flight-sniper",
    category: "automation",
    accent: "#c4b5fd",
    sortOrder: 6,
    technologies: [
      { name: "Python", slug: "python", category: "language" },
      { name: "Requests", slug: "requests", category: "api" },
      { name: "Telegram Bot API", slug: "telegram-bot-api", category: "api" }
    ],
    metrics: [
      { label: "Mode", value: "scheduled", orderIndex: 1 },
      { label: "Alerting", value: "instant", orderIndex: 2 }
    ],
    media: [],
    tabs: [
      { key: "overview", label: "Overview", orderIndex: 1, richContent: [{ type: "paragraph", text: "A lightweight price-monitoring tool that turns repeated fare checking into automated alerts." }] },
      { key: "problem", label: "Problem", orderIndex: 2, richContent: [{ type: "paragraph", text: "Manual fare checking is repetitive and easy to get wrong if you do not catch the drop in time." }] },
      { key: "architecture", label: "Architecture", orderIndex: 3, richContent: [{ type: "list", items: ["Scheduled polling", "Threshold comparison", "Telegram notification"] }] },
      { key: "build", label: "Build Process", orderIndex: 4, richContent: [{ type: "paragraph", text: "Built as a simple script with a clear job: monitor, compare, alert, repeat." }] },
      { key: "challenges", label: "Challenges", orderIndex: 5, richContent: [{ type: "paragraph", text: "The main challenge is making the automation reliable enough to trust, not just technically functional." }] },
      { key: "results", label: "Results", orderIndex: 6, richContent: [{ type: "paragraph", text: "Removes repetitive manual checking and makes price drops easier to act on immediately." }] },
      { key: "stack", label: "Stack / Links", orderIndex: 7, richContent: [{ type: "paragraph", text: "Python, Requests, Telegram Bot API. Public repo available on GitHub." }] }
    ]
  }
];

export const siteSettings = [
  {
    key: "seo",
    valueJson: {
      defaultTitle: "Arif Aqyl | Software Engineer",
      defaultDescription:
        "Software Engineering student building automation, backend systems, and practical AI tools.",
      ogImage: "/media/og-image.jpg"
    }
  },
  {
    key: "contact",
    valueJson: {
      primaryEmail: "hello@arifaqyl.me",
      linkedin: "https://linkedin.com/in/arifaqyl",
      github: "https://github.com/arifaqyl"
    }
  }
];
