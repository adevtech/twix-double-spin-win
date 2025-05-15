
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { isValidEmail, isValidPhone } from "@/lib/utils";
import { mockLocations } from "@/lib/mockData";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function UserRegistration() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const locationId = queryParams.get("location") || "loc1";
  const { t, isRTL } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const locationInfo = mockLocations.find(loc => loc.id === locationId);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    setErrors(prev => ({ ...prev, [name]: "" }));
  };
  
  const validate = () => {
    const newErrors = {
      name: formData.name ? "" : t("registration.error.name"),
      email: isValidEmail(formData.email) ? "" : t("registration.error.email"),
      phone: isValidPhone(formData.phone) ? "" : t("registration.error.phone"),
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // In a real app, you would send this data to your API
      localStorage.setItem("twixUserData", JSON.stringify({
        ...formData,
        location: locationId,
        country: locationInfo?.country || "Unknown",
        registrationDate: new Date(),
      }));
      
      navigate("/game");
    } else {
      toast({
        variant: "destructive",
        title: t("registration.error.check"),
        description: t("registration.error.description"),
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-twix-gold/30 to-white">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      
      <Card className="w-full max-w-md border-twix-brown/20">
        <CardHeader className="bg-twix-red text-white rounded-t-lg">
          <CardTitle className="text-center text-xl">{t("registration.title")}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {locationInfo && (
            <div className="mb-4 p-2 bg-twix-gold/20 rounded-md text-center">
              <p className="font-medium text-twix-brown">
                {locationInfo.name}, {locationInfo.country}
              </p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className={isRTL ? "block text-right" : ""}>{t("registration.name")}</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`${errors.name ? "border-red-500" : ""} ${isRTL ? "text-right" : ""}`}
              />
              {errors.name && <p className={`text-xs text-red-500 ${isRTL ? "text-right" : ""}`}>{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className={isRTL ? "block text-right" : ""}>{t("registration.email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`${errors.email ? "border-red-500" : ""} ${isRTL ? "text-right" : ""}`}
              />
              {errors.email && <p className={`text-xs text-red-500 ${isRTL ? "text-right" : ""}`}>{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className={isRTL ? "block text-right" : ""}>{t("registration.phone")}</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+971 XX XXX XXXX"
                className={`${errors.phone ? "border-red-500" : ""} ${isRTL ? "text-right" : ""}`}
              />
              {errors.phone && <p className={`text-xs text-red-500 ${isRTL ? "text-right" : ""}`}>{errors.phone}</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit} 
            className="w-full bg-twix-red hover:bg-twix-red/80"
          >
            {t("button.next")}
          </Button>
        </CardFooter>
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
