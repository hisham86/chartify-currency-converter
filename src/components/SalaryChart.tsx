import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from "recharts";
import { formatSalary } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { companyCountryMap } from "@/data/salaryData";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CompanyData {
  min: number;
  max: number;
}

interface SalaryData {
  position: string;
  tiket: CompanyData;
  bukalapak: CompanyData;
  gojek: CompanyData;
  grabMy: CompanyData;
  grabSg: CompanyData;
  ovo: CompanyData;
  shopee: CompanyData;
  shopeeMy: CompanyData;
  touchngo: CompanyData;
}

interface SalaryChartProps {
  data: SalaryData[];
  currency: "IDR" | "MYR" | "USD" | "EUR";
  conversionRate: number;
  selectedCountry: "all" | "Indonesia" | "Malaysia" | "Singapore";
}

// Custom tooltip to display min and max values
const CustomTooltip = ({ active, payload, label, currency }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const company = payload[0].dataKey.split('_')[0];
    const minKey = `${company}_min`;
    const maxKey = `${company}_max`;
    
    const minValue = data[minKey];
    const maxValue = data[maxKey];
    const country = companyCountryMap[company as keyof typeof companyCountryMap];
    
    return (
      <Card className="p-3 border bg-white shadow-lg">
        <p className="font-bold">{label} - {company.charAt(0).toUpperCase() + company.slice(1)}</p>
        <p className="text-xs text-gray-500">{country}</p>
        <p className="text-sm">Min: {formatSalary(minValue, currency)}</p>
        <p className="text-sm">Max: {formatSalary(maxValue, currency)}</p>
      </Card>
    );
  }
  return null;
};

const SalaryChart: React.FC<SalaryChartProps> = ({ data, currency, conversionRate, selectedCountry }) => {
  const isMobile = useIsMobile();
  const [visibleCompanies, setVisibleCompanies] = useState<Record<string, boolean>>({
    tiket: true,
    bukalapak: true,
    gojek: true,
    grabMy: true,
    grabSg: true,
    ovo: true,
    shopee: true,
    shopeeMy: true,
    touchngo: true
  });
  
  // Filter companies based on selected country
  const filteredCompanies = useMemo(() => {
    const allCompanies = ["tiket", "bukalapak", "gojek", "grabMy", "grabSg", "ovo", "shopee", "shopeeMy", "touchngo"];
    
    if (selectedCountry === "all") {
      return allCompanies.filter(company => visibleCompanies[company]);
    }
    
    return allCompanies.filter(company => {
      const companyCountry = companyCountryMap[company as keyof typeof companyCountryMap];
      return companyCountry === selectedCountry && visibleCompanies[company];
    });
  }, [selectedCountry, visibleCompanies]);

  // Get available companies for the current country filter
  const availableCompanies = useMemo(() => {
    const allCompanies = ["tiket", "bukalapak", "gojek", "grabMy", "grabSg", "ovo", "shopee", "shopeeMy", "touchngo"];
    
    if (selectedCountry === "all") {
      return allCompanies;
    }
    
    return allCompanies.filter(company => {
      const companyCountry = companyCountryMap[company as keyof typeof companyCountryMap];
      return companyCountry === selectedCountry;
    });
  }, [selectedCountry]);
  
  // Transform data for the chart
  const transformData = (data: SalaryData[]) => {
    return data.map(item => {
      // Apply currency conversion if needed
      const multiplier = conversionRate;
      
      return {
        position: item.position,
        tiket_min: item.tiket.min * multiplier,
        tiket_max: item.tiket.max * multiplier,
        bukalapak_min: item.bukalapak.min * multiplier,
        bukalapak_max: item.bukalapak.max * multiplier,
        gojek_min: item.gojek.min * multiplier,
        gojek_max: item.gojek.max * multiplier,
        grabMy_min: item.grabMy.min * multiplier,
        grabMy_max: item.grabMy.max * multiplier,
        grabSg_min: item.grabSg.min * multiplier,
        grabSg_max: item.grabSg.max * multiplier,
        ovo_min: item.ovo.min * multiplier,
        ovo_max: item.ovo.max * multiplier,
        shopee_min: item.shopee.min * multiplier,
        shopee_max: item.shopee.max * multiplier,
        shopeeMy_min: item.shopeeMy.min * multiplier,
        shopeeMy_max: item.shopeeMy.max * multiplier,
        touchngo_min: item.touchngo.min * multiplier,
        touchngo_max: item.touchngo.max * multiplier,
      };
    });
  };

  const chartData = transformData(data);
  
  const companies = ["tiket", "bukalapak", "gojek", "grabMy", "grabSg", "ovo", "shopee", "shopeeMy", "touchngo"];
  const colors = ["#3b82f6", "#ef4444", "#10b981", "#8b5cf6", "#6366f1", "#f97316", "#ec4899", "#d946ef", "#14b8a6"];

  const toggleCompany = (company: string) => {
    setVisibleCompanies(prev => ({
      ...prev,
      [company]: !prev[company]
    }));
  };

  const getCompanyDisplayName = (company: string) => {
    if (company === "grabMy") return "Grab MY";
    if (company === "grabSg") return "Grab SG";
    if (company === "shopeeMy") return "Shopee MY";
    return company.charAt(0).toUpperCase() + company.slice(1);
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap gap-4">
        {availableCompanies.map((company, index) => (
          <div key={company} className="flex items-center space-x-2">
            <Checkbox 
              id={`company-${company}`}
              checked={visibleCompanies[company]}
              onCheckedChange={() => toggleCompany(company)}
            />
            <Label 
              htmlFor={`company-${company}`}
              className="flex items-center space-x-1"
            >
              <div 
                className="w-3 h-3 rounded-full inline-block" 
                style={{ backgroundColor: colors[companies.indexOf(company)] }}
              />
              <span>{getCompanyDisplayName(company)}</span>
              <span className="text-xs text-gray-500">
                ({companyCountryMap[company as keyof typeof companyCountryMap]})
              </span>
            </Label>
          </div>
        ))}
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[800px] h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: isMobile ? 100 : 150, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                tickFormatter={(value) => formatSalary(value, currency, true)}
              />
              <YAxis
                dataKey="position"
                type="category"
                width={140}
                tick={{ fontSize: isMobile ? 10 : 12 }}
              />
              <Tooltip content={<CustomTooltip currency={currency} />} />
              <Legend />
              
              {filteredCompanies.map((company, index) => (
                <Bar
                  key={`${company}_max`}
                  dataKey={`${company}_max`}
                  name={`${getCompanyDisplayName(company)} Max`}
                  fill={colors[companies.indexOf(company)]}
                  opacity={0.8}
                  stackId={company}
                />
              ))}
              
              {filteredCompanies.map((company, index) => (
                <Bar
                  key={`${company}_min`}
                  dataKey={`${company}_min`}
                  name={`${getCompanyDisplayName(company)} Min`}
                  fill={colors[companies.indexOf(company)]}
                  opacity={0.4}
                  stackId={company}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalaryChart;
