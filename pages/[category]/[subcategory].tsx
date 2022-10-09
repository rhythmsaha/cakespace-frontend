import { GetStaticPaths, GetStaticProps } from "next";
import FilterBar from "../../components/browse/FilterBar";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { Category, Flavour, SubCategory } from "../../types/categoriesTypes";
import { axios } from "../../utils";
import { NextPageWithLayout } from "../_app";

interface Props {
  key: string;
  category: string;
  subcategory: string;
  categories: Category[];
  flavours: Flavour[];
}

const Subcategory: NextPageWithLayout<Props> = ({ category, subcategory, categories, flavours }) => {
  return (
    <div>
      <FilterBar categories={categories} flavours={flavours} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const categories = await axios.get("/categories?getSubcategories=true");
  const flavours = await axios.get("/flavours");

  return {
    props: {
      key: context.params?.category,
      category: context.params?.category,
      subcategory: context.params?.subcategory,
      categories: categories.data,
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
