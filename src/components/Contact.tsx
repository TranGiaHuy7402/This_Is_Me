import { Mail, Instagram, Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Contact = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation(0.2);
  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:example@gmail.com",
      color: "hover:text-[hsl(var(--primary))]",
      bgHover: "hover:bg-[hsl(var(--primary))]/10"
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com",
      color: "hover:text-[hsl(var(--accent))]",
      bgHover: "hover:bg-[hsl(var(--accent))]/10"
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com",
      color: "hover:text-[hsl(var(--primary-light))]",
      bgHover: "hover:bg-[hsl(var(--primary-light))]/10"
    },
    {
      name: "Zalo",
      icon: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 13.5c-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5l-2.3-2.3-2.3 2.3c-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5-.6-.6-.6-1.6 0-2.2L9.8 12l-2.3-2.3c-.6-.6-.6-1.6 0-2.2.6-.6 1.6-.6 2.2 0l2.3 2.3 2.3-2.3c.6-.6 1.6-.6 2.2 0 .6.6.6 1.6 0 2.2L14.2 12l2.3 2.3c.6.6.6 1.6 0 2.2z"/>
        </svg>
      ),
      href: "https://zalo.me",
      color: "hover:text-[hsl(var(--primary-glow))]",
      bgHover: "hover:bg-[hsl(var(--primary-glow))]/10"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-background to-[hsl(var(--gradient-end))]" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {t.contact.title}
          </h2>
          <p className={`text-muted-foreground text-lg mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {t.contact.subtitle}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center gap-3 p-6 bg-card rounded-2xl transition-all duration-700 hover:scale-110 hover:shadow-xl border-2 border-border ${link.bgHover} hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: isVisible ? `${300 + index * 100}ms` : '0ms' }}
                >
                  <div className={`p-4 bg-background rounded-full transition-all duration-300 ${link.color} group-hover:rotate-12`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="font-medium text-foreground">{link.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
