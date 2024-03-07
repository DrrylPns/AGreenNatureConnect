import React, { } from "react";
import Carousel from "./components/Carousel";
import BarangayDropdown from "./components/BarangayDropdown";
import ProductItem from "./components/Product";
import SearchBar from "./components/SearchBar";

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
    
    </div>
  );
}
