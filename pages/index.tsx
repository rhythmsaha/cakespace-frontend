import type { NextPageWithLayout } from "./_app";
import type { GetStaticProps } from "next";
import type { Category } from "../types/categoriesTypes";
import { axios } from "../utils";

import Head from "next/head";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { Banner } from "../components/home";
import Categories from "../components/home/Categories";
import { Product } from "../types/product";
import { useEffect } from "react";
import FeaturedSection from "../components/home/FeaturedSection";

interface Props {
  categories: Category[];
  featuredProducts: {
    title: string;
    products: Product[];
  }[];
}

const Home: NextPageWithLayout<Props> = ({ categories, featuredProducts }) => {
  return (
    <div className="pb-20">
      <Head>
        <title>Cakespace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto lg:w-3/4 lg:mt-2">
        <Banner />
      </div>

      <main className="mx-auto w-11/12 lg:w-3/4">
        <section className="my-20 px-4">
          <Categories categories={categories} />
        </section>

        <section className="my-10">
          <FeaturedSection featured={featuredProducts} />
        </section>
      </main>
    </div>
  );
};

Home.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const [categories, featuredProducts] = await Promise.all([
      axios.get(`/categories`),
      axios.get(`/products/featured`),
    ]);

    return {
      props: {
        categories: categories.data,
        featuredProducts: featuredProducts.data,
      },
      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    return {
      props: {
        categories: [],
      },
      revalidate: 60 * 60 * 24,
    };
  }
};

export default Home;
