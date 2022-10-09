import React from "react";
import { Category, Flavour, SubCategory } from "../../types/categoriesTypes";

interface Props {
  flavours?: Flavour[];
  categories?: Category[];
  subCategories?: SubCategory[];
}

const FilterBar = ({ flavours, categories, subCategories }: Props) => {
  return (
    <div className="space-y-6">
      <div>
        <ul>
          {flavours?.map((flavour) => (
            <li key={flavour._id}>{flavour.name}</li>
          ))}
        </ul>
      </div>
      <div></div>
    </div>
  );
};

export default FilterBar;
