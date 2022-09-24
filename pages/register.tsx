import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { NextLink } from "../components/ui";
import Image from "next/future/image";
import { toast } from "react-hot-toast";
import { RegistrationFields } from "../types/userTypes";
import { axios } from "../utils";
import { FieldError } from "../types/ErrorTypes";

interface FieldErrorPath extends FieldError {
  path: "firstName" | "lastName" | "email" | "password" | "confirmPassword";
}

const ResgisterPage: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFields>();

  const submitHandler = async ({ firstName, lastName, email, password, confirmPassword }: RegistrationFields) => {
    if (isSubmitting) return;
    toast.dismiss();

    try {
      const response = await axios.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      const { message } = await response.data;
      toast.success(message);
    } catch (error: any) {
      if (error?.fields && error.fields.length > 0) {
        error.fields.forEach((field: FieldErrorPath) => {
          setError(field.path, { type: field.type, message: field.message });
        });
      } else {
        toast.error(error?.message || error || "Something went wrong!");
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-16">
      <Head>
        <title>Register your account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="w-full max-w-sm sm:max-w-md mx-auto">
        <div>
          <Image height={112} width={112} className="mx-auto w-auto" src="/assets/Logo.png" alt="Your Company" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register your account</h2>
        </div>

        <div className="mt-8 w-full bg-white p-6 sm:py-8 sm:px-10 xs:rounded-xl shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
            <section className="space-y-3">
              <div>
                <label htmlFor="first-name" className="text-sm font-medium text-gray-600">
                  First Name
                </label>
                <input
                  id="first-name"
                  type={"text"}
                  className={`relative block w-full appearance-none rounded-md border  px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 sm:text-sm mt-0.5 ${
                    errors.firstName
                      ? "focus:border-red-500 focus:outline-none focus:ring-red-600 border-red-500"
                      : "focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 border-gray-300"
                  }`}
                  {...register("firstName", {
                    required: "First Name is required!",
                  })}
                />
                {errors.firstName && <span className="px-1 text-xs text-red-600">{errors.firstName.message}</span>}
              </div>

              <div>
                <label htmlFor="last-name" className="text-sm font-medium text-gray-600">
                  Last Name
                </label>
                <input
                  type={"text"}
                  id="last-name"
                  className={`relative block w-full appearance-none rounded-md border  px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 sm:text-sm mt-0.5 ${
                    errors.lastName
                      ? "focus:border-red-500 focus:outline-none focus:ring-red-600 border-red-500"
                      : "focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 border-gray-300"
                  }`}
                  {...register("lastName", {
                    required: "Last Name is required!",
                  })}
                />
                {errors.lastName && <span className="px-1 text-xs text-red-600">{errors.lastName.message}</span>}
              </div>

              <div>
                <label htmlFor="email-address" className="text-sm font-medium text-gray-600">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="email"
                  className={`relative block w-full appearance-none rounded-md border  px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 sm:text-sm mt-0.5 ${
                    errors.email
                      ? "focus:border-red-500 focus:outline-none focus:ring-red-600 border-red-500"
                      : "focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 border-gray-300"
                  }`}
                  {...register("email", {
                    required: "Email address is required!",
                  })}
                />
                {errors.email && <span className="px-1 text-xs text-red-600">{errors.email.message}</span>}
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-600">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className={`relative block w-full appearance-none rounded-md border  px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 sm:text-sm mt-0.5 ${
                    errors.password
                      ? "focus:border-red-500 focus:outline-none focus:ring-red-600 border-red-500"
                      : "focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 border-gray-300"
                  }`}
                  {...register("password", {
                    required: "Password is required!",
                  })}
                />
                {errors.password && <span className="px-1 text-xs text-red-600">{errors.password.message}</span>}
              </div>

              <div>
                <label htmlFor="confirmPasword" className="text-sm font-medium text-gray-600">
                  Confirm Password
                </label>

                <input
                  id="confirmPasword"
                  type="password"
                  autoComplete="confirm-password"
                  className={`relative block w-full appearance-none rounded-md border  px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 sm:text-sm mt-0.5 ${
                    errors.confirmPassword
                      ? "focus:border-red-500 focus:outline-none focus:ring-red-600 border-red-500"
                      : "focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 border-gray-300"
                  }`}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required!",
                  })}
                />
                {errors.confirmPassword && (
                  <span className="px-1 text-xs text-red-600">{errors.confirmPassword.message}</span>
                )}
              </div>
            </section>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Sign Up
              </button>
            </div>
          </form>

          <div className="text-left xs:text-center mt-4 text-sm text-gray-900">
            Already have an account?{" "}
            <NextLink href="/login" className="text-indigo-600 font-semibold">
              Login
            </NextLink>
          </div>
        </div>
      </section>
    </main>
  );
};
export default ResgisterPage;
