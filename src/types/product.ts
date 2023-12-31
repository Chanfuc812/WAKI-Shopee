import { CategoryId } from "./category";

export interface PercentSale {
  type: "percent";
  percent: number;
}

export interface FixedSale {
  amount: number;
  type: "fixed";
}

export type Sale = PercentSale | FixedSale;

export interface Option {
  key: string;
  label?: string;
  priceChange?: Sale;
}

export interface BaseVariant {
  key: string;
  label?: string;
  options: Option[];
}

export interface SingleOptionVariant extends BaseVariant {
  type: "single";
  default?: string;
}

export interface MultipleOptionVariant extends BaseVariant {
  type: "multiple";
  default?: string[];
}

export type Variant = SingleOptionVariant | MultipleOptionVariant;

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  categoryId: CategoryId[];
  description?: string;
  sale?: Sale;
  variants?: Variant[];
  type: "recommend" | "bestSeller" | "new"| "quick" |"list" ; 
  gallery: [
    "https://waki.vn/wp-content/uploads/2023/03/camket1-1-510x510.jpg",
    "https://waki.vn/wp-content/uploads/2023/03/camket2-1-510x510.jpg",
    "https://waki.vn/wp-content/uploads/2023/03/camket3-510x510.jpg",
  ],
}

