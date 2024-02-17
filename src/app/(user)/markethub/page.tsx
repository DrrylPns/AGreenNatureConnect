import React, { } from "react";
import Carousel from "./components/Carousel";
import BarangayDropdown from "./components/BarangayDropdown";
import Logo from "@/app/components/Logo/logo";
import ProductItem from "./components/Product";

export default function Markethub() {
  return (
    <div className="pt-[8rem] md:pt-[6rem] sm:px-[3%] md:pl-[25%] z-0 bg-white dark:bg-[#121212] px-3">
      <div className="hidden md:block">
        <Carousel />
      </div>

      <div className="w-full items-center gap-3 justify-center flex md:text-[2rem] font-dancing-script font-semibold mb-5 ">
        <h1>Welcome to</h1>
        <span className="inline">
          <Logo />
        </span>
        <h1>Market!</h1>
      </div>
      <div>
        <BarangayDropdown />
      </div>

      <ProductItem />
    </div>
  );
}
