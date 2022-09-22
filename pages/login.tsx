import type { NextPage } from "next";
import Head from "next/head";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { NextLink } from "../components/ui";
import Image from "next/future/image";

const LoginPage: NextPage = () => {
    return (
        <main className="min-h-screen bg-gray-100 py-20">
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
                        Sign in to{" "}
                        <span className="bg-gradient-to-br from-pink-600 to-indigo-500 bg-clip-text text-transparent">
                            Cakespace
                        </span>
                    </h2>
                </div>

                <div className="mt-8 w-full bg-white p-6 sm:py-8 sm:px-10 xs:rounded-xl shadow-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email-address" className="text-sm font-medium text-gray-600">
                                    Email address
                                </label>

                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
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
                        </div>

                        <div className="flex items-center justify-between w-full gap-4">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <NextLink
                                    href="/forgetpassword"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot your password?
                                </NextLink>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon
                                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                        aria-hidden="true"
                                    />
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div className="text-left xs:text-center mt-4 text-sm text-gray-900">
                        Don&apos;t have an account?{" "}
                        <NextLink href="/register" className="text-indigo-600 font-semibold">
                            Create One
                        </NextLink>
                    </div>
                </div>
            </section>
        </main>
    );
};
export default LoginPage;
