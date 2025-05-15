
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get language from localStorage or use browser preference
    const savedLanguage = localStorage.getItem("twix-language") as Language;
    if (savedLanguage && ["en", "ar"].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Check if browser prefers Arabic
    const isArabicPreferred = navigator.language.startsWith("ar");
    return isArabicPreferred ? "ar" : "en";
  });

  // Set RTL attribute on document when language changes
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    localStorage.setItem("twix-language", language);
  }, [language]);

  // Function to set language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Check if current language is RTL
  const isRTL = language === "ar";

  // Translation function
  const t = (key: string): string => {
    const translations = language === "en" ? enTranslations : arTranslations;
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Translation data
const enTranslations: Record<string, string> = {
  // Common
  "app.title": "Twix Chocolate Campaign",
  "app.description": "Spin the wheels and win exciting prizes!",
  "app.adminLogin": "Admin Login",
  "button.next": "Next",
  "button.done": "Done",
  "button.spin": "Spin the Wheels!",
  "button.spinning": "Spinning...",
  "button.continue": "Continue",

  // Index page
  "index.welcome": "Welcome to the Twix chocolate campaign! Scan the QR code at your location or select your location below to start.",
  "index.selectLocation": "Select Your Location:",

  // Registration form
  "registration.title": "Join the Twix Experience",
  "registration.name": "Name",
  "registration.email": "Email",
  "registration.phone": "Phone Number",
  "registration.error.name": "Name is required",
  "registration.error.email": "Valid email is required",
  "registration.error.phone": "Valid phone number is required",
  "registration.error.check": "Please check your information",
  "registration.error.description": "Make sure all fields are filled correctly.",

  // Wheel game
  "game.title": "Spin the Twix Wheels",
  "game.congrats": "Congratulations!",
  "game.wonPrize": "You won two {prize}s!",

  // Thank you page
  "thanks.title": "Thank You!",
  "thanks.header": "Your Prizes Have Been Sent!",
  "thanks.email": "Two {prize}s have been sent to your email address:",
  "thanks.message": "Thank you for participating in the Twix Chocolate Campaign. We hope you enjoy your prizes!",

  // Language
  "language.switch": "العربية",
};

const arTranslations: Record<string, string> = {
  // Common
  "app.title": "حملة تويكس للشوكولاتة",
  "app.description": "أدر العجلات واربح جوائز مثيرة!",
  "app.adminLogin": "تسجيل دخول المسؤول",
  "button.next": "التالي",
  "button.done": "تم",
  "button.spin": "أدر العجلات!",
  "button.spinning": "يدور...",
  "button.continue": "استمرار",

  // Index page
  "index.welcome": "مرحبًا بك في حملة تويكس للشوكولاتة! امسح رمز QR في موقعك أو حدد موقعك أدناه للبدء.",
  "index.selectLocation": "حدد موقعك:",

  // Registration form
  "registration.title": "انضم إلى تجربة تويكس",
  "registration.name": "الاسم",
  "registration.email": "البريد الإلكتروني",
  "registration.phone": "رقم الهاتف",
  "registration.error.name": "الاسم مطلوب",
  "registration.error.email": "البريد الإلكتروني صالح مطلوب",
  "registration.error.phone": "رقم هاتف صالح مطلوب",
  "registration.error.check": "يرجى التحقق من المعلومات الخاصة بك",
  "registration.error.description": "تأكد من ملء جميع الحقول بشكل صحيح.",

  // Wheel game
  "game.title": "أدر عجلات تويكس",
  "game.congrats": "تهانينا!",
  "game.wonPrize": "لقد ربحت اثنين من {prize}!",

  // Thank you page
  "thanks.title": "شكرا لك!",
  "thanks.header": "تم إرسال جوائزك!",
  "thanks.email": "تم إرسال اثنين من {prize} إلى عنوان بريدك الإلكتروني:",
  "thanks.message": "شكرًا لمشاركتك في حملة تويكس للشوكولاتة. نتمنى أن تستمتع بجوائزك!",

  // Language
  "language.switch": "English",
};
