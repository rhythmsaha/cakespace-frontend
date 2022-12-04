import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import { PaymentIntent } from "@stripe/stripe-js";
import { NextLink } from "../ui";

interface Props {
  paymentIntent: PaymentIntent | undefined;
}

const PaymentProcessing = ({ paymentIntent }: Props) => {
  return (
    <div className="h-full w-full flex items-center justify-center p-20">
      <div className="flex flex-col items-center p-10 border-2 border-gray-50 bg-white shadow-lg shadow-gray-200 rounded-xl w-full">
        <span>
          <ClockIcon className="h-20 text-indigo-500" />
        </span>
        <p className="text-xl font-semibold text-indigo-600">Your Payment is proccessing!</p>
        <p className="text-xs text-gray-400">Please refresh to see updates!</p>

        <div className="mt-2 flex flex-col items-center">
          <p className="text-gray-800">
            Your order number is <span className="font-medium">{paymentIntent?.created}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default PaymentProcessing;
