
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPrizes, selectRandomPrize } from "@/lib/mockData";
import { spinWheel, generateConfetti } from "@/lib/utils";
import { Prize } from "@/types";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function PrizeWheel() {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [confetti, setConfetti] = useState<any[]>([]);
  const [wheel1Rotation, setWheel1Rotation] = useState(0);
  const [wheel2Rotation, setWheel2Rotation] = useState(0);
  const wheel1Ref = useRef<HTMLDivElement>(null);
  const wheel2Ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setWonPrize(null);
    
    // Select a random prize using our weighted algorithm
    const prize = selectRandomPrize();
    
    // Simulate wheel spinning
    spinWheel(prize.id, mockPrizes.length, (rotation) => {
      // Add a slight delay to the second wheel to make it look more natural
      setWheel1Rotation(rotation);
      setTimeout(() => {
        setWheel2Rotation(rotation);
      }, 200);
      
      // Show the prize after wheels stop spinning
      setTimeout(() => {
        setWonPrize(prize);
        setIsSpinning(false);
        setConfetti(generateConfetti(50));
        
        // Store the prize in localStorage
        const userData = JSON.parse(localStorage.getItem("twixUserData") || "{}");
        const prizeData = {
          id: prize.id,
          type: prize.type,
          date: new Date(),
        };
        userData.prizes = userData.prizes || [];
        userData.prizes.push(prizeData);
        localStorage.setItem("twixUserData", JSON.stringify(userData));
      }, 4000);
    });
  };
  
  const handleContinue = () => {
    navigate("/thanks");
  };
  
  // Reset wheels when component mounts
  useEffect(() => {
    if (wheel1Ref.current) wheel1Ref.current.style.transform = "rotate(0deg)";
    if (wheel2Ref.current) wheel2Ref.current.style.transform = "rotate(0deg)";
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-twix-gold/30 to-white relative overflow-hidden">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      
      {/* Confetti animation */}
      {confetti.map((item) => (
        <div
          key={item.id}
          className="confetti animate-confetti"
          style={{
            backgroundColor: item.color,
            left: item.left,
            width: item.size,
            height: item.size,
            '--i': item.delay,
          } as React.CSSProperties}
        />
      ))}
      
      <Card className="w-full max-w-md border-twix-brown/20 mb-4">
        <CardHeader className="bg-twix-red text-white rounded-t-lg">
          <CardTitle className="text-center text-xl">{t("game.title")}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex flex-col items-center">
          <div className="w-full flex justify-between mb-8">
            {/* Left Wheel */}
            <div className="w-32 h-32 md:w-40 md:h-40 relative">
              <div 
                ref={wheel1Ref} 
                className="w-full h-full rounded-full bg-twix-brown border-4 border-twix-gold spinning-wheel flex items-center justify-center overflow-hidden"
                style={{
                  transform: isSpinning ? `rotate(${wheel1Rotation}deg)` : "rotate(0deg)",
                  transition: isSpinning ? "transform 3s cubic-bezier(0.1, 0.7, 0.1, 1)" : "none",
                }}
              >
                {mockPrizes.map((prize, index) => {
                  const angle = (index * 360) / mockPrizes.length;
                  return (
                    <div
                      key={prize.id}
                      className="absolute w-full h-full"
                      style={{ transform: `rotate(${angle}deg)` }}
                    >
                      <div 
                        className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 w-1 bg-twix-gold/70"
                      />
                      <div 
                        className="absolute top-2 left-1/2 -translate-x-1/2 h-8 w-8 flex items-center justify-center text-xs font-bold text-white"
                        style={{ transform: `rotate(${-angle}deg)` }}
                      >
                        {prize.name.substring(0, 3)}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-4 h-6 bg-twix-red clip-path-triangle" />
            </div>
            
            {/* Right Wheel */}
            <div className="w-32 h-32 md:w-40 md:h-40 relative">
              <div 
                ref={wheel2Ref} 
                className="w-full h-full rounded-full bg-twix-brown border-4 border-twix-gold spinning-wheel flex items-center justify-center overflow-hidden"
                style={{
                  transform: isSpinning ? `rotate(${wheel2Rotation}deg)` : "rotate(0deg)",
                  transition: isSpinning ? "transform 3s cubic-bezier(0.1, 0.7, 0.1, 1)" : "none",
                }}
              >
                {mockPrizes.map((prize, index) => {
                  const angle = (index * 360) / mockPrizes.length;
                  return (
                    <div
                      key={prize.id}
                      className="absolute w-full h-full"
                      style={{ transform: `rotate(${angle}deg)` }}
                    >
                      <div 
                        className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 w-1 bg-twix-gold/70"
                      />
                      <div 
                        className="absolute top-2 left-1/2 -translate-x-1/2 h-8 w-8 flex items-center justify-center text-xs font-bold text-white"
                        style={{ transform: `rotate(${-angle}deg)` }}
                      >
                        {prize.name.substring(0, 3)}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-4 h-6 bg-twix-red clip-path-triangle" />
            </div>
          </div>
          
          {wonPrize ? (
            <div className="text-center space-y-4 w-full">
              <div className="p-4 bg-twix-gold/20 rounded-lg flex flex-col items-center">
                <CheckCircle className="h-8 w-8 text-twix-red mb-2" />
                <h3 className="text-lg font-bold text-twix-brown">
                  {t("game.congrats")}
                </h3>
                <p className="text-sm text-twix-brown/80 mb-2">
                  {t("game.wonPrize").replace("{prize}", wonPrize.name)}
                </p>
                <div className="flex justify-center space-x-4 mt-2">
                  <div className="h-16 w-16 bg-white rounded-lg p-2 flex items-center justify-center shadow-sm">
                    <img 
                      src={wonPrize.imageUrl} 
                      alt={wonPrize.name}
                      className="h-12 w-12 object-contain"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/100x100/D4954E/ffffff?text=Prize";
                      }}
                    />
                  </div>
                  <div className="h-16 w-16 bg-white rounded-lg p-2 flex items-center justify-center shadow-sm">
                    <img 
                      src={wonPrize.imageUrl} 
                      alt={wonPrize.name}
                      className="h-12 w-12 object-contain"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/100x100/D4954E/ffffff?text=Prize";
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue} 
                className="bg-twix-red hover:bg-twix-red/80 w-full"
              >
                {t("button.continue")}
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleSpin}
              disabled={isSpinning}
              className="bg-twix-red hover:bg-twix-red/80 w-full"
            >
              {isSpinning ? t("button.spinning") : t("button.spin")}
            </Button>
          )}
        </CardContent>
      </Card>
      
      <div className="mt-4 flex justify-center">
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
