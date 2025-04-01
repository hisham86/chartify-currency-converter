
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format salary numbers to readable format with currency
export function formatSalary(value: number, currency: "IDR" | "MYR" | "USD" | "EUR", abbreviated = false): string {
  if (value === 0) return "N/A"; // Handle N/A values
  
  let symbol;
  switch (currency) {
    case "IDR":
      symbol = "Rp ";
      break;
    case "MYR":
      symbol = "RM ";
      break;
    case "USD":
      symbol = "$";
      break;
    case "EUR":
      symbol = "€";
      break;
    default:
      symbol = "";
  }
  
  // For abbreviated values on axes
  if (abbreviated) {
    if (value >= 1000000) {
      return `${symbol}${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${symbol}${(value / 1000).toFixed(1)}K`;
    }
    return `${symbol}${value}`;
  }
  
  // For detailed tooltip values
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(value);
}
