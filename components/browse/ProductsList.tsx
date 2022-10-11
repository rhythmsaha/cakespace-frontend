import React, { useCallback, useEffect, useState } from "react";
import type { Product as ProductType } from "../../types/product";
import { axios } from "../../utils";
import Product from "./Product";
import ProductSkelaton from "./ProductSkelaton";

interface Props {
  sortby?: string;
  category?: string;
  subCategory?: string;
  flavours?: string[];
  price?: number;
}

function ProductsList({ category, subCategory, flavours, price, sortby }: Props) {
  const [loading, setLoading] = useState(true);
  const [productsList, setProductsList] = useState<ProductType[]>([]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/products`, {
        params: { category, subCategories: subCategory, flavours, price, sortby },
      });
      const products = await response.data.products;
      console.log(products);

      setProductsList(products);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }, [category, subCategory, flavours, price, sortby]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-4 mt-6">
      {loading && (
        <>
          <ProductSkelaton />
          <ProductSkelaton />
          <ProductSkelaton />
          <ProductSkelaton />
        </>
      )}

      {!loading &&
        productsList.map((product) => (
          <Product
            key={product._id}
            name={product.name}
            image={product.images[0]}
            price={product.price}
            stock={product.stocks}
            description={product.description}
          />
        ))}
    </div>
  );
}

export default ProductsList;
