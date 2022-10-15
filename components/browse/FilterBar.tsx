import React from "react";
import { Category, Flavour, SubCategory } from "../../types/categoriesTypes";
import CategoriesFilter from "./CategoriesFilter";
import FlavoursFilter from "./FlavoursFilter";
import PriceFilter from "./PriceFilter";
import SubCategoriesFilter from "./SubCategoriesFilter";
import "simplebar/dist/simplebar.min.css";

interface Props {
  flavours: Flavour[];
  categories?: Category[];
  subCategories?: SubCategory[];
  selectedFlavours: string[];
  onPriceChange: (value: number) => void;
  onFlavourChange: (flavours: string[]) => void;
}

const FilterBar = ({
  flavours,
  categories = [],
  subCategories = [],
  onPriceChange,
  onFlavourChange,
  selectedFlavours,
}: Props) => {
  return (
    <div className="px-8 w-60 bg-white">
      <h4 className="text-lg text-gray-600 font-semibold pt-8">Filter</h4>

      <div className="space-y-4 py-4">
        {categories.length > 0 && <CategoriesFilter categories={categories} />}
        {subCategories.length > 0 && <SubCategoriesFilter subCategories={subCategories} />}

        <FlavoursFilter flavours={flavours} onSelect={onFlavourChange} selectedFlavours={selectedFlavours} />
        <PriceFilter onSelect={onPriceChange} />
      </div>
    </div>
  );
};

export default FilterBar;
