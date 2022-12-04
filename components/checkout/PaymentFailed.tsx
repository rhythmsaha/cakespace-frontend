/* eslint-disable @next/next/no-html-link-for-pages */
import { XCircleIcon } from "@heroicons/react/20/solid";
import { PaymentIntent } from "@stripe/stripe-js";

interface Props {
  paymentIntent: PaymentIntent | undefined;
}

const PaymentFailed = ({ paymentIntent }: Props) => {
  return (
    <div className="h-full w-full flex items-center justify-center p-20">
      <div className="flex flex-col items-center p-10 border-2 border-gray-50 bg-white shadow-lg shadow-gray-200 rounded-xl w-full">
        <span>
          <XCircleIcon className="h-20 text-red-500" />
        </span>
        <p className="text-xl font-semibold text-red-600">Payment failed!</p>

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
