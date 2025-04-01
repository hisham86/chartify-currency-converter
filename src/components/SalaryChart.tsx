import React from "react";
import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LabelList 
} from "recharts";
import { formatSalary } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface CompanyData {
  min: number;
  max: number;
}

interface SalaryData {
  position: string;
  tiket: CompanyData;
  bukalapak: CompanyData;
  gojek: CompanyData;
  grab: CompanyData;
  ovo: CompanyData;
}

interface SalaryChartProps {
  data: SalaryData[];
  currency: "IDR" | "MYR" | "USD" | "EUR";
  conversionRate: number;
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
    
    return (
      <Card className="p-3 border bg-white shadow-lg">
        <p className="font-bold">{label} - {company.charAt(0).toUpperCase() + company.slice(1)}</p>
        <p className="text-sm">Min: {formatSalary(minValue, currency)}</p>
        <p className="text-sm">Max: {formatSalary(maxValue, currency)}</p>
      </Card>
    );
  }
  return null;
};

const SalaryChart: React.FC<SalaryChartProps> = ({ data, currency, conversionRate }) => {
  const isMobile = useIsMobile();
  
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
        grab_min: item.grab.min * multiplier,
        grab_max: item.grab.max * multiplier,
        ovo_min: item.ovo.min * multiplier,
        ovo_max: item.ovo.max * multiplier,
      };
    });
  };

  const chartData = transformData(data);
  
  const companies = ["tiket", "bukalapak", "gojek", "grab", "ovo"];
  const colors = ["#3b82f6", "#ef4444", "#10b981", "#8b5cf6", "#f97316"];

  return (
    <div className="w-full overflow-x-auto">
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
            
            {companies.map((company, index) => (
              <Bar
                key={`${company}_max`}
                dataKey={`${company}_max`}
                name={`${company.charAt(0).toUpperCase() + company.slice(1)} Max`}
                fill={colors[index]}
                opacity={0.8}
                stackId={company}
              />
            ))}
            
            {companies.map((company, index) => (
              <Bar
                key={`${company}_min`}
                dataKey={`${company}_min`}
                name={`${company.charAt(0).toUpperCase() + company.slice(1)} Min`}
                fill={colors[index]}
                opacity={0.4}
                stackId={company}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalaryChart;
