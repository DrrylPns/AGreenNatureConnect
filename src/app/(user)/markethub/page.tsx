import React, { } from "react";
import Carousel from "./components/Carousel";
import BarangayDropdown from "./components/BarangayDropdown";
import Logo from "@/app/components/Logo/logo";
import ProductItem from "./components/Product";

export default function Markethub() {
  return (
    <div >
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
