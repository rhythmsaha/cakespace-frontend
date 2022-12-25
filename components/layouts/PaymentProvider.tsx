import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateClientSecret, updatePayment } from "../../store/slices/stripe";
import { axios } from "../../utils";
import LoadingScreen from "./LoadingScreen";

interface Props {
  children: React.ReactNode;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const PaymentProvider = ({ children }: Props) => {
  const clientSecret = useAppSelector((state) => state.payment.clientSecret);

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (clientSecret) {
      dispatch(updateClientSecret({ clientSecret }));
      return;
    }

    // Create PaymentIntent as soon as the page loads
    axios
      .post("/checkout/create-payment-intent", {})
      .then(({ data }) => {
        dispatch(
          updatePayment({
            clientSecret: data.clientSecret,
            orderId: data.orderId,
            totalAmount: data.amount,
          })
        );
      })
      .catch((err) => router.replace("/"));
  }, [router]);

  const appearance = {
    theme: "flat" as "flat" | "stripe" | "night" | "none" | undefined,
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (!clientSecret) return <LoadingScreen />;

  return (
    <Elements options={options} stripe={stripePromise}>
      {children}
    </Elements>
  );
};
export default PaymentProvider;
