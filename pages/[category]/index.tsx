import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { axios } from "../../utils";
import { NextPageWithLayout } from "../_app";

interface Props {
  category: string;
}

const Category: NextPageWithLayout<Props> = ({ category }) => {
  return <div>{category}</div>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      key: context.params?.category,
      category: context.params?.category,
    },
    revalidate: 60 * 60 * 24,
  };
};

interface Categories {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios(`/categories`);
  const categories = (await response.data) as Categories[];

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
