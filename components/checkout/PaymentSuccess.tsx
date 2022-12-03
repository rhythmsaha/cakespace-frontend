import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { PaymentIntent } from "@stripe/stripe-js";
import { NextLink } from "../ui";

interface Props {
  paymentIntent: PaymentIntent | undefined;
}

const PaymentSuccess = ({ paymentIntent }: Props) => {
  console.log(paymentIntent);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex  flex-col items-center p-10">
        <span>
          <CheckCircleIcon className="h-24 text-green-600" />
        </span>
        <p className="text-xl font-semibold text-green-600">Payment is successfull</p>

        <div className="mt-2 flex flex-col items-center">
          <p className="text-gray-800">
            Your order number is <span className="font-medium">{paymentIntent?.created}</span>
          </p>

          <NextLink href="#" className="mt-4 text-indigo-500 font-medium underline underline-offset-4">
            View Order
          </NextLink>
        </div>
      </div>
    </div>
  );
};
export default PaymentSuccess;
