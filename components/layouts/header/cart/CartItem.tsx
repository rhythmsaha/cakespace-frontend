import Image from "next/future/image";
import useCart from "../../../../hooks/useCart";
import { CartItem } from "../../../../types/userTypes";
import ProductQuantity from "./ProductQuantity";

const CartItem = ({ product, quantity, totalPrice }: CartItem) => {
  const { deleteItemFromCart } = useCart();

  return (
    <li key={product._id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          height={100}
          width={100}
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-base text-gray-700">{product.name}</h3>
              <p className="text-sm text-gray-500 space-x-1">
                <span className="">Price:</span>
                <span>&#x20B9;{product.price}</span>
              </p>
            </div>

            <p className="ml-4 font-semibold text-pink-500">&#x20B9;{totalPrice}</p>
          </div>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm">
          <div>
            <ProductQuantity productId={product._id} quantity={quantity} />
          </div>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => deleteItemFromCart(product._id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
export default CartItem;
