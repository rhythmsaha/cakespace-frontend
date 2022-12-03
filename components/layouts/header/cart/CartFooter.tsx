import Link from "next/link";
import { useAppSelector } from "../../../../hooks";
import { NextLink } from "../../../ui";

interface Props {
  onClose: () => void;
}

const CartFooter: React.FC<Props> = ({ onClose }) => {
  const { totalAmount } = useAppSelector((state) => state.cart);

  return (
    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>&#x20B9;{totalAmount}</p>
      </div>
      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
      <div className="mt-6">
        <NextLink
          href="/checkout"
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Checkout
        </NextLink>
      </div>
      <div className="mt-6 flex gap-1 justify-center text-center text-sm text-gray-500">
        <p>or</p>
        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={onClose}>
          Continue Shopping
          <span aria-hidden="true"> &rarr;</span>
        </button>
      </div>
    </div>
  );
};
export default CartFooter;
