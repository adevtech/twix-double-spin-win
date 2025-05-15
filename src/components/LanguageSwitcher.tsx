
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="icon"
      className="rounded-full w-8 h-8"
      title={t("language.switch")}
      aria-label={t("language.switch")}
    >
      <Languages className="h-4 w-4" />
    </Button>
  );
}
