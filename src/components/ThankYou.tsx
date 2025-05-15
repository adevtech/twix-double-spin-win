
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Prize } from "@/types";
import { mockPrizes } from "@/lib/mockData";
import { MailCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function ThankYou() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Get the user data and prize from localStorage
  const userData = JSON.parse(localStorage.getItem("twixUserData") || "{}");
  const lastPrize = userData.prizes?.[userData.prizes.length - 1];
  const wonPrize = lastPrize ? mockPrizes.find(p => p.id === lastPrize.id) : null;
  
  const handleReset = () => {
    // In a real app, you'd probably want to keep the user data
    // Here we're just simulating a return to the start
    navigate("/");
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-twix-gold/30 to-white">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      
      <Card className="w-full max-w-md border-twix-brown/20">
        <CardHeader className="bg-twix-red text-white rounded-t-lg">
          <CardTitle className="text-center text-xl">{t("thanks.title")}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-twix-gold/20 p-4">
              <MailCheck className="h-16 w-16 text-twix-brown" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-twix-brown">
              {t("thanks.header")}
            </h3>
            
            {wonPrize && (
              <>
                <p className="text-sm text-twix-brown/80">
                  {t("thanks.email").replace("{prize}", wonPrize.name)}
                </p>
                <p className="font-medium text-twix-brown">
                  {userData.email || "your email"}
                </p>
              </>
            )}
            
            <p className="text-sm text-twix-brown/80 mt-4">
              {t("thanks.message")}
            </p>
          </div>
          
          <Button 
            onClick={handleReset} 
            className="bg-twix-red hover:bg-twix-red/80"
          >
            {t("button.done")}
          </Button>
        </CardContent>
      </Card>
      
      <div className="mt-8 flex justify-center">
        <img 
          src="/twix-logo.png" 
          alt="Twix Logo" 
          className="h-12 w-auto"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://placehold.co/200x80/D12A22/ffffff?text=TWIX";
          }}
        />
      </div>
    </div>
  );
}
