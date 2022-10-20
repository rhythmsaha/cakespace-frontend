import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const EmptyCart = () => {
  return (
    <div className="w-full h-full flex text-gray-500 flex-col justify-center items-center pt-[15vh]">
      <ShoppingBagIcon className="h-20" />
      <p className="mt-1 text-gray-700">Empty Cart</p>
    </div>
  );
};
export default EmptyCart;
