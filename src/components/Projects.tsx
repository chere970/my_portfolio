import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useSiteContent } from "@/context/site-content-context";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { content } = useSiteContent();
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedTech, setSelectedTech] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    content.projects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag));
    });

    return Array.from(tags).sort((a, b) => a.localeCompare(b));
  }, [content.projects]);

  const uniqueTech = useMemo(() => {
    const tech = new Set<string>();
    content.projects.forEach((project) => {
      project.tech.forEach((item) => tech.add(item));
    });

    return Array.from(tech).sort((a, b) => a.localeCompare(b));
  }, [content.projects]);

  const uniqueYears = useMemo(() => {
    const years = new Set<number>();
    content.projects.forEach((project) => years.add(project.year));

    return Array.from(years).sort((a, b) => b - a);
  }, [content.projects]);

  const filteredProjects = useMemo(() => {
    return content.projects.filter((project) => {
      const matchesTag =
        selectedTag === "All" || project.tags.includes(selectedTag);
      const matchesTech =
        selectedTech === "All" || project.tech.includes(selectedTech);
      const matchesYear =
        selectedYear === "All" || String(project.year) === selectedYear;

      return matchesTag && matchesTech && matchesYear;
    });
  }, [content.projects, selectedTag, selectedTech, selectedYear]);

  const clearFilters = () => {
    setSelectedTag("All");
    setSelectedTech("All");
    setSelectedYear("All");
  };

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

          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <label className="text-sm text-muted-foreground">
              Tag
              <select
                value={selectedTag}
                onChange={(event) => setSelectedTag(event.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2 text-foreground focus:outline-none focus:border-primary/50"
              >
                <option value="All">All tags</option>
                {uniqueTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm text-muted-foreground">
              Tech stack
              <select
                value={selectedTech}
                onChange={(event) => setSelectedTech(event.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2 text-foreground focus:outline-none focus:border-primary/50"
              >
                <option value="All">All tech</option>
                {uniqueTech.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm text-muted-foreground">
              Year
              <select
                value={selectedYear}
                onChange={(event) => setSelectedYear(event.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2 text-foreground focus:outline-none focus:border-primary/50"
              >
                <option value="All">All years</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={String(year)}>
                    {year}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-end">
              <button
                type="button"
                onClick={clearFilters}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
              >
                Clear filters
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <p className="text-sm text-muted-foreground mt-6">
              No projects match the selected filters.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
