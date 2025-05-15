
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { isValidEmail } from "@/lib/utils";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!email || !isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would validate credentials against your backend
      if (email === "admin@twix.com" && password === "twix123") {
        localStorage.setItem("twixAdminLoggedIn", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid email or password");
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please check your credentials and try again.",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  const handleForgotPassword = () => {
    if (!email || !isValidEmail(email)) {
      setError("Please enter a valid email address first");
      return;
    }
    
    toast({
      title: "Password reset email sent",
      description: `If ${email} is associated with an account, you'll receive a reset link.`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-twix-gold/30 to-white">
      <Card className="w-full max-w-md border-twix-brown/20">
        <CardHeader className="bg-twix-brown text-white rounded-t-lg">
          <CardTitle className="text-center text-xl">Admin Login</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-100 border border-red-300 rounded-md text-red-800 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-twix-red hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-twix-brown hover:bg-twix-brown/80"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-8 flex flex-col items-center">
        <img 
          src="/twix-logo.png" 
          alt="Twix Logo" 
          className="h-12 w-auto"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://placehold.co/200x80/D12A22/ffffff?text=TWIX";
          }}
        />
        <p className="text-sm text-twix-brown mt-2">Admin Portal</p>
      </div>
    </div>
  );
}
