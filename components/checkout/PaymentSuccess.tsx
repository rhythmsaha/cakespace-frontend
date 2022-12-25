import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { PaymentIntent } from "@stripe/stripe-js";
import { NextLink } from "../ui";

interface Props {
  paymentIntent: PaymentIntent | undefined;
}

const PaymentSuccess = ({ paymentIntent }: Props) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center p-10 lg:p-20 bg-white border-2 border-gray-50 shadow-lg shadow-gray-200 rounded-xl text-center ">
        <span>
          <CheckCircleIcon className="h-20 md:h-24 text-emerald-500" />
        </span>

        <p className="text-2xl sm:text-3xl font-semibold text-gray-700 mt-1">Order Placed!</p>

        <p className="text-base md:text-lg text-gray-600 max-w-lg mt-2">
          Your payment has been successfully processed and we have received your order. Your order number is{" "}
          <span className="font-medium">{paymentIntent?.created}</span>
        </p>

        <div className="mt-2 flex flex-col items-center">
          <NextLink href="/" className="mt-4 text-indigo-500 font-medium underline underline-offset-4">
            Continue shopping
          </NextLink>
        </div>
      </div>
    </div>
  );
};
export default PaymentSuccess;
