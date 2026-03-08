import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import { Briefcase } from "lucide-react";

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">
            <span className="neon-text">04.</span> Experience
          </h2>
          <div className="w-20 h-0.5 bg-primary/40 mb-10" />

          <div className="space-y-8 max-w-2xl">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative pl-8 border-l border-primary/20"
              >
                <div className="absolute left-0 top-0 -translate-x-1/2 p-1.5 rounded-full bg-background border border-primary/40">
                  <Briefcase size={14} className="text-primary" />
                </div>

                <p className="text-xs font-mono text-primary mb-1">{exp.period}</p>
                <h3 className="text-lg font-semibold text-foreground font-heading">
                  {exp.role}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{exp.company}</p>
                <ul className="space-y-1.5">
                  {exp.description.map((d, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary mt-1">▹</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
