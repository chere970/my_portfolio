import { ArrowLeft, CalendarDays, Clock4 } from "lucide-react";
import { Link } from "react-router-dom";
import { notes } from "@/data/notes";

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
};

const NotesPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,hsl(var(--primary)/0.12),transparent_45%)]" />
        <div className="container mx-auto px-6 py-24 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Engineering Notes
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Practical writing on software architecture, product-minded
            engineering, and technical SEO. These notes are designed to share
            implementation lessons from real projects.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-6">
            {notes.map((note) => (
              <article
                key={note.slug}
                className="rounded-xl border border-border bg-card p-6 md:p-8"
              >
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={15} />
                    <time dateTime={note.publishedAt}>
                      {formatDate(note.publishedAt)}
                    </time>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock4 size={15} />
                    {note.readingMinutes} min read
                  </span>
                </div>

                <h2 className="text-2xl font-semibold mb-3">{note.title}</h2>
                <p className="text-muted-foreground mb-4">{note.excerpt}</p>
                <p className="leading-relaxed mb-6">{note.summary}</p>

                <div className="flex flex-wrap gap-2" aria-label="Topics">
                  {note.tags.map((tag) => (
                    <span
                      key={`${note.slug}-${tag}`}
                      className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotesPage;
