import { Product as ProductType } from "../../types/product";
import Product from "../browse/Product";

interface Props {
  title: string;
  products: ProductType[];
}

const FeaturedList = ({ title, products }: Props) => {
  return (
    <div>
      <h3 className="font-bold text-gray-800 p-2 text-center text-xl lg:text-3xl">{title}</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
        {products.map((product) => (
          <Product {...product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedList;

//
