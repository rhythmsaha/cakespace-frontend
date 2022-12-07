import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { PaymentIntent } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { NextLink } from "../ui";

interface Props {
  paymentIntent: PaymentIntent | undefined;
}

const PaymentSuccess = ({ paymentIntent }: Props) => {
  const router = useRouter();
  return (
    <div className="h-full w-full flex items-center justify-center p-20">
      <div className="flex flex-col items-center p-10 border-2 border-gray-50 bg-white shadow-lg shadow-gray-200 rounded-xl w-full">
        <span>
          <CheckCircleIcon className="h-20 text-emerald-500" />
        </span>
        <p className="text-xl font-semibold text-emerald-600">Payment is successfull!</p>

        <div className="mt-2 flex flex-col items-center">
          <p className="text-gray-800">
            Your order number is <span className="font-medium">{paymentIntent?.created}</span>
          </p>

          <button
            onClick={() => router.replace("/orders")}
            className="mt-4 text-indigo-500 font-medium underline underline-offset-4"
          >
            View Order
          </button>
        </div>
      </div>
    </div>
  );
};
export default PaymentSuccess;
