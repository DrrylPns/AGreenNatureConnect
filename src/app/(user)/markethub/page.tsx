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
      <div>
        <BarangayDropdown />
      </div>
      <ProductItem />
    </div>
  );
}
