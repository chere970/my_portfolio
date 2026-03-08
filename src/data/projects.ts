export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "Event Management System",
    description: "Full stack event platform with real-time updates, ticket management, and analytics dashboard.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    github: "https://github.com/chere970/event-management",
    demo: "https://events-demo.com",
  },
  {
    title: "Attendance Management System",
    description: "Automated attendance tracking with QR code scanning, reports generation, and admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/chere970/attendance-system",
  },
  {
    title: "Real-time Chat Application",
    description: "WebSocket-powered chat app with rooms, file sharing, and message encryption.",
    tech: ["React", "NestJS", "WebSocket", "Redis"],
    github: "https://github.com/chere970/chat-app",
    demo: "https://chat-demo.com",
  },
  {
    title: "REST API Boilerplate",
    description: "Production-ready REST API template with authentication, rate limiting, and comprehensive testing.",
    tech: ["NestJS", "Prisma", "PostgreSQL", "Jest"],
    github: "https://github.com/chere970/api-boilerplate",
  },
];
