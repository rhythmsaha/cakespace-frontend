import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/future/image";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useLogout } from "../../../hooks/useLogout";

import { NextLink } from "../../ui";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: Props) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const { logoutHandler } = useLogout();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onToggle}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                      <header className="relative flex items-center justify-center py-6">
                        <NextLink href="/">
                          <Image
                            src="/assets/text-logo.png"
                            alt="logo"
                            className="object-contain h-6 md:h-8"
                            height={32}
                            width={98}
                          />
                        </NextLink>

                        <button
                          type="button"
                          className="absolute right-2 text-gray-400 hover:text-gray-500"
                          onClick={onToggle}
                        >
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </header>
                      <hr />

                      <div className="w-full py-4 px-2">
                        <form>
                          <input
                            type="search"
                            className="rounded-md w-full bg-gray-100 focus:bg-gray-50 px-5 border-gray-100 focus:border-gray-100 focus:ring-0 text-sm transition placeholder:text-gray-500"
                            placeholder="Search for Cakes, Pastries and more"
                          />
                        </form>
                      </div>

                      <div className="space-y-4">
                        <nav className="flex flex-col px-3">
                          <NextLink className="py-2 px-1 text-gray-700 font-medium border-b" href="/">
                            Home
                          </NextLink>

                          <NextLink
                            className="py-2 px-1 text-gray-700 font-medium border-b"
                            href="/celebration-cakes/birthday-cake"
                          >
                            Birthday Cakes
                          </NextLink>

                          <NextLink
                            className="py-2 px-1 text-gray-700 font-medium border-b"
                            href="/celebration-cakes/anniversary-cake"
                          >
                            Anniversary Cakes
                          </NextLink>

                          <NextLink
                            className="py-2 px-1 text-gray-700 font-medium border-b"
                            href="/celebration-cakes/wedding-cake"
                          >
                            Wedding Cakes
                          </NextLink>

                          <NextLink className="py-2 px-1 text-gray-700 font-medium border-b" href="/pastries">
                            Pastries
                          </NextLink>

                          <NextLink className="py-2 px-1 text-gray-700 font-medium border-b" href="/cup-cakes">
                            Cup Cakes
                          </NextLink>

                          <NextLink className="py-2 px-1 text-gray-700 font-medium border-b" href="/jar-cakes">
                            Jar Cakes
                          </NextLink>
                        </nav>
                        {isAuthenticated && (
                          <nav className="flex flex-col px-3">
                            <NextLink
                              className="py-2 px-1 text-gray-700 font-medium border-b"
                              href="/celebration-cakes/birthday-cake"
                            >
                              My Orders
                            </NextLink>

                            <NextLink
                              className="py-2 px-1 text-gray-700 font-medium border-b"
                              href="/celebration-cakes/birthday-cake"
                            >
                              My Account
                            </NextLink>

                            <button
                              onClick={logoutHandler}
                              className="py-2 px-1 text-gray-700 font-medium border-b text-left"
                            >
                              Logout
                            </button>
                          </nav>
                        )}

                        {!isAuthenticated && (
                          <nav className="flex flex-col px-3">
                            <NextLink className="py-2 px-1 text-gray-700 font-medium border-b" href="/login">
                              Login
                            </NextLink>

                            <NextLink className="py-2 px-1 text-gray-700 font-medium border-b" href="/register">
                              Sign up
                            </NextLink>
                          </nav>
                        )}
                      </div>
                    </div>

                    {isAuthenticated && user && (
                      <div className="py-2 px-5">
                        <div className="flex items-center gap-2 py-4">
                          <span>
                            <UserCircleIcon className="h-6 text-gray-500" />
                          </span>
                          <p className="font-medium text-lg leading-none text-gray-600">{`${user.firstName} ${user.lastName}`}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Sidebar;
