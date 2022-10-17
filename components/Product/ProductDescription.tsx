import type { Product } from "../../types/product";
import { StarIcon } from "@heroicons/react/20/solid";
import numeral from "numeral";
import PincodeCheck from "./PincodeCheck";

interface Props {
  product: Product;
}

const ProductDescription: React.FC<Props> = ({ product }) => {
  return (
    <div className="lg:px-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">{product.name}</h1>
      </div>

      <div className="flex items-center gap-2 my-2">
        <span className="flex gap-1 items-center bg-green-600 rounded-md text-white px-2 py-1 justify-center">
          <span className="text-xs sm:text-sm font-medium">4.8</span>
          <span>
            <StarIcon className="h-3.5 w-3.5" />
          </span>
        </span>

        <p className="text-sm text-gray-500">Ratings & 222 Reviews</p>
      </div>

      <div className="px-1 flex items-end gap-2">
        <div className="flex items-center gap-2">
          <span className="text-4xl font-medium text-gray-800">₹</span>
          <span className="text-5xl font-semibold text-gray-800">{numeral(product.price).format("0,0.00")}</span>
        </div>

        <p className="text-sm text-gray-600">Inclusive of all taxes.</p>
      </div>

      <div className="my-4 space-y-4">
        <div>
          Every cake we offer is handcrafted and since each chef has his/her own way of baking and designing a cake,
          there might be slight variation in the product in terms of design and shape. The chosen delivery time is an
          estimate and depends on the availability of the product and the destination to which you want the product to
          be delivered. Since cakes are perishable in nature, we attempt delivery of your order only once. The delivery
          cannot be redirected to any other address. This product is hand delivered and will not be delivered along with
          courier products. Occasionally, substitutions of flavours/designs is necessary due to temporary and/or
          regional unavailability issues.
        </div>
      </div>
      <button className="w-full max-w-xs py-3 px-6 bg-indigo-600 text-white rounded-md">Add to Cart</button>

      <article className="prose" dangerouslySetInnerHTML={{ __html: product.description }} />
    </div>
  );
};
export default ProductDescription;
