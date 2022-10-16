import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Avatar } from "../../ui";
import { useAppSelector, useLogout } from "../../../hooks";
import { useRouter } from "next/router";

interface Props {}

const ProfileMenu = (props: Props) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const { logoutHandler } = useLogout();
  const router = useRouter();

  return (
    <div>
      <Menu as="div" className="relative">
        <Menu.Button>
          <Avatar size="md" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-4 w-72 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg border border-gray-100 px-4 py-2 focus:outline-none">
            {!isAuthenticated && (
              <div className="py-2">
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">Welcome</h3>
                  <p className="text-sm text-gray-500">To access account and manage orders</p>

                  <div className="mt-2 flex items-center gap-1">
                    <Menu.Item>
                      <button
                        onClick={() => router.push("/login")}
                        className="text-indigo-600 text-sm font-medium border hover:border-indigo-600 transition duration-200 px-4 py-1 rounded-md"
                      >
                        Login
                      </button>
                    </Menu.Item>

                    <Menu.Item>
                      <button
                        onClick={() => router.push("/register")}
                        className="text-indigo-600 text-sm font-medium border hover:border-indigo-600 transition duration-200 px-4 py-1 rounded-md"
                      >
                        Sign Up
                      </button>
                    </Menu.Item>
                  </div>
                </div>
              </div>
            )}

            {isAuthenticated && user && (
              <div className="py-3">
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">Hello {user.firstName}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            )}

            {isAuthenticated && user && (
              <div className="py-3 flex flex-col">
                <Menu.Item>
                  <button
                    className="text-gray-700 hover:text-gray-900 w-full text-left text-sm hover:font-medium py-0.5"
                    onClick={() => router.push("/orders")}
                  >
                    Orders
                  </button>
                </Menu.Item>

                <Menu.Item>
                  <button
                    className="text-gray-700 hover:text-gray-900 w-full text-left text-sm hover:font-medium py-0.5"
                    onClick={() => router.push("/account")}
                  >
                    My Account
                  </button>
                </Menu.Item>

                <Menu.Item>
                  <button
                    className="text-gray-700 hover:text-gray-900 w-full text-left text-sm hover:font-medium py-0.5"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </Menu.Item>
              </div>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
