
import React, { } from "react";
import BarangayDropdown from "./components/BarangayDropdown";
import ProductItem from "./components/Product";
import { ShadcnCarousel } from "./components/sCarousel";
import Link from "next/link";
import SearchBar from "./components/SearchBar";
import prisma from "@/lib/db/db";

export default async function Markethub() {
  const allProrducts = await prisma.product.findMany({
    where:{
      isFree: {
          equals: false
      },
      status:{
          equals: "APPROVED"
      },
      variants:{
          some: {
              variant: {
                  not: 0
              }
          }
      }
  },
  include:{
     variants: true,
     community: true,
     reviews: true,
  }
  })
  return (
    <div >
      <Link href={'/markethub/free-products'} className="hidden md:block">
        <ShadcnCarousel/>
      </Link>
      <div>
      <h1 className="text-sm md:text-xl font-bold mt-3">Communities:</h1>
      <BarangayDropdown />
      </div>
      <div className="my-5 flex flex-col-reverse md:flex-row md:flex justify-between items-center w-full">
        <h1 className="text-xl font-bold text-center mt-5 md:mt-0 md:text-left self-end">Community Products</h1>
        <SearchBar allProduct={allProrducts}/>
      </div>
        <ProductItem />
    </div>
  );
}
