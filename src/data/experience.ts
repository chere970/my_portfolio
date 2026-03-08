export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Tech Company",
    period: "2024 - Present",
    description: [
      "Built and maintained scalable web applications using React and NestJS",
      "Designed database schemas and RESTful APIs serving 10k+ users",
      "Implemented CI/CD pipelines and automated testing workflows",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Startup Inc.",
    period: "2023 - 2024",
    description: [
      "Developed features for the core product using TypeScript and React",
      "Collaborated with senior developers on system architecture decisions",
      "Reduced API response times by 40% through query optimization",
    ],
  },
];
