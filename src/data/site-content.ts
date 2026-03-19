import { z } from "zod";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { skillCategories } from "@/data/skills";

const heroSchema = z.object({
  intro: z.string(),
  name: z.string(),
  role: z.string(),
  summary: z.string(),
  primaryCtaLabel: z.string(),
  secondaryCtaLabel: z.string(),
  githubUrl: z.string(),
  linkedinUrl: z.string(),
  email: z.string(),
});

const aboutHighlightSchema = z.object({
  label: z.string(),
  desc: z.string(),
});

const aboutSchema = z.object({
  paragraphs: z.array(z.string()),
  highlights: z.array(aboutHighlightSchema),
});

const contactSchema = z.object({
  heading: z.string(),
  message: z.string(),
  email: z.string(),
  location: z.string(),
});

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
  tags: z.array(z.string()),
  year: z.number().int(),
  github: z.string(),
  demo: z.string().optional(),
  image: z.string().optional(),
});

const experienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  period: z.string(),
  description: z.array(z.string()),
});

const skillCategorySchema = z.object({
  category: z.string(),
  skills: z.array(z.string()),
});

export const siteContentSchema = z.object({
  hero: heroSchema,
  about: aboutSchema,
  contact: contactSchema,
  projects: z.array(projectSchema),
  experiences: z.array(experienceSchema),
  skillCategories: z.array(skillCategorySchema),
});

export type SiteContent = z.infer<typeof siteContentSchema>;

export const siteContentStorageKey = "portfolio-site-content-v1";

export const defaultSiteContent: SiteContent = {
  hero: {
    intro: "Hello, I'm",
    name: "Cherinet Kebede",
    role: "Full Stack Developer",
    summary:
      "I build scalable web applications with modern technologies. Passionate about clean code, great UX, and solving complex problems.",
    primaryCtaLabel: "Get In Touch",
    secondaryCtaLabel: "View Work",
    githubUrl: "https://github.com/chere970",
    linkedinUrl: "https://www.linkedin.com/in/cherinet-kebede970",
    email: "cherinetkebede055@gmail.com",
  },
  about: {
    paragraphs: [
      "I'm a Full Stack Developer who loves building things for the web. My journey started with curiosity about how websites work, and it has evolved into a passion for creating efficient, scalable applications.",
      "I specialize in building robust backend systems with NestJS and creating beautiful, responsive frontends with React. I'm always eager to learn new technologies and improve my craft.",
      "When I'm not coding, you'll find me exploring new tech, contributing to open source, or learning about system design and architecture.",
    ],
    highlights: [
      { label: "Frontend", desc: "React, Next.js, TypeScript" },
      { label: "Backend", desc: "NestJS, Node.js, REST APIs" },
      { label: "Database", desc: "PostgreSQL, MongoDB, Prisma" },
    ],
  },
  contact: {
    heading: "Get In Touch",
    message:
      "I'm currently open to new opportunities. Whether you have a question or just want to say hi, feel free to reach out!",
    email: "cherinetkebede055@gmail.com",
    location: "Addis Ababa, Ethiopia",
  },
  projects,
  experiences,
  skillCategories,
};
