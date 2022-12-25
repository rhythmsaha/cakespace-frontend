/* eslint-disable @next/next/no-html-link-for-pages */
import { XCircleIcon } from "@heroicons/react/20/solid";
import { PaymentIntent } from "@stripe/stripe-js";

interface Props {
  paymentIntent: PaymentIntent | undefined;
}

const PaymentFailed = ({ paymentIntent }: Props) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center p-10 lg:p-20 bg-white border-2 border-gray-50 shadow-lg shadow-gray-200 rounded-xl text-center">
        <span>
          <XCircleIcon className="h-20 md:h-24 text-red-500" />
        </span>

        <p className="text-2xl sm:text-3xl font-semibold text-gray-700 mt-1">Payment failed!</p>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-lg mt-2">
          Your payment has been failed and we are unable to process your order
        </p>

        <div className="mt-2 flex flex-col items-center">
          <a href="/checkout" className="mt-4 text-indigo-500 font-medium underline underline-offset-4">
            Try again
          </a>
        </div>
      </div>
    </div>
  );
};
export default PaymentFailed;
