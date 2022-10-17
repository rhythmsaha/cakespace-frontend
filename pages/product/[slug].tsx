import { GetStaticPaths, GetStaticProps } from "next";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { Product } from "../../types/product";
import { axios } from "../../utils";
import { NextPageWithLayout } from "../_app";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";

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
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li className="text-sm">
              <a href={product.slug} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8"></div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? "text-gray-900" : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            <div className="mt-10">
              <div className="mt-4 space-y-6">
                <article
                  className="prose prose-slate"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></article>
              </div>
            </div>
          </div>
        </div>
      </div>
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
