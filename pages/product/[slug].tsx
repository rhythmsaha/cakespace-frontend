import { useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { Product } from "../../types/product";
import { axios } from "../../utils";
import { NextPageWithLayout } from "../_app";
import ProductImageDesktop from "../../components/Product/ProductImagesDesktop";
import MobileImageBanner from "../../components/Product/MobileImageBanner";
import ProductDescription from "../../components/Product/ProductDescription";
import StickyBox from "react-sticky-box";

interface Props {
  product: Product;
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
          <StickyBox offsetTop={121}>
            <ProductImageDesktop images={product.images} />
          </StickyBox>
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
  const product = response.data.product;
  console.log(response.data.relatedProducts);

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
