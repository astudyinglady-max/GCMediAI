export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  preview: string;
  category: string;
  body: string;
};

export type IrFinancial = {
  year: number;
  revenue: number;
  operatingProfit: number;
};

export type Disclosure = {
  id: string;
  title: string;
  date: string;
  dartUrl: string;
};

export type BusinessStat = {
  value: string;
  label: string;
};

export type Service = {
  name: string;
  slogan?: string;
  description: string;
  features: string[];
  url: string;
  tag?: string;
  badge?: string;
};

export type BusinessArea = {
  id: string;
  name: string;
  tabLabel: string;
  description: string;
  stats?: BusinessStat[];
  services: Service[];
};

export type FinancialRow = {
  label: string;
  values: number[]; // 연도 순서와 동일
  isTotal?: boolean;
  isSubTotal?: boolean;
  indent?: boolean;
  isNegative?: boolean; // 음수 강조 허용
};
