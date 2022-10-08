import { GetStaticPaths, GetStaticProps } from "next";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { axios } from "../../utils";
import { NextPageWithLayout } from "../_app";

interface Props {
  key: string;
  category: string;
  subcategory: string;
}

const Subcategory: NextPageWithLayout<Props> = ({ category, subcategory }) => {
  return (
    <div>
      {category} {subcategory}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      key: context.params?.category,
      category: context.params?.category,
      subcategory: context.params?.subcategory,
    },
    revalidate: 60 * 60 * 24,
  };
};

interface Subcategory {
  slug: string;
}

interface Category {
  slug: string;
  subCategories: Subcategory[];
}

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
