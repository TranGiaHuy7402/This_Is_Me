import heroPortrait from "@/assets/hero-portrait.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-[hsl(var(--gradient-mid))] to-[hsl(var(--gradient-end))]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center animate-fade-in">
            <div className="relative group animate-float">
              <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary-glow))] rounded-3xl opacity-75 blur-2xl group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift bg-[length:200%_200%]" />
              <img
                src={heroPortrait}
                alt="Portrait"
                className="relative rounded-3xl shadow-2xl w-full max-w-md object-cover aspect-[3/4] border-4 border-card transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary-light))] bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                {t.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                {t.hero.subtitle}
              </p>
            </div>
            
            <p className="text-lg text-foreground/80 leading-relaxed max-w-lg mx-auto lg:mx-0">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <a
                href="#about"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-[hsl(var(--primary))]/50 hover:shadow-2xl animate-bounce-in"
                style={{ animationDelay: "0.4s" }}
              >
                {t.hero.aboutButton}
              </a>
              <a
                href="#gallery"
                className="px-8 py-4 bg-card text-card-foreground rounded-full font-medium hover:scale-110 transition-all duration-300 shadow-lg border-2 border-border hover:border-primary animate-bounce-in"
                style={{ animationDelay: "0.6s" }}
              >
                {t.hero.galleryButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
