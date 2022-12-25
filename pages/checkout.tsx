import AuthGuard from "../components/guards/AuthGuard";
import { useAppSelector } from "../hooks";
import { NextPageWithLayout } from "./_app";
import CheckoutForm from "../components/checkout/CheckoutForm";
import { useRouter } from "next/router";
import Footer from "../components/layouts/footer";
import Image from "next/future/image";
import PaymentProvider from "../components/layouts/PaymentProvider";

const CheckoutPage: NextPageWithLayout = () => {
  return (
    <div className="w-10/12 mx-auto max-w-5xl page-height-min pb-20">
      <CheckoutForm />
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
