"use client";
import { Button } from "@/app/components/Ui/Button";
import prisma from "@/lib/db/db";
import { ShippingInfo } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";
import Loading from "../loading";

const schema = z.object({
  name: z.string().min(1),
  address: z.string(),
  email: z.string().email(),
  contactNumber: z.string().min(11),
  facebook: z.string(),
});
type FormFields = z.infer<typeof schema>;

function shippingInfo() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>();

  if (shippingInfo) {
  }
  let defaultValues = {
    name: shippingInfo?.name,
    address: shippingInfo?.address,
    email: shippingInfo?.email,
    contactNumber: shippingInfo?.phoneNumber,
    facebook: shippingInfo?.facebook,
  };
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    getShippingInfo();
  }, []);

  useEffect(() => {
    if (shippingInfo) {
      setValue("name", shippingInfo.name);
      setValue("address", shippingInfo.address);
      setValue("email", shippingInfo.email);
      setValue("contactNumber", shippingInfo.phoneNumber);
      setValue("facebook", shippingInfo.facebook);
    }
  }, [shippingInfo]);

  const getShippingInfo = async () => {
    try {
      const shippingInfo = await (
        await axios.get(`/api/markethub/shippingInfo`)
      ).data;
      setShippingInfo(shippingInfo);
      setIsFetching(false);
    } catch (error) {
      return console.log(error);
    }
  };
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await fetch(`/api/markethub/shippingInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        // Optionally, you can handle the response data here
        const responseData = await response.json();

        // Replace the route after successful submission
        router.back();
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute top-4 left-4 text-gray-600"
      >
        <ArrowLeft className="text-lg" />
      </button>
      <div className="space-y-2 mt-10">
        <CardTitle>Shipping information</CardTitle>
        <CardDescription>Enter your shipping details</CardDescription>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-lg"
      >
        <label htmlFor="name" className="text-sm font-semibold mb-1">
          Full Name
        </label>
        <input
          {...register("name", { required: true })}
          id="name"
          className="input-field border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}
        <label htmlFor="address" className="text-sm font-semibold mt-4 mb-1">
          Complete Address
        </label>
        <input
          {...register("address", { required: true })}
          id="address"
          className="input-field border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.address && (
          <div className="text-red-500">Address is required!</div>
        )}
        <label htmlFor="email" className="text-sm font-semibold mt-4 mb-1">
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          className="input-field border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <label
          htmlFor="contactNumber"
          className="text-sm font-semibold mt-4 mb-1"
        >
          Contact Number
        </label>
        <input
          {...register("contactNumber", { required: true })}
          id="contactNumber"
          className="input-field border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.contactNumber && (
          <div className="text-red-500">{errors.contactNumber.message}</div>
        )}
        <label htmlFor="facebook" className="text-sm font-semibold mt-4 mb-1">
          Facebook
        </label>
        <input
          {...register("facebook", { required: true })}
          id="facebook"
          className="input-field border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.facebook && (
          <div className="text-red-500">{errors.facebook.message}</div>
        )}
        {isSubmitting ? (
          <button disabled className="btn-disabled mt-8 cursor-not-allowed">
            <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </button>
        ) : (
          <button
            type="submit"
            className="btn mt-8 p-3 rounded-md bg-green text-white"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}

export default shippingInfo;
