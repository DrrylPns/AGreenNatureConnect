import React, { } from "react";
import Carousel from "./components/Carousel";
import BarangayDropdown from "./components/BarangayDropdown";
import Logo from "@/app/components/Logo/logo";
import ProductItem from "./components/Product";
import SearchBar from "./components/SearchBar";
import prisma from "@/lib/db/db";

export default function Markethub() {
  
  return (
    <div >
      <div className="hidden md:block">
        <Carousel />
      </div>
      <div className="my-5 md:flex justify-between items-center">
        <BarangayDropdown />
        <SearchBar/>
      </div>
      <ProductItem />
    </div>
  );
}
