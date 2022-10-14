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
  searchQuery?: string | string[];
}

function ProductsList({ category, subCategory, flavours, price, sortby, searchQuery }: Props) {
  const [loading, setLoading] = useState(true);
  const [productsList, setProductsList] = useState<ProductType[]>([]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/products`, {
        params: { category, subCategories: subCategory, flavours, price, sortby, searchQuery },
      });
      const products = await response.data.products;

      setProductsList(products);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }, [category, subCategory, flavours, price, sortby, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (!loading && productsList.length === 0) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <p className="text-gray-600">No Products Found!</p>
      </div>
    );
  }

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
            images={product.images}
            price={product.price}
            stock={product.stocks}
            description={product.description}
            slug={product.slug}
          />
        ))}
    </div>
  );
}

export default ProductsList;
