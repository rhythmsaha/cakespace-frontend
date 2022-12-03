import { useState, useEffect } from "react";
import AuthGuard from "../components/guards/AuthGuard";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { useAppSelector } from "../hooks";
import { NextPageWithLayout } from "./_app";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { axios } from "../utils";
import toast from "react-hot-toast";
import CheckoutForm from "../components/checkout/CheckoutForm";
import useCart from "../hooks/useCart";
import LoadingScreen from "../components/layouts/LoadingScreen";
import { useRouter } from "next/router";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutPage: NextPageWithLayout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const { user } = useAppSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios
      .post("/checkout/create-payment-intent", {})
      .then((res) => {
        console.log(res);
        setOrderId(res.data.orderId);
        setClientSecret(res.data.clientSecret);
        setTotalAmount(res.data.amount);
      })
      .catch((err) => router.replace("/"));
  }, [router]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (!clientSecret) return <LoadingScreen />;

  return (
    <div className="w-11/12 mx-auto max-w-5xl">
      <div className="flex justify-center md:justify-start items-center ">
        <h2 className="font-semibold text-gray-700 text-xl py-4 md:text-2xl md:mt-4">
          Complete your Order, {user?.firstName}
        </h2>
      </div>

      <section>
        <div className="p-6 shadow">
          <div>
            <h3>Order Summary</h3>
            <p>Order ID: {orderId}</p>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <span>Total</span>
              <span>₹{(totalAmount / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements> */}
    </div>
  );
};

CheckoutPage.getLayout = (page) => {
  return (
    <AuthGuard>
      <DefaultLayout>{page}</DefaultLayout>
    </AuthGuard>
  );
};

export default CheckoutPage;
