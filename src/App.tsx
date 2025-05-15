
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";

// User pages
import Index from "./pages/Index";
import UserRegistration from "./components/UserRegistration";
import PrizeWheel from "./components/PrizeWheel";
import ThankYou from "./components/ThankYou";

// Admin pages
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import VoucherUpload from "./components/admin/VoucherUpload";
import ChangePassword from "./components/admin/ChangePassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="mobile-container">
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<UserRegistration />} />
              <Route path="/game" element={<PrizeWheel />} />
              <Route path="/thanks" element={<ThankYou />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/upload-vouchers" element={<VoucherUpload />} />
              <Route path="/admin/change-password" element={<ChangePassword />} />
              
              {/* Catch all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
