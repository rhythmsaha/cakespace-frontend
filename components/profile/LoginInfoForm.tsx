import SectionHeading from "./SectionHeading";
import UpdateEmailComponent from "./UpdateEmailComponent";
import UpdatePasswordComponent from "./UpdatePasswordComponent";

const LoginInfoForm = () => {
  return (
    <section className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <SectionHeading
          heading="Login Information"
          paragraph="Specify or update your email and password for login process."
        />
      </div>

      <div className="mt-5 md:col-span-2 md:mt-0">
        <div className="overflow-hidden shadow-md rounded-lg">
          <div className="bg-white px-4 py-5 sm:p-6 sm:py-8 space-y-6">
            <UpdateEmailComponent />
            <UpdatePasswordComponent />
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginInfoForm;
