import { useState } from "react";
import AuthGuard from "../components/guards/AuthGuard";
import { useAppSelector } from "../hooks";
import { NextPageWithLayout } from "./_app";
import CheckoutForm from "../components/checkout/CheckoutForm";
import Footer from "../components/layouts/footer";
import Image from "next/future/image";
import PaymentProvider from "../components/layouts/PaymentProvider";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import ReactStickyBox from "react-sticky-box";

const CheckoutPage: NextPageWithLayout = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="w-10/12 mx-auto max-w-5xl page-height-min pb-20">
      <div className="flex justify-center md:justify-start items-center ">
        <h2 className="font-semibold text-gray-700 text-xl py-4 md:text-2xl md:mt-4">
          Complete your Order, {user?.firstName}
        </h2>
      </div>

      <section className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-14 mt-10 ">
        <section className="flex-1 ">
          <ReactStickyBox offsetTop={100}>
            <CheckoutSummary />
          </ReactStickyBox>
        </section>

        <section className="flex-1">
          <CheckoutForm />
        </section>
      </section>
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

      <PaymentProvider>{page}</PaymentProvider>
      <Footer />
    </AuthGuard>
  );
};

export default CheckoutPage;
