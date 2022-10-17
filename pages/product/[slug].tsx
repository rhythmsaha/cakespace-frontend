import { GetStaticPaths, GetStaticProps } from "next";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { Product } from "../../types/product";
import { axios } from "../../utils";
import { NextPageWithLayout } from "../_app";
import { useEffect } from "react";

import ProductImageDesktop from "../../components/Product/ProductImagesDesktop";
import MobileImageBanner from "../../components/Product/MobileImageBanner";
import ProductDescription from "../../components/Product/ProductDescription";

const reviews = { href: "#", average: 4, totalCount: 117 };

interface Props {
  product: Product;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const ProductPage: NextPageWithLayout<Props> = ({ product }) => {
  useEffect(() => {
    axios
      .post(`/products/views/${product.slug}`)
      .then((res) => res.data)
      .catch((e) => e);
  }, [product]);

  return (
    <div className="min-h-screen max-w-7xl mx-auto lg:w-11/12">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:py-10">
        <section className="hidden lg:block">
          <ProductImageDesktop images={product.images} />
        </section>

        <section className="lg:hidden">
          <MobileImageBanner images={product.images} />
        </section>

        <section className="px-4 sm:px-6 lg:px-0">
          <ProductDescription product={product} />
        </section>
      </section>
    </div>
  );
};

ProductPage.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default ProductPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await axios.get(`/products/${context.params?.slug}`);
  const product = response.data;

  return {
    props: {
      key: product.slug,
      product: product,
    },
    revalidate: 60 * 60 * 24,
  };
};

interface StaticPath {
  params: { slug: string };
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const response = await axios.get(`/products`);
  const products = (await response.data.products) as Product[];

  const staticPaths: StaticPath[] = products.map((product) => {
    const path = { params: { slug: product.slug } };
    return path;
  });

  return {
    paths: staticPaths,
    fallback: false,
  };
};
