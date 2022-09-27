import { useRouter } from "next/router";
import type { NextPageWithLayout } from "./_app";

const Products: NextPageWithLayout = () => {
  const router = useRouter();
  console.log(router.query);

  return <div>Products</div>;
};

export default Products;
