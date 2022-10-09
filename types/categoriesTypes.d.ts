export interface Flavour {
  _id: string;
  name: String;
  slug: string;
}

export interface Category {
  _id: string;
  name: String;
  slug: string;
  image: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  _id: string;
  name: String;
  slug: string;
}
