import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import FilterBar from "../../components/browse/FilterBar";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { Category, Flavour, SubCategory } from "../../types/categoriesTypes";
import { axios } from "../../utils";
import { NextPageWithLayout } from "../_app";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import SortBy from "../../components/browse/SortBy";
import MobileFilter from "../../components/browse/MobileFilter";

interface Props {
  key: string;
  category: string;
  subcategory: string;
  categories: Category[];
  subCategories: SubCategory[];
  flavours: Flavour[];
}

const Subcategory: NextPageWithLayout<Props> = ({ category, subcategory, categories, flavours, subCategories }) => {
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

      <div className="flex-1 mt-6 overflow-y-auto px-8">
        <div className="flex justify-between lg:justify-end items-center px-5 py-4 lg:px-10 ">
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
      subcategory: context.params?.subcategory,
      categories: categories.data,
      subCategories: category.subCategories,
      flavours: flavours.data,
    },
    revalidate: 60 * 60 * 24,
  };
};

interface StaticPath {
  params: { category: string; subcategory: string };
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const response = await axios(`/categories?getSubcategories=true`);
  const categories: Category[] = await response.data;

  const staticPaths: StaticPath[] = [];

  categories.forEach((cat) => {
    cat.subCategories.forEach((sc) => {
      staticPaths.push({ params: { category: cat.slug, subcategory: sc.slug } });
    });
  });

  return {
    paths: staticPaths,
    fallback: false,
  };
};

Subcategory.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Subcategory;
