import { motion } from "framer-motion";
import { useSiteContent } from "@/context/site-content-context";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { content } = useSiteContent();

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">
            <span className="neon-text">03.</span> Projects
          </h2>
          <div className="w-20 h-0.5 bg-primary/40 mb-10" />

          <div className="grid md:grid-cols-2 gap-6">
            {content.projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
