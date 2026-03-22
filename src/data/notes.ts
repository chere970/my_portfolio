export type NoteEntry = {
  slug: string;
  title: string;
  excerpt: string;
  summary: string;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
};

export const notes: NoteEntry[] = [
  {
    slug: "building-reliable-react-interfaces",
    title: "Building Reliable React Interfaces at Scale",
    excerpt:
      "A practical framework for reducing regressions in front-end features with stronger component contracts and better UI state modeling.",
    summary:
      "This note covers how I approach reliability in React apps: explicit component contracts, resilient loading and empty states, and test-friendly architecture that prevents fragile behavior from reaching production.",
    publishedAt: "2026-02-12",
    readingMinutes: 7,
    tags: ["React", "Frontend Architecture", "Web Performance"],
  },
  {
    slug: "pragmatic-api-design-for-fast-moving-teams",
    title: "Pragmatic API Design for Fast-Moving Teams",
    excerpt:
      "How to design API boundaries that keep teams shipping quickly without sacrificing long-term maintainability.",
    summary:
      "A concise playbook for API versioning, validation, and backward compatibility. I share patterns that make API evolution safer when multiple clients and teams depend on the same services.",
    publishedAt: "2025-12-03",
    readingMinutes: 6,
    tags: ["API Design", "Backend", "System Design"],
  },
  {
    slug: "seo-for-engineer-led-portfolio-sites",
    title: "SEO for Engineer-Led Portfolio Sites",
    excerpt:
      "Technical SEO fundamentals that help personal portfolios rank for capability-driven search intent.",
    summary:
      "I outline practical SEO improvements for developer portfolios, including content clustering, semantic markup, and internal link structure that supports thought leadership goals.",
    publishedAt: "2025-10-18",
    readingMinutes: 5,
    tags: ["SEO", "Content Strategy", "Personal Brand"],
  },
  {
    slug: "shipping-features-with-observability-first",
    title: "Shipping Features with an Observability-First Mindset",
    excerpt:
      "A lightweight strategy for logs, metrics, and traces that improves release confidence in full stack teams.",
    summary:
      "This note explains how observability can be baked into feature development from day one. The goal is faster debugging, clearer ownership, and fewer production blind spots.",
    publishedAt: "2025-08-28",
    readingMinutes: 8,
    tags: ["Observability", "Full Stack", "Engineering Leadership"],
  },
];
