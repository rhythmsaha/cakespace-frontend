import { Bars2Icon } from "@heroicons/react/20/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

import Image from "next/future/image";
import { useEffect, useState } from "react";

import { Avatar, NextLink } from "../../ui";
import Sidebar from "../sidebar";

import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((status) => !status);
  };

  return (
    <header className={`border-b bg-white z-10 sticky top-0`}>
      <div className="w-11/12 mx-auto h-20 flex items-center justify-between gap-6 relative">
        <button className="p-2 lg2:hidden" onClick={toggleSidebar}>
          <Bars2Icon className="h-6" />
        </button>

        <Sidebar onToggle={toggleSidebar} isOpen={showSidebar} />

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
