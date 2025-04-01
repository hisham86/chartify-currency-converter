
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import SalaryChart from "@/components/SalaryChart";
import { productManagementData, engineeringData } from "@/data/salaryData";

type CurrencyType = "IDR" | "MYR" | "USD" | "EUR";

const Index = () => {
  const [currency, setCurrency] = useState<CurrencyType>("IDR");
  // Conversion rates from IDR to other currencies (approximate)
  const conversionRates = {
    IDR: 1,
    MYR: 0.00029,
    USD: 0.000064,
    EUR: 0.000059
  };

  const handleCurrencyChange = (value: CurrencyType) => {
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
          onValueChange={(value) => handleCurrencyChange(value as CurrencyType)}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="IDR">IDR (Rupiah)</SelectItem>
            <SelectItem value="MYR">MYR (Ringgit)</SelectItem>
            <SelectItem value="USD">USD (Dollar)</SelectItem>
            <SelectItem value="EUR">EUR (Euro)</SelectItem>
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
                conversionRate={conversionRates[currency]} 
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
                conversionRate={conversionRates[currency]} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>* New joinee eligible for RSU/ESOP</p>
        <p>** Approximate conversion rates: 1 IDR ≈ 0.00029 MYR, 0.000064 USD, 0.000059 EUR</p>
      </div>
    </div>
  );
};

export default Index;
