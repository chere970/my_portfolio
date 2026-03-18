import { Github, Linkedin, Mail } from "lucide-react";
import { useSiteContent } from "@/context/site-content-context";

const Footer = () => {
  const { content } = useSiteContent();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {content.hero.name}. Built with passion.
        </p>
        <div className="flex items-center gap-5">
          {[
            { icon: Github, href: content.hero.githubUrl },
            { icon: Linkedin, href: content.hero.linkedinUrl },
            { icon: Mail, href: `mailto:${content.hero.email}` },
          ].map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
