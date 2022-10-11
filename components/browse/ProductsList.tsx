import React, { useCallback, useEffect, useState } from "react";
import { Product } from "../../types/product";
import { axios } from "../../utils";

interface Props {
  sortby?: string;
  category?: string;
  subCategory?: string;
  flavours?: string[];
  price?: number;
}

function ProductsList({ category, subCategory, flavours, price, sortby }: Props) {
  const [productsList, setProductsList] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
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
  }, [category, subCategory, flavours, price, sortby]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {productsList.map((product) => (
        <div key={product._id}>
          <img src={product.images[0]} alt="" className="w-full aspect-square object-cover" />
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
