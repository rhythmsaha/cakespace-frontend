import { NextPage } from "next";
import Head from "next/head";
import Image from "next/future/image";

const ForgetPassword: NextPage = () => {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Head>
        <title>Cakespace - Forget Password</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="w-10/12 max-w-md sm:max-w-lg mx-auto">
        <div>
          <Image height={112} width={112} className="mx-auto w-auto" src="/assets/Logo.png" alt="Your Company" />
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">Reset your password</h2>
          <p className="mt-1 text-gray-400 text-xs text-center">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <div className="w-full mt-6">
          <form className="space-y-4" action="#" method="POST">
            <input
              id="email-address"
              name="email"
              type="email"
              placeholder="Email address"
              autoComplete="email"
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-0.5"
            />

            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Reset Password
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ForgetPassword;
