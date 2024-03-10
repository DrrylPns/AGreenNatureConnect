import React, { } from "react";
import Carousel from "./components/Carousel";
import BarangayDropdown from "./components/BarangayDropdown";
import Logo from "@/app/components/Logo/logo";
import ProductItem from "./components/Product";
import SearchBar from "./components/SearchBar";
import prisma from "@/lib/db/db";

export default async function Markethub() {
  const AllProducts = await prisma.product.findMany({
    where:{
      status:{
          equals: "APPROVED"
      },
    },
    include:{
      community: true,
      variants: true
    }
  })

  return (
    <div >
      <div className="hidden md:block">
        <Carousel />
      </div>
      <div>
      <h1 className="text-xl font-bold mt-3">Urban Farming Communities:</h1>
      <BarangayDropdown />
      </div>
      <div className="my-5 flex flex-col-reverse md:flex justify-between items-center w-full">
      <h1 className="text-xl font-bold text-center mt-5 md:mt-0 md:text-left">Urban Farming Communities Product</h1>
        <SearchBar allProduct={AllProducts}/>
      </div>
      <ProductItem />
    </div>
  );
}
