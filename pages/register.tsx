import { NextPage } from "next";
import Image from "next/future/image";
import Head from "next/head";
import { NextLink } from "../components/ui";

const ResgisterPage: NextPage = () => {
    return (
        <main className="min-h-screen bg-gray-100 py-16">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="w-full max-w-sm sm:max-w-md mx-auto">
                <div>
                    <Image
                        height={112}
                        width={112}
                        className="mx-auto w-auto"
                        src="/assets/Logo.png"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Register your account
                    </h2>
                </div>

                <div className="mt-8 w-full bg-white p-6 sm:py-8 sm:px-10 xs:rounded-xl shadow-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <section className="space-y-3">
                            <div>
                                <label htmlFor="first-name" className="text-sm font-medium text-gray-600">
                                    First Name
                                </label>
                                <input
                                    id="first-name"
                                    name="firstName"
                                    type="text"
                                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-0.5"
                                />
                            </div>

                            <div>
                                <label htmlFor="last-name" className="text-sm font-medium text-gray-600">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="last-name"
                                    name="lastName"
                                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-0.5"
                                />
                            </div>

                            <div>
                                <label htmlFor="email-address" className="text-sm font-medium text-gray-600">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="emailAdress"
                                    type="email"
                                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-0.5"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="text-sm font-medium text-gray-600">
                                    Password
                                </label>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-0.5"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="text-sm font-medium text-gray-600">
                                    Password
                                </label>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-0.5"
                                />
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
