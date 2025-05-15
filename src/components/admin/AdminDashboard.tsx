
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUsers, mockLocations, mockVouchers } from "@/lib/mockData";
import { exportToCSV } from "@/lib/utils";
import { ChevronLeft, Download, LogOut, Upload, User } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Check authentication on component mount
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("twixAdminLoggedIn");
    if (adminLoggedIn !== "true") {
      setIsLoggedIn(false);
      navigate("/admin/login");
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("twixAdminLoggedIn");
    navigate("/admin/login");
  };
  
  const handleChangePassword = () => {
    navigate("/admin/change-password");
  };
  
  const handleExportData = () => {
    // Format data for export
    const reportData = mockUsers.map(user => {
      const location = mockLocations.find(loc => loc.id === user.location);
      const prize = user.prizes?.[0];
      
      return {
        Name: user.name,
        Email: user.email,
        PhoneNumber: user.phone,
        Location: location?.name || "Unknown",
        Country: location?.country || "Unknown",
        RegistrationDate: user.registrationDate,
        VoucherCode: prize?.voucherCode || "N/A",
        VoucherWinDate: prize?.date || "N/A",
      };
    });
    
    exportToCSV(reportData, "twix-campaign-report.csv");
  };
  
  const handleVoucherUpload = () => {
    navigate("/admin/upload-vouchers");
  };
  
  // Calculate stats
  const totalParticipants = mockUsers.length;
  const totalByLocation = mockLocations.map(location => ({
    id: location.id,
    name: location.name,
    count: mockUsers.filter(user => user.location === location.id).length,
  }));
  
  const totalVouchers = mockVouchers.length;
  const redeemedVouchers = mockVouchers.filter(v => v.isRedeemed).length;
  
  if (!isLoggedIn) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mobile-container">
      {/* Header */}
      <header className="bg-twix-brown text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <Button
          variant="ghost"
          className="text-white hover:bg-twix-brown/80"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </header>
      
      {/* Main content */}
      <main className="flex-1 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4 grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vouchers">Vouchers</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Participation Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Participants</p>
                    <p className="text-2xl font-bold text-twix-brown">{totalParticipants}</p>
                  </div>
                  <User className="h-8 w-8 text-twix-gold" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">By Location</p>
                  {totalByLocation.map((loc) => (
                    <div key={loc.id} className="flex justify-between text-sm">
                      <span>{loc.name}</span>
                      <span className="font-medium">{loc.count}</span>
                    </div>
                  ))}
                </div>
                
                <Button
                  onClick={handleExportData}
                  className="w-full mt-6 bg-twix-gold hover:bg-twix-gold/80 text-twix-brown"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Full Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vouchers" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Voucher Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Total Vouchers</p>
                    <p className="text-2xl font-bold text-twix-brown">{totalVouchers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Redeemed</p>
                    <p className="text-2xl font-bold text-twix-red">{redeemedVouchers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Available</p>
                    <p className="text-2xl font-bold text-green-600">{totalVouchers - redeemedVouchers}</p>
                  </div>
                </div>
                
                <Button
                  onClick={handleVoucherUpload}
                  className="w-full mt-2 bg-twix-gold hover:bg-twix-gold/80 text-twix-brown"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Vouchers (CSV)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-100 rounded-md mb-4">
                  <p className="font-medium">Admin</p>
                  <p className="text-sm text-gray-600">admin@twix.com</p>
                </div>
                
                <Button
                  onClick={handleChangePassword}
                  className="w-full mb-2 bg-twix-brown hover:bg-twix-brown/80"
                >
                  Change Password
                </Button>
                
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-twix-red text-twix-red hover:bg-twix-red/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
