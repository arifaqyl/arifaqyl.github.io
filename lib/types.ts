export type RichContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; title: string; snippet: string };

export type ProjectSeed = {
  slug: string;
  title: string;
  summary: string;
  status: string;
  year: number;
  visibility: "public" | "private";
  featured: boolean;
  repoUrl?: string;
  liveUrl?: string;
  category: string;
  accent?: string;
  sortOrder: number;
  technologies: { name: string; slug: string; category: string }[];
  metrics: { label: string; value: string; suffix?: string; orderIndex: number }[];
  media: { type: string; src: string; alt: string; width?: number; height?: number; orderIndex: number; isCover?: boolean }[];
  tabs: { key: string; label: string; orderIndex: number; richContent: RichContentBlock[] }[];
};

export type SiteSectionContent = {
  key: string;
  title?: string;
  subtitle?: string;
  body?: string;
  jsonPayload?: unknown;
};

export type PortfolioTechnology = {
  name: string;
  slug: string;
  category: string;
};

export type PortfolioMetric = {
  label: string;
  value: string;
  suffix?: string | null;
  orderIndex: number;
};

export type PortfolioMedia = {
  type: string;
  src: string;
  alt: string;
  width?: number | null;
  height?: number | null;
  orderIndex: number;
  isCover?: boolean;
};

export type PortfolioTab = {
  key: string;
  label: string;
  orderIndex: number;
  richContent: RichContentBlock[];
};

export type PortfolioProject = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  status: string;
  year: number;
  visibility: string;
  featured: boolean;
  repoUrl?: string | null;
  liveUrl?: string | null;
  category: string;
  accent?: string | null;
  sortOrder: number;
  technologies: PortfolioTechnology[];
  metrics: PortfolioMetric[];
  media: PortfolioMedia[];
  tabs: PortfolioTab[];
};
