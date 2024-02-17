import React, { } from "react";
import Carousel from "./components/Carousel";
import { BiCaretDown } from "react-icons/bi";
import Card from "./components/Card";
import Free from "./components/Free";
import Pechay from "./images/Pechay.png";
import Sili from "./images/Sili(Labuyo).png";
import Talong from "./images/Talong.png";
import Calamansi from "./images/Calamansi.png";
import Carrots from "./images/Carrots.png";
import Banana from "./images/Banana.png";
import Apple from "./images/Apple.png";
import Orange from "./images/Orange.png";
import Guyabano from "./images/Guyabano.png";
import Dalandan from "./images/Dalandan.png";
import Product from "./components/Product";
import BarangayDropdown from "./components/BarangayDropdown";
import Logo from "@/app/components/Logo/logo";

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

      <Product />
    </div>
  );
}
