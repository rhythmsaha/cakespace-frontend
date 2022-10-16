import AuthGuard from "../components/guards/AuthGuard";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { NextPageWithLayout } from "./_app";

const AccountPage: NextPageWithLayout = () => {
  return <div className="min-h-screen">AccountPage</div>;
};

AccountPage.getLayout = (page) => {
  return (
    <AuthGuard>
      <DefaultLayout>{page}</DefaultLayout>
    </AuthGuard>
  );
};

export default AccountPage;
