import AuthGuard from "../components/guards/AuthGuard";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { NextPageWithLayout } from "./_app";

const OrdersPage: NextPageWithLayout = () => {
  return <div className="min-h-screen">OrdersPage</div>;
};

OrdersPage.getLayout = (page) => {
  return (
    <AuthGuard>
      <DefaultLayout>{page}</DefaultLayout>
    </AuthGuard>
  );
};

export default OrdersPage;
