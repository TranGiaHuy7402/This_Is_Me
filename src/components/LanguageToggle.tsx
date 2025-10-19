import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-card border-2 border-border rounded-full shadow-lg hover:shadow-xl hover:border-primary transition-all duration-300 group"
      aria-label="Toggle language"
    >
      <Languages className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
      <span className="font-medium text-foreground uppercase text-sm">
        {language === "vi" ? "EN" : "VI"}
      </span>
    </button>
  );
};

export default LanguageToggle;
