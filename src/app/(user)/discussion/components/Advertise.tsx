
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/Ui/Dialog";
import { Separator } from "@/app/components/Ui/Separator";
import { Button } from "@/app/components/Ui/Button";

export default async function Advertise() {
 
  return (
    <section className="hidden fixed top-[22rem] left-[77%] h-full w-[21%] lg:block ">
      <div className="dark:bg-[#242526] rounded-xl p-3 shadow-md drop-shadow-sm border border-gray-100">
        <h3 className="font-poppins font-medium  leading-10 border-b border-gray-200">
          Would you like to be a part of our thriving urban farming community?
          <Dialog>
          <DialogTrigger className="text-green">Click here</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle >Join Us</DialogTitle>
              <DialogDescription>
                <div className="mb-5">
                  Are you part of any registered urban farms in Barangay Bagbag, Novaliches Proper, or Bagong Silangan?
                  <Link href={'/pasabuy'} className=""><Button variant={'link'} className=" text-blue-600">Click here</Button> </Link>
                </div>
                <Separator className="my-5" />
                <div>
                  Do you want to be part of urban farm community and become a consignor?
                  <Link href={'/consignor'} className=""><Button variant={'link'} className=" text-blue-600">Click here</Button> </Link>
                </div>
                
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        </h3>
        
      </div>
    </section>
  );
}
