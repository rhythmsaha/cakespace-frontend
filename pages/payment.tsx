import { useStripe } from "@stripe/react-stripe-js";
import { PaymentIntent } from "@stripe/stripe-js";
import Image from "next/image";
import { useEffect, useState } from "react";
import PaymentProcessing from "../components/checkout/PaymentProcessing";
import AuthGuard from "../components/guards/AuthGuard";
import Footer from "../components/layouts/footer";
import PaymentProvider from "../components/layouts/PaymentProvider";
import { NextPageWithLayout } from "./_app";

type paymentStatus = "succeeded" | "processing" | "requires_payment_method" | "failed" | undefined;

const PaymentPage: NextPageWithLayout = () => {
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>();
  const [paymentStatus, setPaymentStatus] = useState<paymentStatus>("processing");

  const stripe = useStripe();

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setPaymentIntent(paymentIntent);
      switch (paymentIntent?.status) {
        case "succeeded":
          setPaymentStatus("succeeded");
          break;
        case "processing":
          setPaymentStatus("processing");
          break;
        case "requires_payment_method":
          setPaymentStatus("requires_payment_method");
          break;
        default:
          setPaymentStatus("failed");
          break;
      }
    });
  }, [stripe]);

  return (
    <div className="page-height-min">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor optio tenetur tempora voluptas in, delectus laborum
      blanditiis recusandae harum voluptatem beatae velit accusantium. Ducimus quis quam ipsum illo excepturi sapiente.
      {/* <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true} /> */}
    </div>
  );
};
export default PaymentPage;

PaymentPage.getLayout = (page) => {
  return (
    <AuthGuard>
      <header className={`border-b bg-white z-10 sticky top-0`}>
        <div className="w-11/12 mx-auto h-20 flex items-center justify-center gap-6 relative">
          <Image src="/assets/text-logo.png" alt="logo" className="object-contain h-6 md:h-8" height={32} width={98} />
        </div>
      </header>

      <PaymentProvider>{page}</PaymentProvider>
      <Footer />
    </AuthGuard>
  );
};
