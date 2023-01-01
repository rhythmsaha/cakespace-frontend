import AuthGuard from "../components/guards/AuthGuard";
import DefaultLayout from "../components/layouts/DefaultLayout";
import LoginInfoForm from "../components/profile/LoginInfoForm";
import NotificationMenu from "../components/profile/NotificationMenu";
import PersonalInformationForm from "../components/profile/PersonalInformationForm";
import { NextPageWithLayout } from "./_app";

const AccountPage: NextPageWithLayout = () => {
  return (
    <div className="w-11/12 mx-auto md:py-10 lg:py-20">
      <PersonalInformationForm />
      <hr />
      <LoginInfoForm />
      <hr />
      <NotificationMenu />
    </div>
  );
};

AccountPage.getLayout = (page) => {
  return (
    <AuthGuard>
      <DefaultLayout>{page}</DefaultLayout>
    </AuthGuard>
  );
};

export default AccountPage;
