
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import SalaryChart from "@/components/SalaryChart";
import { productManagementData, engineeringData } from "@/data/salaryData";

const Index = () => {
  const [currency, setCurrency] = useState<"IDR" | "MYR">("IDR");
  const [conversionRate] = useState(0.00029); // 1 IDR = 0.00029 MYR (approximate)

  const handleCurrencyChange = (value: "IDR" | "MYR") => {
    setCurrency(value);
    toast({
      title: "Currency Updated",
      description: `Displaying salaries in ${value}`,
      duration: 2000,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Salary Range Comparison Chart</h1>
      
      <div className="flex justify-end mb-4">
        <Select
          value={currency}
          onValueChange={(value) => handleCurrencyChange(value as "IDR" | "MYR")}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="IDR">IDR (Rupiah)</SelectItem>
            <SelectItem value="MYR">MYR (Ringgit)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="productManagement" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="productManagement">Product Management</TabsTrigger>
          <TabsTrigger value="engineering">Engineering</TabsTrigger>
        </TabsList>
        
        <TabsContent value="productManagement">
          <Card>
            <CardHeader>
              <CardTitle>Product Management Salary Ranges</CardTitle>
            </CardHeader>
            <CardContent>
              <SalaryChart 
                data={productManagementData} 
                currency={currency} 
                conversionRate={conversionRate} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="engineering">
          <Card>
            <CardHeader>
              <CardTitle>Engineering Salary Ranges</CardTitle>
            </CardHeader>
            <CardContent>
              <SalaryChart 
                data={engineeringData} 
                currency={currency} 
                conversionRate={conversionRate} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>* New joinee eligible for RSU/ESOP</p>
        <p>** Conversion rate: 1 IDR ≈ 0.00029 MYR (approximate)</p>
      </div>
    </div>
  );
};

export default Index;
