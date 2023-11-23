export interface Product {
  id: string;
  thumbnail: string;
  name: string;
  price: number;
  description?: string;
  sku?: string;
  availability?: boolean;
}
export interface SummaryInfo {
  products: Product[];
  totalPrice: number;
}
