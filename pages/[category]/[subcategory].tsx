import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import FilterBar from "../../components/browse/FilterBar";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { Category, Flavour, SubCategory } from "../../types/categoriesTypes";
import { axios } from "../../utils";
import { NextPageWithLayout } from "../_app";
import SortBy from "../../components/browse/SortBy";
import MobileFilter from "../../components/browse/MobileFilter";
import ProductsList from "../../components/browse/ProductsList";
import { sortlist, SortObj } from "../../utils/config";
import StickyBox from "react-sticky-box";

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
  const [sortby, setSortby] = useState<SortObj>(sortlist[0]);

  const selectedCategory = categories.find((cat) => cat.slug === category);
  const selectedSubCategory = selectedCategory?.subCategories.find((_sub) => _sub.slug === subcategory);

  const handlePriceChange = (value: number) => {
    setSelectedPrice(value);
  };

  const handleFlavourChange = (_flavours: string[]) => setSelectedFlavours(_flavours);

  return (
    <div className="flex gap-6">
      <div className="border-r hidden lg:block browse-main-height">
        <StickyBox offsetTop={80} offsetBottom={20}>
          <FilterBar
            categories={categories}
            subCategories={subCategories}
            flavours={flavours}
            onPriceChange={handlePriceChange}
            onFlavourChange={handleFlavourChange}
            selectedFlavours={selectedFlavours}
          />
        </StickyBox>
      </div>

      <div className="flex-1 mb-20 mt-10">
        <div className="mx-auto w-11/12">
          <div className="flex justify-between lg:justify-end items-center gap-4 py-4 w-full">
            <MobileFilter
              categories={categories}
              subCategories={subCategories}
              flavours={flavours}
              onPriceChange={handlePriceChange}
              onFlavourChange={handleFlavourChange}
              selectedFlavours={selectedFlavours}
            />

            <SortBy selected={sortby} onSelect={setSortby} sortlist={sortlist} />
          </div>
          <hr className="lg:mx-10" />

          <ProductsList
            category={selectedCategory?._id}
            subCategory={selectedSubCategory?._id}
            flavours={selectedFlavours}
            price={selectedPrice}
            sortby={sortby.sortby}
          />
        </div>
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
