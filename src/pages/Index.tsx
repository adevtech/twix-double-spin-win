
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockLocations } from "@/lib/mockData";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [locationId, setLocationId] = useState<string | null>(null);
  
  useEffect(() => {
    // In a real scenario, the QR code would directly link to 
    // /register?location=locationId
    // For demo purposes, we'll check if there's a location param in the URL
    const params = new URLSearchParams(window.location.search);
    const locId = params.get("location");
    
    if (locId) {
      setLocationId(locId);
      // Auto-redirect if location is in the URL
      navigate(`/register?location=${locId}`);
    }
  }, [navigate]);
  
  const handleLocationClick = (locId: string) => {
    navigate(`/register?location=${locId}`);
  };
  
  const handleAdminLogin = () => {
    navigate("/admin/login");
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-twix-gold/30 to-white">
      <img 
        src="/twix-logo.png" 
        alt="Twix Logo" 
        className="h-16 w-auto mb-8"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "https://placehold.co/200x80/D12A22/ffffff?text=TWIX";
        }}
      />
      
      <Card className="w-full max-w-md border-twix-brown/20 mb-6">
        <CardHeader className="bg-twix-red text-white rounded-t-lg">
          <CardTitle className="text-center text-xl">Twix Chocolate Campaign</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center space-y-4">
          <p className="text-twix-brown">
            Welcome to the Twix chocolate campaign! Scan the QR code at your location or select your location below to start.
          </p>
          
          <div className="mt-6 space-y-2">
            <p className="font-medium text-twix-brown mb-2">Select Your Location:</p>
            
            {mockLocations.map((loc) => (
              <Button 
                key={loc.id}
                onClick={() => handleLocationClick(loc.id)}
                variant="outline" 
                className="w-full justify-between border-twix-gold hover:bg-twix-gold/10 text-twix-brown"
              >
                {loc.name}, {loc.country}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <button 
        onClick={handleAdminLogin}
        className="text-sm text-twix-brown/60 hover:text-twix-brown"
      >
        Admin Login
      </button>
    </div>
  );
};

export default Index;
