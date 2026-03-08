import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cherinet Kebede. Built with passion.
        </p>
        <div className="flex items-center gap-5">
          {[
            { icon: Github, href: "https://github.com/chere970" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/cherinet-kebede970" },
            { icon: Mail, href: "mailto:cherinetkebede055@gmail.com" },
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
