
import React, { useEffect, useState } from "react";
import { MdOutlineTopic } from "react-icons/md";
import prisma from "@/lib/db/db";
import { Topic } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FeaturedTopicsSkeleton from "./Skeleton/FeaturedTopic";
import Image from "next/image";

export default async function LatestProducts() {
  const latestProducts = await prisma.product.findMany({
    take: 5,
    where:{
        status: 'APPROVED',
        isFree: false,
    },
    orderBy:{
        updatedAt: 'desc'
    }
  })
  return (
    <section className="hidden fixed top-[22rem] left-[77%] h-full w-[21%] lg:block ">
      <div className="dark:bg-[#242526] rounded-xl p-3 shadow-md drop-shadow-sm h-72 min-h-fit border border-gray-100">
        <h3 className="font-poppins font-semibold mb-3  leading-10 pb-1 border-b border-gray-200">
          Latest Products on Markethub
        </h3>
        {/**Post from the community, display maximum of 2*/}
        {latestProducts.length < 1 && (
          <div className="w-full flex text-center">
            No products 
          </div>
        )}
        {latestProducts.map((product) => (
            <Link href={`markethub`} key={product.id} className="mb-2">
                <div className="flex items-center gap-5 ">
                    <div className="h-10 w-10">
                        <Image src={product.productImage} alt="product Image" height={100} width={100} className="object-contain w-full h-full" />
                    </div>
                    <div className="w-full">
                        <h3 className="text-base font-normal">{product.name}</h3>
                    </div>
                </div>
            </Link>
        ))}
      </div>
    </section>
  );
}
