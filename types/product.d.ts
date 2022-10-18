export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  subCategories: string[];
  flavours: string[];
  weight: number;
  price: number;
  images: string[];
  stocks: number;
}
