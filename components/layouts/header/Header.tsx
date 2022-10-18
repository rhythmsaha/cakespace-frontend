import { Bars2Icon } from "@heroicons/react/20/solid";
import Image from "next/future/image";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import { NextLink } from "../../ui";
import Sidebar from "../sidebar";
import Cart from "./Cart";
import Navbar from "./Navbar";
import ProfileMenu from "./ProfileMenu";
import SearchBar from "./SearchBar";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeComplete", () => {
      setShowSidebar(false);
    });
  }, []);

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
          <div className="hidden lg2:block">
            <ProfileMenu />
          </div>

          <Cart />
        </div>
      </div>
    </header>
  );
};
export default Header;
