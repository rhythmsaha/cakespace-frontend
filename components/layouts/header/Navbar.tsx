import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { NextLink } from "../../ui";
import Image from "next/future/image";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  return (
    <nav className="ml-10 flex-1 h-full">
      <Popover.Group className="flex gap-6 text-gray-500 font-medium items-center h-full ">
        <NextLink href="/products?category=celebration-cakes&subCategory=birthday-cake">Birthday</NextLink>
        <NextLink href="/products?category=celebration-cakes&subCategory=anniversary-cake">Anniversary</NextLink>
        <NextLink href="/products?category=celebration-cakes&subCategory=wedding-cake">Wedding</NextLink>
        <NextLink href="/products?category=pastries">Pastries</NextLink>

        <Popover className="h-full w-full">
          {({ open }) => (
            <>
              <div className="flex h-full">
                <Popover.Button
                  className={classNames(
                    open
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 font-medium hover:text-gray-800",
                    "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm transition-colors duration-200 ease-out "
                  )}
                >
                  Others
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 -translate-x-2"
                  enterTo="opacity-100 translate-x-0"
                  leave="transition ease-in duration-200"
                  leaveFrom="opacity-100 translate-x-0"
                  leaveTo="opacity-0 translate-x-2"
                >
                  <Popover.Panel className="absolute inset-x-0 top-full mt-4">
                    <div className="bg-white shadow-lg rounded-xl p-12 grid grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold">Celebration Cakes</h4>

                        <div className="grid grid-cols-3 place-items-stretch gap-2 mt-2">
                          <NavbarImage
                            className="w-full h-full overflow-hidden aspect-square relative"
                            label="Birthday Cake"
                            src="https://res.cloudinary.com/desihzeid/image/upload/v1664292223/CakeSpace/bix9msvqcechph5hhvt5.webp"
                          />

                          <NavbarImage
                            className="w-full h-full col-span-2 row-span-2 relative overflow-hidden aspect-square"
                            label="Anniversary Cake"
                            src="https://res.cloudinary.com/desihzeid/image/upload/v1664292225/CakeSpace/s78onhielez2kmxzfhcv.avif"
                          />

                          <NavbarImage
                            className="w-full h-full overflow-hidden aspect-square relative"
                            label="Wedding Cake"
                            src="https://res.cloudinary.com/desihzeid/image/upload/v1664292229/CakeSpace/ga0fpqhktwuy9uglxbht.jpg"
                          />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold">Others</h4>

                        <div className="grid grid-cols-3 place-items-stretch gap-2 mt-2">
                          <NavbarImage
                            className="w-full h-full overflow-hidden aspect-square relative"
                            label="Pastries"
                            src="https://res.cloudinary.com/desihzeid/image/upload/v1663659501/CakeSpace/fcyufwpjfownq8etzj0n.png"
                          />

                          <NavbarImage
                            className="w-full h-full col-span-2 row-span-2 relative overflow-hidden aspect-square"
                            label="Cup Cakes"
                            src="https://res.cloudinary.com/desihzeid/image/upload/v1663659510/CakeSpace/qymkkq7sehdobzscxonz.jpg"
                          />

                          <NavbarImage
                            className="w-full h-full overflow-hidden aspect-square relative"
                            label="Jar Cakes"
                            src="https://res.cloudinary.com/desihzeid/image/upload/v1663659655/CakeSpace/whqpo18jckh48hnzppad.jpg"
                          />
                        </div>
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

interface ImageProps {
  src: string;
  label: string;
  className: string;
}

const NavbarImage = ({ src, label, className }: ImageProps) => {
  const [showLabel, setShowLabel] = useState(false);

  return (
    <div className={className} onMouseEnter={() => setShowLabel(true)} onMouseLeave={() => setShowLabel(false)}>
      <Image height={275} width={275} src={src} alt={label} className="object-cover w-full h-full rounded-md" />

      <Transition
        as={Fragment}
        enter="transition ease-out duration-600"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-600"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={showLabel}
      >
        <div className="inset-0 absolute bg-black bg-opacity-60 rounded-md flex items-center justify-center">
          <p className="text-white text-center font-semibold">{label}</p>
        </div>
      </Transition>
    </div>
  );
};
