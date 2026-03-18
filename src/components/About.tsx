import { motion } from "framer-motion";
import { Code2, Server, Database } from "lucide-react";
import { useSiteContent } from "@/context/site-content-context";

const About = () => {
  const { content } = useSiteContent();
  const highlightIcons = [Code2, Server, Database];

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">
            <span className="neon-text">01.</span> About Me
          </h2>
          <div className="w-20 h-0.5 bg-primary/40 mb-10" />

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {content.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="grid gap-4">
              {content.about.highlights.map((highlight, index) => {
                const Icon = highlightIcons[index % highlightIcons.length];

                return (
                  <motion.div
                    key={`${highlight.label}-${index}`}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-lg glass neon-border"
                  >
                    <div className="p-3 rounded-md bg-primary/10">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {highlight.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {highlight.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
