import { useEffect } from "react";
import { useAppSelector } from "../../hooks";
import useCart from "../../hooks/useCart";

interface Props {
  orderId: string;
}

const CheckoutSummary = ({ orderId }: Props) => {
  const { items, totalAmount } = useAppSelector((state) => state.cart);
  const { fetchCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl px-8 py-10">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>

        <h4 className="mt-0.5 text-gray-800">
          Order ID:
          {!orderId && <span className="ml-2">Generating...</span>}
          {orderId && <span className="ml-2 font-medium">{orderId}</span>}
        </h4>
      </div>

      <hr className="mt-4 border-gray-200" />

      <div className="py-4">
        {items.map((item) => (
          <div key={item.product._id} className="flex items-center justify-between gap-2 w-full">
            <p className="truncate text-gray-700">{item.product.name}</p>
            <span className="flex-1 text-sm text-gray-400 font-semibold">x{item.quantity}</span>

            <p className="ml-10 text-gray-700">₹{item.totalPrice.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <hr className=" border-gray-200" />

      <div className="flex items-center justify-between mt-4">
        <p className="text-lg font-medium">Total:</p>
        <span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
};
export default CheckoutSummary;
