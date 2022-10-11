import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import FilterBar from "../../components/browse/FilterBar";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { Category, Flavour, SubCategory } from "../../types/categoriesTypes";
import { axios } from "../../utils";
import { NextPageWithLayout } from "../_app";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import MobileFilter from "../../components/browse/MobileFilter";
import SortBy from "../../components/browse/SortBy";

interface Props {
  category: string;
  categories: Category[];
  subCategories: SubCategory[];
  flavours: Flavour[];
}

const Category: NextPageWithLayout<Props> = ({ category, categories, flavours, subCategories }) => {
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [selectedFlavours, setSelectedFlavours] = useState<string[]>([]);

  const handlePriceChange = (value: number) => {
    setSelectedPrice(value);
  };

  const handleFlavourChange = (_flavours: string[]) => setSelectedFlavours(_flavours);

  return (
    <div className="flex browse-main-height overflow-hidden relative lg:px-10">
      <aside className="hidden lg:block border-r w-48">
        <SimpleBar style={{ maxHeight: "100%", scrollBehavior: "smooth" }} className="px-2">
          <h4 className="text-lg text-gray-600 font-semibold py-1 mt-8">Filter</h4>

          <div className="py-4">
            <FilterBar
              categories={categories}
              subCategories={subCategories}
              flavours={flavours}
              onPriceChange={handlePriceChange}
              onFlavourChange={handleFlavourChange}
              selectedFlavours={selectedFlavours}
            />
          </div>
        </SimpleBar>
      </aside>

      <div className="flex-1 mt-4 overflow-y-auto px-8">
        <div className="flex justify-between lg:justify-end items-center px-5 pb-3.5 lg:px-10 ">
          <MobileFilter
            categories={categories}
            subCategories={subCategories}
            flavours={flavours}
            onPriceChange={handlePriceChange}
            onFlavourChange={handleFlavourChange}
            selectedFlavours={selectedFlavours}
          />

          <SortBy />
        </div>
        <hr className="lg:mx-10" />

        <div></div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const categories = await axios.get("/categories?getSubcategories=true");
  const flavours = await axios.get("/flavours");
  const category: Category = categories.data.find((_cat: Category) => _cat.slug === context.params?.category);

  return {
    props: {
      key: context.params?.category,
      category: context.params?.category,
      categories: categories.data,
      subCategories: category.subCategories,
      flavours: flavours.data,
    },
    revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios(`/categories`);
  const categories = (await response.data) as Category[];

  const paths = categories.map(({ slug }) => ({
    params: { category: slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

Category.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Category;
