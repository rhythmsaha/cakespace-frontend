export interface SortObj {
  id: number;
  label: string;
  sortby: string;
}

export const sortlist: SortObj[] = [
  {
    id: 1,
    label: "Popularity",
    sortby: "POPULARITY",
  },

  {
    id: 2,
    label: "Price low to high",
    sortby: "PRICE_LOW_TO_HIGH",
  },

  {
    id: 3,
    label: "Price high to low",
    sortby: "PRICE_HIGH_TO_LOW",
  },
];
