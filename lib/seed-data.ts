import { ProjectSeed, SiteSectionContent } from "@/lib/types";

export const siteSections: SiteSectionContent[] = [
  {
    key: "hero",
    title: "Software built around the problem.",
    subtitle:
      "Shipping live apps, automation systems, and data products — mostly open source, all built to solve real friction.",
    body:
      "This portfolio is structured like product documentation: live lane first, expandable project cards, and case-study depth when you want the engineering story."
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
    title: "Let's build something real.",
    subtitle:
      "Open to internship opportunities in backend engineering, automation, and applied AI.",
    body:
      "If you want to talk about internships, projects, or systems work, send a message. I care most about learning fast, building useful things, and making technical work feel operationally sharp."
  }
];

export const nowUpdates = [
  {
    title: "Shipping TrafficMY as a live Malaysian transport signal board",
    body:
      "National-scale ingest with GTFS bus telemetry, official MyRapid alerts, Reddit/X threads, and a public dashboard deployed on DigitalOcean.",
    tag: "live",
    isActive: true,
    orderIndex: 1
  },
  {
    title: "Keeping Sah.Bukti as its own live micro-seller product lane",
    body:
      "WhatsApp-first order capture, review-gated ledger updates, PDF receipts, and a public demo that stays sanitized from private owner flows.",
    tag: "live",
    isActive: true,
    orderIndex: 2
  },
  {
    title: "Rebuilding my portfolio into a full-stack case-study system",
    body:
      "Moving from a single heavy HTML page to a structured app with database-backed content, project case studies, and admin-managed sections.",
    tag: "active",
    isActive: true,
    orderIndex: 3
  },
  {
    title: "Pushing AI trading research toward something operationally serious",
    body:
      "Working on paper-validated analyzers, evidence-backed market context, and execution/risk structure instead of hype-only predictions.",
    tag: "research",
    isActive: true,
    orderIndex: 4
  },
  {
    title: "Refining automation tools that save time in repetitive media workflows",
    body:
      "Improving video automation and clip-extraction tools so they behave more like real products instead of one-off scripts.",
    tag: "shipping",
    isActive: true,
    orderIndex: 5
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
    slug: "sah-bukti",
    title: "Sah.Bukti",
    summary:
      "Malaysia-first WhatsApp business agent for micro-sellers with review-gated ledger updates, PDF receipts, and month-end exports.",
    status: "live",
    year: 2026,
    visibility: "public",
    featured: true,
    liveUrl: "https://arifaqyl.me/sahbukti/",
    repoUrl: "https://github.com/arifaqyl/sah-bukti",
    category: "product",
    accent: "#fbbf24",
    sortOrder: 1,
    technologies: [
      { name: "FastAPI", slug: "fastapi", category: "backend" },
      { name: "SQLite", slug: "sqlite", category: "database" },
      { name: "React", slug: "react", category: "frontend" },
      { name: "WAHA", slug: "waha", category: "integration" }
    ],
    metrics: [
      { label: "Trust model", value: "review-gated", orderIndex: 1 },
      { label: "Deployment", value: "DigitalOcean", orderIndex: 2 },
      { label: "Demo safety", value: "sanitized", orderIndex: 3 }
    ],
    media: [],
    tabs: [
      {
        key: "overview",
        label: "Overview",
        orderIndex: 1,
        richContent: [
          {
            type: "paragraph",
            text: "Sah.Bukti turns messy WhatsApp order text into structured invoices, payment proofs, and export-ready records for small Malaysian sellers."
          },
          {
            type: "list",
            items: [
              "WhatsApp capture and owner commands",
              "Review queue before ledger mutation",
              "PDF receipts and accountant export",
              "Public demo separated from private owner flows"
            ]
          }
        ]
      },
      {
        key: "problem",
        label: "Problem",
        orderIndex: 2,
        richContent: [
          {
            type: "paragraph",
            text: "Micro-sellers often run orders, payments, and bookkeeping inside chat threads with no clean audit trail."
          }
        ]
      },
      {
        key: "architecture",
        label: "Architecture",
        orderIndex: 3,
        richContent: [
          {
            type: "list",
            items: [
              "FastAPI backend with SQLite ledger",
              "WAHA WhatsApp bridge",
              "React frontend served from the same app",
              "Approval gate as the only ledger mutation path"
            ]
          }
        ]
      },
      {
        key: "results",
        label: "Results",
        orderIndex: 4,
        richContent: [
          {
            type: "paragraph",
            text: "Live on DigitalOcean with a public demo lane that keeps private WhatsApp and owner-only flows off the public site."
          }
        ]
      },
      {
        key: "stack",
        label: "Stack / Links",
        orderIndex: 5,
        richContent: [
          {
            type: "paragraph",
            text: "FastAPI, SQLite, React, WAHA, fpdf2. Live demo on the droplet; public repo on GitHub."
          }
        ]
      }
    ]
  },
  {
    slug: "trafficmy",
    title: "TrafficMY",
    summary:
      "Malaysian transport disruption board combining official MyRapid alerts, GTFS bus telemetry, Reddit/X signals, and RSS news into one live map.",
    status: "live",
    year: 2026,
    visibility: "public",
    featured: true,
    liveUrl: "https://arifaqyl.me/traffic/",
    repoUrl: "https://github.com/arifaqyl/aduanmy",
    category: "data product",
    accent: "#38bdf8",
    sortOrder: 2,
    technologies: [
      { name: "FastAPI", slug: "fastapi", category: "backend" },
      { name: "Playwright", slug: "playwright", category: "scraping" },
      { name: "GTFS-RT", slug: "gtfs-rt", category: "data" },
      { name: "SQLite", slug: "sqlite", category: "database" }
    ],
    metrics: [
      { label: "Coverage", value: "national", orderIndex: 1 },
      { label: "Refresh", value: "30m + 5m GTFS", orderIndex: 2 },
      { label: "Retention", value: "90", suffix: " days", orderIndex: 3 }
    ],
    media: [],
    tabs: [
      {
        key: "overview",
        label: "Overview",
        orderIndex: 1,
        richContent: [
          {
            type: "paragraph",
            text: "TrafficMY is the public product surface for AduanMY: a live Malaysian transport signal board instead of a research dump."
          },
          {
            type: "list",
            items: [
              "Official MyRapid bus and rail alerts",
              "GTFS static catalog plus realtime anomaly detection",
              "Social and RSS lanes for crowd-reported disruption",
              "Negeri filters and bus/rail mode views"
            ]
          }
        ]
      },
      {
        key: "architecture",
        label: "Architecture",
        orderIndex: 2,
        richContent: [
          {
            type: "list",
            items: [
              "Parallel collector ingest with upsert retention",
              "Split scheduler: GTFS every 5 minutes, full refresh every 30 minutes",
              "Health endpoint auto-degrades when ingest goes stale",
              "Docker deployment with Playwright browser image"
            ]
          }
        ]
      },
      {
        key: "results",
        label: "Results",
        orderIndex: 3,
        richContent: [
          {
            type: "paragraph",
            text: "129 automated tests, production Docker stack, and a public dashboard deployed behind nginx on the same droplet as my other live apps."
          }
        ]
      },
      {
        key: "stack",
        label: "Stack / Links",
        orderIndex: 4,
        richContent: [
          {
            type: "paragraph",
            text: "Python, FastAPI, Playwright, GTFS-RT, SQLite. Public repo: aduanmy on GitHub."
          }
        ]
      }
    ]
  },
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
    accent: "#ccff00",
    sortOrder: 3,
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
    media: [],
    tabs: [
      {
        key: "overview",
        label: "Overview",
        orderIndex: 1,
        richContent: [
          {
            type: "paragraph",
            text: "This site exists to explain the work, not just show polished visuals. The rebuild turns the portfolio into a content system with real structure, admin-managed sections, and project depth."
          },
          {
            type: "list",
            items: [
              "Server-rendered public pages",
              "SQL-backed project content",
              "Admin-managed homepage sections",
              "SEO-first metadata and structured data"
            ]
          }
        ]
      },
      {
        key: "problem",
        label: "Problem",
        orderIndex: 2,
        richContent: [
          {
            type: "paragraph",
            text: "The previous site had personality, but it was still a large single HTML file with expensive effects, shallow project storytelling, and too much visual energy spent on things that did not help people understand the engineering."
          }
        ]
      },
      {
        key: "architecture",
        label: "Architecture",
        orderIndex: 3,
        richContent: [
          {
            type: "paragraph",
            text: "The new architecture uses Next.js App Router, Prisma, PostgreSQL, route-based case studies, server-rendered metadata, and an owner-only admin surface."
          },
          {
            type: "code",
            title: "app/page.tsx",
            snippet:
              "const featuredProjects = await getFeaturedProjects();\n\n<section id=\"work\">\n  <ProjectExplainerShowcase projects={featuredProjects} />\n</section>"
          }
        ]
      },
      {
        key: "build",
        label: "Build Process",
        orderIndex: 4,
        richContent: [
          {
            type: "list",
            items: [
              "Migrated hardcoded content into structured seed data",
              "Removed unrelated image-heavy sections from the homepage",
              "Restored the expandable work-card interaction that made the original site memorable",
              "Made the site deployable as a real app instead of a static dump"
            ]
          }
        ]
      },
      {
        key: "challenges",
        label: "Challenges",
        orderIndex: 5,
        richContent: [
          {
            type: "paragraph",
            text: "The hardest part was preserving the original personality while removing the parts that were costly, fragile, or overly decorative."
          }
        ]
      },
      {
        key: "results",
        label: "Results",
        orderIndex: 6,
        richContent: [
          {
            type: "list",
            items: [
              "Cleaner performance profile",
              "Clearer recruiter-facing narrative",
              "Maintainable content model",
              "Future-ready admin and analytics scaffolding"
            ]
          }
        ]
      },
      {
        key: "stack",
        label: "Stack / Links",
        orderIndex: 7,
        richContent: [
          {
            type: "paragraph",
            text: "Next.js, React, TypeScript, Prisma, PostgreSQL, Vercel, Cloudflare."
          }
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
    sortOrder: 4,
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
    media: [],
    tabs: [
      {
        key: "overview",
        label: "Overview",
        orderIndex: 1,
        richContent: [
          {
            type: "paragraph",
            text: "This tool turns raw OBS or long-form creator footage into cleaner edits by automating the repetitive first pass."
          }
        ]
      },
      {
        key: "problem",
        label: "Problem",
        orderIndex: 2,
        richContent: [
          {
            type: "paragraph",
            text: "Manual editing eats hours on silence trimming, dead air cleanup, and repeated export steps."
          }
        ]
      },
      {
        key: "architecture",
        label: "Architecture",
        orderIndex: 3,
        richContent: [
          {
            type: "list",
            items: [
              "Audio transcription",
              "Segment scoring",
              "Topic grouping",
              "FFmpeg render pass",
              "Subtitle generation"
            ]
          },
          {
            type: "code",
            title: "vlog_editor.py",
            snippet:
              "from faster_whisper import WhisperModel\n\nmodel = WhisperModel(\"small\", device=\"cuda\", compute_type=\"float16\")\nsegments, _ = model.transcribe(video_path, word_timestamps=True)\nkeep_segments = score_segments(segments, silence_threshold=-35)\nrender_edit(video_path, keep_segments, output_path)"
          }
        ]
      },
      {
        key: "build",
        label: "Build Process",
        orderIndex: 4,
        richContent: [
          {
            type: "paragraph",
            text: "Built around practical creator pain: fast enough to use repeatedly, simple enough to run locally, and structured enough to improve over time."
          }
        ]
      },
      {
        key: "challenges",
        label: "Challenges",
        orderIndex: 5,
        richContent: [
          {
            type: "list",
            items: [
              "Balancing cut aggressiveness vs context",
              "Handling different genres",
              "Keeping render/transcription pipelines stable"
            ]
          }
        ]
      },
      {
        key: "results",
        label: "Results",
        orderIndex: 6,
        richContent: [
          {
            type: "paragraph",
            text: "What used to take creators a day of repetitive editing can be turned into an overnight automated pass."
          }
        ]
      },
      {
        key: "stack",
        label: "Stack / Links",
        orderIndex: 7,
        richContent: [
          {
            type: "paragraph",
            text: "Python, faster-whisper, FFmpeg, CUDA. Public repo available on GitHub."
          }
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
    sortOrder: 5,
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
    media: [],
    tabs: [
      {
        key: "overview",
        label: "Overview",
        orderIndex: 1,
        richContent: [
          {
            type: "paragraph",
            text: "Clip Finder scans long recordings and pulls likely highlight moments quickly enough to be useful as a repeatable workflow."
          }
        ]
      },
      {
        key: "problem",
        label: "Problem",
        orderIndex: 2,
        richContent: [
          {
            type: "paragraph",
            text: "Interesting moments are sparse and buried inside hours of footage, making manual search slow and inconsistent."
          }
        ]
      },
      {
        key: "architecture",
        label: "Architecture",
        orderIndex: 3,
        richContent: [
          {
            type: "list",
            items: [
              "Audio energy heuristics",
              "Motion detection",
              "Grouping and ranking",
              "Automated clip output"
            ]
          },
          {
            type: "code",
            title: "clip_finder.py",
            snippet:
              "highlights = []\nfor window in windows(video_path, seconds=12):\n    energy = audio_energy(window)\n    motion = frame_delta(window)\n    score = (energy * 0.55) + (motion * 0.45)\n    if score >= threshold:\n        highlights.append(window)\n\nexport_ranked_clips(highlights[:top_k])"
          }
        ]
      },
      {
        key: "build",
        label: "Build Process",
        orderIndex: 4,
        richContent: [
          {
            type: "paragraph",
            text: "The focus was not on fancy ML claims but on fast heuristic wins that creators would actually use."
          }
        ]
      },
      {
        key: "challenges",
        label: "Challenges",
        orderIndex: 5,
        richContent: [
          {
            type: "list",
            items: [
              "False positives from noisy segments",
              "Genre-specific pacing",
              "Balancing speed and clip quality"
            ]
          }
        ]
      },
      {
        key: "results",
        label: "Results",
        orderIndex: 6,
        richContent: [
          {
            type: "paragraph",
            text: "The tool reduces the search phase dramatically and gives a useful first pass toward a final highlight reel."
          }
        ]
      },
      {
        key: "stack",
        label: "Stack / Links",
        orderIndex: 7,
        richContent: [
          {
            type: "paragraph",
            text: "Python, NumPy, FFmpeg. Public repo available on GitHub."
          }
        ]
      }
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
    sortOrder: 6,
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
      {
        key: "overview",
        label: "Overview",
        orderIndex: 1,
        richContent: [
          {
            type: "paragraph",
            text: "A small backend-minded utility for keeping repo metadata and public profile organization more systematic."
          }
        ]
      },
      {
        key: "problem",
        label: "Problem",
        orderIndex: 2,
        richContent: [
          {
            type: "paragraph",
            text: "Public GitHub profiles get noisy quickly when repo naming, descriptions, and visibility cues drift over time."
          }
        ]
      },
      {
        key: "architecture",
        label: "Architecture",
        orderIndex: 3,
        richContent: [
          {
            type: "paragraph",
            text: "Built as a standalone Java tool with Maven and GitHub API integration."
          },
          {
            type: "code",
            title: "RepoSorter.java",
            snippet:
              "for (GHRepository repo : gitHub.getMyself().listRepositories()) {\n    if (shouldFeature(repo)) {\n        updateDescription(repo);\n        addTopics(repo, inferredTopics(repo));\n    }\n}"
          }
        ]
      },
      {
        key: "build",
        label: "Build Process",
        orderIndex: 4,
        richContent: [
          {
            type: "paragraph",
            text: "The point was operational cleanliness: less manual profile upkeep, more consistency."
          }
        ]
      },
      {
        key: "challenges",
        label: "Challenges",
        orderIndex: 5,
        richContent: [
          {
            type: "paragraph",
            text: "API data quality and repo-by-repo rules make automation straightforward in concept but annoying in detail."
          }
        ]
      },
      {
        key: "results",
        label: "Results",
        orderIndex: 6,
        richContent: [
          {
            type: "paragraph",
            text: "Useful for enforcing a cleaner public repo surface and metadata discipline."
          }
        ]
      },
      {
        key: "stack",
        label: "Stack / Links",
        orderIndex: 7,
        richContent: [
          {
            type: "paragraph",
            text: "Java 17, Maven, GitHub REST API."
          }
        ]
      }
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
    sortOrder: 7,
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
      {
        key: "overview",
        label: "Overview",
        orderIndex: 1,
        richContent: [
          {
            type: "paragraph",
            text: "A private ops-style bot stack designed to reduce deadline chaos by merging academic signals into one Telegram workflow."
          }
        ]
      },
      {
        key: "problem",
        label: "Problem",
        orderIndex: 2,
        richContent: [
          {
            type: "paragraph",
            text: "University deadlines were split across Moodle, WhatsApp groups, and email, making misses too easy."
          }
        ]
      },
      {
        key: "architecture",
        label: "Architecture",
        orderIndex: 3,
        richContent: [
          {
            type: "list",
            items: [
              "Playwright-based VLE scraper",
              "WAHA / WhatsApp bridge",
              "Telegram delivery layer",
              "Gemini-powered digest summarization",
              "SQLite state tracking"
            ]
          },
          {
            type: "code",
            title: "scraper.py",
            snippet:
              "with sync_playwright() as p:\n    browser = p.chromium.launch(headless=True)\n    page = browser.new_page(storage_state=\"session.json\")\n    page.goto(VLE_URL)\n    tasks = extract_deadlines(page)\n    save_tasks(tasks, db)\n    push_digest(tasks, telegram_client)"
          }
        ]
      },
      {
        key: "build",
        label: "Build Process",
        orderIndex: 4,
        richContent: [
          {
            type: "paragraph",
            text: "Built more like an internal tool than a demo project: long-running, practical, and focused on keeping the student workflow quieter."
          }
        ]
      },
      {
        key: "challenges",
        label: "Challenges",
        orderIndex: 5,
        richContent: [
          {
            type: "list",
            items: [
              "Credential and session handling",
              "Mixed-quality input streams",
              "Daily reliability over flashy features"
            ]
          }
        ]
      },
      {
        key: "results",
        label: "Results",
        orderIndex: 6,
        richContent: [
          {
            type: "paragraph",
            text: "Created one consistent deadline and announcement surface instead of checking multiple systems repeatedly."
          }
        ]
      },
      {
        key: "stack",
        label: "Stack / Links",
        orderIndex: 7,
        richContent: [
          {
            type: "paragraph",
            text: "Private project. Public case study only; no sensitive credentials or internal runtime details exposed."
          }
        ]
      }
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
    sortOrder: 8,
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
      {
        key: "overview",
        label: "Overview",
        orderIndex: 1,
        richContent: [
          {
            type: "paragraph",
            text: "A lightweight price-monitoring tool that turns repeated fare checking into automated alerts."
          }
        ]
      },
      {
        key: "problem",
        label: "Problem",
        orderIndex: 2,
        richContent: [
          {
            type: "paragraph",
            text: "Manual fare checking is repetitive and easy to get wrong if you do not catch the drop in time."
          }
        ]
      },
      {
        key: "architecture",
        label: "Architecture",
        orderIndex: 3,
        richContent: [
          {
            type: "list",
            items: ["Scheduled polling", "Threshold comparison", "Telegram notification"]
          },
          {
            type: "code",
            title: "flight_sniper.py",
            snippet:
              "response = requests.get(url, timeout=20)\ncurrent_price = parse_price(response.json())\n\nif current_price <= target_price:\n    send_telegram_alert(route_name, current_price, booking_url)\nelse:\n    log_price(route_name, current_price)"
          }
        ]
      },
      {
        key: "build",
        label: "Build Process",
        orderIndex: 4,
        richContent: [
          {
            type: "paragraph",
            text: "Built as a simple script with a clear job: monitor, compare, alert, repeat."
          }
        ]
      },
      {
        key: "challenges",
        label: "Challenges",
        orderIndex: 5,
        richContent: [
          {
            type: "paragraph",
            text: "The main challenge is making the automation reliable enough to trust, not just technically functional."
          }
        ]
      },
      {
        key: "results",
        label: "Results",
        orderIndex: 6,
        richContent: [
          {
            type: "paragraph",
            text: "Removes repetitive manual checking and makes price drops easier to act on immediately."
          }
        ]
      },
      {
        key: "stack",
        label: "Stack / Links",
        orderIndex: 7,
        richContent: [
          {
            type: "paragraph",
            text: "Python, Requests, Telegram Bot API. Public repo available on GitHub."
          }
        ]
      }
    ]
  },
  {
    slug: "shopee-autopilot",
    title: "Shopee Autopilot",
    summary:
      "Automated Shopee Malaysia digital product pipeline covering cover generation, listing upload, webchat replies, and nightly performance summaries.",
    status: "live",
    year: 2026,
    visibility: "public",
    featured: false,
    category: "automation",
    accent: "#fb923c",
    sortOrder: 9,
    technologies: [
      { name: "Python", slug: "python", category: "language" },
      { name: "Playwright", slug: "playwright", category: "automation" },
      { name: "SQLite", slug: "sqlite", category: "database" },
      { name: "PIL", slug: "pil", category: "media" }
    ],
    metrics: [
      { label: "Products", value: "8", orderIndex: 1 },
      { label: "Mode", value: "daily ops", orderIndex: 2 }
    ],
    media: [],
    tabs: [
      {
        key: "overview",
        label: "Overview",
        orderIndex: 1,
        richContent: [
          {
            type: "paragraph",
            text: "An operator-style automation stack for running a digital product shop on Shopee with minimal manual intervention after setup."
          }
        ]
      },
      {
        key: "stack",
        label: "Stack / Links",
        orderIndex: 2,
        richContent: [
          {
            type: "paragraph",
            text: "Python, Playwright, SQLite, PIL, PowerShell scheduling."
          }
        ]
      }
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
