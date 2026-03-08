export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C++", "SQL"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "HTML/CSS"],
  },
  {
    category: "Backend",
    skills: ["NestJS", "Node.js", "Express", "Django", "Prisma", "REST APIs"],
  },
  {
    category: "Database & Tools",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Docker", "Git"],
  },
];
