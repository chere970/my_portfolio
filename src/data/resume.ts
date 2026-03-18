export type ResumeProfile = {
  name: string;
  title: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  summary: string;
};

export type ResumeSkillGroup = {
  label: string;
  items: string[];
};

export type ResumeExperience = {
  role: string;
  company: string;
  location?: string;
  period: string;
  highlights: string[];
};

export type ResumeProject = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
};

export type ResumeEducation = {
  institution: string;
  degree: string;
  period: string;
  details?: string[];
};

export type ResumeData = {
  profile: ResumeProfile;
  skills: ResumeSkillGroup[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  education: ResumeEducation[];
};

export const resumeData: ResumeData = {
  profile: {
    name: "Cherinet Kebede",
    title: "Junior Software Developer",
    location: "Addis Ababa, Ethiopia",
    email: "cherinetkebede055@gmail.com",
    phone: "(+251) 910 320 015",
    website: "https://medium.com/@cherinetkebede970",
    github: "https://github.com/chere970",
    linkedin: "https://www.linkedin.com/in/cherinet-kebede970",
    summary:
      "I am a motivated full stack software developer with hands-on experience in web development. I work with React (TypeScript), Node.js, Express, MongoDB, PHP and Django. I am eager to build scalable systems, strengthen full-stack expertise, and grow into a professional software engineer delivering impactful solutions.",
  },
  skills: [
    {
      label: "Skills",
      items: [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Express.js",
        "C#",
        "MongoDB",
        "PHP",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "REST APIs",
        "JWT Authentication",
        "CRUD Operations",
        "Android Development",
        "SQLite",
        "Git",
      ],
    },
    {
      label: "Software Tools",
      items: [
        "Visual Studio Code",
        "Android Studio",
        "Postman",
        "GitHub",
        "XAMPP",
        "MongoDB Compass",
        "Vite",
        "npm",
      ],
    },
  ],
  experience: [
    {
      role: "Software Development Intern",
      company: "Internship Project – Ethiopia",
      period: "2024",
      highlights: [
        "Developed a full-stack attendance management system as part of an internship project, using React (TypeScript) for the frontend and Node.js/Express for backend services.",
        "Implemented authentication, database integration, and CRUD operations, improving data consistency and demonstrating practical software development skills.",
      ],
    },
  ],
  projects: [
    {
      title: "Attendance Management System",
      description:
        "Designed and developed a full-stack attendance management system to automate student and staff attendance tracking. Built with React (TypeScript), Node.js, Express, and MongoDB, featuring secure authentication, role-based access, and full CRUD operations.",
      tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
      link: "https://github.com/chere970/attendance_management",
    },
  ],
  education: [
    {
      institution: "Addis Ababa University",
      degree: "Bachelor of Science in Information Systems",
      period: "2020 - 2024",
      details: [
        "Specialization: Software Development, Database Systems, Web Technologies, Systems Analysis and Design, Mobile Application Development",
      ],
    },
  ],
};
