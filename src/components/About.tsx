import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="about" className="py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {t.about.title}
          </h2>
          
          <div className={`bg-background rounded-3xl p-8 md:p-12 shadow-xl border border-border space-y-6 hover:shadow-2xl transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-muted-foreground font-medium min-w-32">{t.about.name}</span>
                <span className="text-foreground text-lg font-semibold">Vũ Thanh Huyền</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-muted-foreground font-medium min-w-32">{t.about.birthDate}</span>
                <span className="text-foreground text-lg">24/04/1975</span>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-foreground/80 leading-relaxed text-lg">
                  {t.about.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
