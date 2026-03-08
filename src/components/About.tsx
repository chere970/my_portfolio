import { motion } from "framer-motion";
import { Code2, Server, Database } from "lucide-react";

const About = () => {
  const highlights = [
    { icon: Code2, label: "Frontend", desc: "React, Next.js, TypeScript" },
    { icon: Server, label: "Backend", desc: "NestJS, Node.js, REST APIs" },
    { icon: Database, label: "Database", desc: "PostgreSQL, MongoDB, Prisma" },
  ];

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
              <p>
                I'm a Full Stack Developer who loves building things for the web.
                My journey started with curiosity about how websites work, and it
                has evolved into a passion for creating efficient, scalable applications.
              </p>
              <p>
                I specialize in building robust backend systems with NestJS and
                creating beautiful, responsive frontends with React. I'm always
                eager to learn new technologies and improve my craft.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new tech, contributing
                to open source, or learning about system design and architecture.
              </p>
            </div>

            <div className="grid gap-4">
              {highlights.map(({ icon: Icon, label, desc }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-lg glass neon-border"
                >
                  <div className="p-3 rounded-md bg-primary/10">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{label}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
