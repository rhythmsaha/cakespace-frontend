import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import useCart from "../../../../hooks/useCart";

interface Props {
  productId: string;
  quantity: number;
}

const ProductQuantity = ({ productId, quantity }: Props) => {
  const { cartLoading, addToCart, removeFromCart } = useCart();

  return (
    <div>
      <div className="flex items-center gap-4">
        <button
          className="p-1 rounded-full bg-gray-200 text-gray-700 active:bg-gray-300"
          onClick={() => addToCart(productId)}
        >
          <PlusSmallIcon className="h-4" />
        </button>
        <span className=" flex items-center justify-center font-medium text-gray-600">{quantity}</span>
        <button
          className="p-1 rounded-full bg-gray-200 text-gray-700 active:bg-gray-300"
          onClick={() => removeFromCart(productId)}
        >
          <MinusSmallIcon className="h-4" />
        </button>
      </div>
    </div>
  );
};
export default ProductQuantity;
