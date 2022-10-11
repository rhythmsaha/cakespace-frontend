import { Bars2Icon } from "@heroicons/react/20/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

import Image from "next/future/image";

import { Avatar, NextLink } from "../../ui";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <div className="w-11/12 mx-auto h-20 flex items-center justify-between gap-6 relative">
        <button className="p-2 lg2:hidden">
          <Bars2Icon className="h-6" />
        </button>

        <NextLink href="/">
          <Image src="/assets/text-logo.png" alt="logo" className="object-contain h-6 md:h-8" height={32} width={98} />
        </NextLink>

        <Navbar />
        <SearchBar />

        <div className="flex items-center gap-4">
          <button className="p-2 hidden lg2:block">
            <Avatar size="md" />
          </button>

          <button>
            <div className="flex flex-col items-center justify-center p-2">
              <ShoppingBagIcon className="h-6" />
              <p className="text-xs font-semibold text-gray-600">Bag</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
