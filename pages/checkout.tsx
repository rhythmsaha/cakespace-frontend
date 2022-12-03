import { useState, useEffect } from "react";
import AuthGuard from "../components/guards/AuthGuard";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { useAppSelector } from "../hooks";
import { NextPageWithLayout } from "./_app";
import { loadStripe } from "@stripe/stripe-js";
import { AddressElement, ElementProps, Elements } from "@stripe/react-stripe-js";
import { axios } from "../utils";
import toast from "react-hot-toast";
import CheckoutForm from "../components/checkout/CheckoutForm";
import useCart from "../hooks/useCart";
import LoadingScreen from "../components/layouts/LoadingScreen";
import { useRouter } from "next/router";
import Footer from "../components/layouts/footer";
import Image from "next/future/image";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutPage: NextPageWithLayout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const _clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (_clientSecret) {
      setClientSecret(_clientSecret);
      return;
    }

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
    theme: "flat" as "flat" | "stripe" | "night" | "none" | undefined,
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (!clientSecret) return <LoadingScreen />;

  return (
    <div className="w-10/12 mx-auto max-w-5xl page-height-min pb-20">
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm orderId={orderId} />
      </Elements>
    </div>
  );
};

CheckoutPage.getLayout = (page) => {
  return (
    <AuthGuard>
      <header className={`border-b bg-white z-10 sticky top-0`}>
        <div className="w-11/12 mx-auto h-20 flex items-center justify-center gap-6 relative">
          <Image src="/assets/text-logo.png" alt="logo" className="object-contain h-6 md:h-8" height={32} width={98} />
        </div>
      </header>
      {page}
      <Footer />
    </AuthGuard>
  );
};

export default CheckoutPage;
