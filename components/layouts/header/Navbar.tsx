import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { NextLink } from "../../ui";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  return (
    <nav className="ml-10 mr-auto h-full relative">
      <Popover.Group className="flex gap-6 text-gray-600 items-center h-full">
        <NextLink href="">Birthday</NextLink>
        <NextLink href="">Anniversary</NextLink>
        <NextLink href="">Wedding</NextLink>
        <NextLink href="">Pastries</NextLink>

        <Popover className="h-full w-full">
          {({ open }) => (
            <>
              <div className="flex h-full">
                <Popover.Button
                  className={classNames(
                    open ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-700 hover:text-gray-800",
                    "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out "
                  )}
                >
                  Others
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Panel className="absolute inset-x-0 top-full">
                    <div className="bg-white border p-10 flex justify-start gap-6">
                      <div>
                        <h4 className="font-semibold">Celebration Cakes</h4>

                        <div className="container mx-auto"></div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </div>
            </>
          )}
        </Popover>
      </Popover.Group>
    </nav>
  );
};
export default Navbar;
