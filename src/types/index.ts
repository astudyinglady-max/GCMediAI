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

export type Service = {
  name: string;
  description: string;
  features: string[];
  url: string;
};

export type BusinessArea = {
  id: string;
  name: string;
  description: string;
  services: Service[];
};
