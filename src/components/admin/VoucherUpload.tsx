
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { parseCSV } from "@/lib/utils";
import { ArrowLeft, FileUp, Check } from "lucide-react";

export default function VoucherUpload() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setParsedData([]);
      setUploadComplete(false);
    }
  };
  
  const handleParseFile = () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a CSV file to upload",
      });
      return;
    }
    
    setParsing(true);
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        const data = parseCSV(csvText);
        
        // Validate the CSV format
        const requiredFields = ["Country", "Location", "VoucherType", "RedeemCode", "Quantity"];
        const hasAllFields = requiredFields.every(field => 
          data[0] && Object.keys(data[0]).includes(field)
        );
        
        if (!hasAllFields) {
          toast({
            variant: "destructive",
            title: "Invalid CSV format",
            description: `CSV must include: ${requiredFields.join(", ")}`,
          });
          setParsing(false);
          return;
        }
        
        setParsedData(data);
        toast({
          title: "CSV parsed successfully",
          description: `Found ${data.length} voucher entries`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error parsing CSV",
          description: "Please make sure your CSV is correctly formatted",
        });
        console.error("CSV parsing error:", error);
      }
      
      setParsing(false);
    };
    
    reader.onerror = () => {
      toast({
        variant: "destructive",
        title: "Error reading file",
        description: "There was a problem reading the selected file",
      });
      setParsing(false);
    };
    
    reader.readAsText(selectedFile);
  };
  
  const handleUpload = () => {
    if (parsedData.length === 0) {
      toast({
        variant: "destructive",
        title: "No data to upload",
        description: "Please parse a valid CSV file first",
      });
      return;
    }
    
    setUploading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Vouchers uploaded successfully",
        description: `Added ${parsedData.length} vouchers to the system`,
      });
      
      setUploading(false);
      setUploadComplete(true);
    }, 1500);
  };
  
  const handleBack = () => {
    navigate("/admin/dashboard");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mobile-container">
      {/* Header */}
      <header className="bg-twix-brown text-white p-4 flex items-center">
        <Button
          variant="ghost"
          className="text-white hover:bg-twix-brown/80 mr-2"
          onClick={handleBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Upload Vouchers</h1>
      </header>
      
      {/* Main content */}
      <main className="flex-1 p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upload Vouchers CSV</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <FileUp className="h-10 w-10 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-500 mb-4">
                Upload a CSV file with the following columns:
                <br />
                <span className="font-medium">Country, Location Name, Voucher Type, Redeem Codes, Quantity</span>
              </p>
              
              <Input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="max-w-xs mx-auto"
              />
              
              {selectedFile && (
                <p className="mt-2 text-sm text-twix-brown">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>
            
            {selectedFile && !parsedData.length && !uploadComplete && (
              <Button
                onClick={handleParseFile}
                disabled={parsing}
                className="w-full bg-twix-gold hover:bg-twix-gold/80 text-twix-brown"
              >
                {parsing ? "Parsing..." : "Parse CSV"}
              </Button>
            )}
            
            {parsedData.length > 0 && !uploadComplete && (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-800 font-medium">
                    Successfully parsed {parsedData.length} voucher entries
                  </p>
                </div>
                
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full bg-twix-red hover:bg-twix-red/80"
                >
                  {uploading ? "Uploading..." : "Upload Vouchers"}
                </Button>
              </div>
            )}
            
            {uploadComplete && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md flex items-center">
                <Check className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <p className="text-green-800 font-medium">
                    Vouchers uploaded successfully
                  </p>
                  <p className="text-sm text-green-700">
                    {parsedData.length} vouchers have been added to the system
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
