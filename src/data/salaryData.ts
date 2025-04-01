
// Salary data based on the provided chart
// All values are in Indonesian Rupiah (IDR)

export interface CompanyData {
  min: number;
  max: number;
}

export interface SalaryData {
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

// Product Management roles data
export const productManagementData: SalaryData[] = [
  {
    position: "Associate PM",
    tiket: { min: 6000000, max: 14950000 },
    bukalapak: { min: 8217516, max: 19642266 },
    gojek: { min: 19754432, max: 33385764 },
    grabMy: { min: 5000000, max: 13000000 },
    grabSg: { min: 6500000, max: 18000000 },
    ovo: { min: 7557922, max: 13374738 },
    shopee: { min: 6500000, max: 18000000 },
    shopeeMy: { min: 5800000, max: 15000000 },
    touchngo: { min: 5200000, max: 14000000 }
  },
  {
    position: "Product Manager",
    tiket: { min: 8050000, max: 17250000 },
    bukalapak: { min: 16976420, max: 26496937 },
    gojek: { min: 27579815, max: 46611198 },
    grabMy: { min: 8000000, max: 21000000 },
    grabSg: { min: 10000000, max: 28000000 },
    ovo: { min: 10487651, max: 18410286 },
    shopee: { min: 10000000, max: 25000000 },
    shopeeMy: { min: 8500000, max: 22000000 },
    touchngo: { min: 9000000, max: 22000000 }
  },
  {
    position: "Sr. Product Manager",
    tiket: { min: 9200000, max: 23000000 },
    bukalapak: { min: 22688730, max: 36289324 },
    gojek: { min: 38505395, max: 65076108 },
    grabMy: { min: 8000000, max: 22000000 },
    grabSg: { min: 10000000, max: 27000000 },
    ovo: { min: 14540586, max: 25717198 },
    shopee: { min: 15000000, max: 35000000 },
    shopeeMy: { min: 12000000, max: 28000000 },
    touchngo: { min: 13000000, max: 30000000 }
  },
  {
    position: "Lead Product Manager",
    tiket: { min: 17250000, max: 34500000 },
    bukalapak: { min: 30849086, max: 64135250 },
    gojek: { min: 53759016, max: 90855306 },
    grabMy: { min: 12000000, max: 32000000 },
    grabSg: { min: 15000000, max: 40000000 },
    ovo: { min: 23926470, max: 41056463 },
    shopee: { min: 25000000, max: 45000000 },
    shopeeMy: { min: 20000000, max: 38000000 },
    touchngo: { min: 22000000, max: 38000000 }
  },
  {
    position: "Head of PM",
    tiket: { min: 23000000, max: 51750000 },
    bukalapak: { min: 48976009, max: 106571796 },
    gojek: { min: 75055048, max: 126847171 },
    grabMy: { min: 20000000, max: 48000000 },
    grabSg: { min: 25000000, max: 65000000 },
    ovo: { min: 28910313, max: 49685325 },
    shopee: { min: 40000000, max: 70000000 },
    shopeeMy: { min: 32000000, max: 60000000 },
    touchngo: { min: 35000000, max: 60000000 }
  }
];

// Engineering roles data
export const engineeringData: SalaryData[] = [
  {
    position: "Jr Engineer",
    tiket: { min: 6900000, max: 14950000 },
    bukalapak: { min: 12977651, max: 19642266 },
    gojek: { min: 22615385, max: 35307692 },
    grabMy: { min: 5200000, max: 14000000 },
    grabSg: { min: 6200000, max: 17000000 },
    ovo: { min: 7557922, max: 13374738 },
    shopee: { min: 7500000, max: 17000000 },
    shopeeMy: { min: 6800000, max: 15000000 },
    touchngo: { min: 6000000, max: 15000000 }
  },
  {
    position: "Engineer (Mid)",
    tiket: { min: 8050000, max: 17250000 },
    bukalapak: { min: 16976420, max: 26496937 },
    gojek: { min: 39576923, max: 52961539 },
    grabMy: { min: 8000000, max: 21000000 },
    grabSg: { min: 10000000, max: 28000000 },
    ovo: { min: 10487651, max: 18410286 },
    shopee: { min: 12000000, max: 26000000 },
    shopeeMy: { min: 10000000, max: 22000000 },
    touchngo: { min: 10000000, max: 23000000 }
  },
  {
    position: "Sr Engineer",
    tiket: { min: 9200000, max: 23000000 },
    bukalapak: { min: 22688730, max: 36289324 },
    gojek: { min: 67846154, max: 141230769 },
    grabMy: { min: 8000000, max: 22000000 },
    grabSg: { min: 10000000, max: 27000000 },
    ovo: { min: 14540586, max: 25717198 },
    shopee: { min: 18000000, max: 38000000 },
    shopeeMy: { min: 15000000, max: 32000000 },
    touchngo: { min: 15000000, max: 32000000 }
  },
  {
    position: "Principal / Tech Lead",
    tiket: { min: 17250000, max: 34500000 },
    bukalapak: { min: 30849086, max: 50900992 },
    gojek: { min: 115500000, max: 0 }, // N/A for max, set to 0
    grabMy: { min: 12000000, max: 32000000 },
    grabSg: { min: 15000000, max: 40000000 },
    ovo: { min: 23926470, max: 41056463 },
    shopee: { min: 28000000, max: 55000000 },
    shopeeMy: { min: 24000000, max: 45000000 },
    touchngo: { min: 25000000, max: 48000000 }
  },
  {
    position: "Sr Principal / Engineering Manager",
    tiket: { min: 23000000, max: 51750000 },
    bukalapak: { min: 38869849, max: 64135250 },
    gojek: { min: 0, max: 0 }, // N/A for both
    grabMy: { min: 20000000, max: 45000000 },
    grabSg: { min: 25000000, max: 70000000 },
    ovo: { min: 28910313, max: 49685325 },
    shopee: { min: 45000000, max: 75000000 },
    shopeeMy: { min: 35000000, max: 60000000 },
    touchngo: { min: 38000000, max: 65000000 }
  },
  {
    position: "Architect / AVP",
    tiket: { min: 40250000, max: 80500000 },
    bukalapak: { min: 48976009, max: 106571796 },
    gojek: { min: 0, max: 0 }, // N/A for both
    grabMy: { min: 32000000, max: 85000000 },
    grabSg: { min: 40000000, max: 110000000 },
    ovo: { min: 34455289, max: 72917805 },
    shopee: { min: 60000000, max: 120000000 },
    shopeeMy: { min: 48000000, max: 95000000 },
    touchngo: { min: 50000000, max: 95000000 }
  }
];

// Country information - mapping companies to countries
export const companyCountryMap = {
  tiket: "Indonesia",
  bukalapak: "Indonesia",
  gojek: "Indonesia",
  grabMy: "Malaysia",
  grabSg: "Singapore",
  ovo: "Indonesia",
  shopee: "Singapore",
  shopeeMy: "Malaysia",
  touchngo: "Malaysia"
};
