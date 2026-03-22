import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { notes } from "@/data/notes";

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
};

const Notes = () => {
  const featuredNotes = notes.slice(0, 3);

  return (
    <section id="notes" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">
                <span className="neon-text">05.</span> Notes
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Engineering notes on frontend architecture, API design, and
                technical SEO.
              </p>
            </div>

            <Link
              to="/notes"
              className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
            >
              View all notes
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredNotes.map((note, index) => (
              <motion.article
                key={note.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="glass rounded-xl p-6 border border-border/60 h-full flex flex-col"
              >
                <p className="text-xs uppercase tracking-widest text-primary font-mono mb-3">
                  {formatDate(note.publishedAt)} · {note.readingMinutes} min
                  read
                </p>
                <h3 className="text-xl font-semibold mb-3">{note.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {note.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {note.tags.map((tag) => (
                    <span
                      key={`${note.slug}-${tag}`}
                      className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to="/notes"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:opacity-80 transition-opacity"
                >
                  Read note
                  <ArrowUpRight size={16} />
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Notes;
