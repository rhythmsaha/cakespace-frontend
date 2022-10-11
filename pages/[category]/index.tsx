import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import FilterBar from "../../components/browse/FilterBar";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { Category, Flavour, SubCategory } from "../../types/categoriesTypes";
import { axios } from "../../utils";
import { NextPageWithLayout } from "../_app";

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
    <div>
      <FilterBar
        categories={categories}
        subCategories={subCategories}
        flavours={flavours}
        onPriceChange={handlePriceChange}
        onFlavourChange={handleFlavourChange}
        selectedFlavours={selectedFlavours}
      />
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
