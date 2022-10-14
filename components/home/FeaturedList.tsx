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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 mt-5">
        {products.map((product) => (
          <div key={product._id} className="max-w-sm min-w-[200px]">
            <Product {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedList;

//
