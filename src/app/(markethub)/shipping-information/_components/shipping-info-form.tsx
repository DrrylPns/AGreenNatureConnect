"use client"
import { Button } from "@/app/components/Ui/Button";
import prisma from "@/lib/db/db";
import { UserWithCommunity } from "@/lib/types";
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/app/components/Ui/label";
import { Input } from "@/app/components/Ui/Input";
import { ShippingInfo } from "@prisma/client";

export const schema = z.object({
    name: z.string().min(1),
    address: z.string(),
    email: z.string().email(),
    contactNumber: z.string().min(11),
    facebook: z.string(),
    blk: z.string({
        required_error: "Blk / House # is required"
    }),
    street: z.string({
        required_error: "Street address is required"
    }),
    zip: z.string().min(4, { message: "Invalid zip code." }).max(4, { message: "Invalid zip code." }),
});

type FormFields = z.infer<typeof schema>;

interface Props {
    user: UserWithCommunity;
}

export const ShippingInfoForm = ({ user }: Props) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>();

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
            setValue("zip", shippingInfo.zip as string);
            setValue("blk", shippingInfo.blk as string);
            setValue("street", shippingInfo.street as string);
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

    const handleSelectChange = (selectedValue: string) => {
        setValue('address', selectedValue);
    };

    return (
        <>
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
                {/* <label htmlFor="address" className="text-sm font-semibold mt-4 mb-1">
                    Complete Address
                </label> */}

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

                <div className="space-y-2 mt-2">
                    <h1 className="ml-1 text-sm font-medium">Area</h1>
                    <Select
                        // value={area}
                        onValueChange={handleSelectChange}
                        {...register("address")}
                    >
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select an area" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Area</SelectLabel>
                                <>
                                    {user?.Community?.address === "Bagbag" && (
                                        <>
                                            <SelectItem value="Pagkabuhay Road">Pagkabuhay Road</SelectItem>
                                            <SelectItem value="Sinforosa">Sinforosa</SelectItem>
                                            <SelectItem value="Urbano">Urbano</SelectItem>
                                            <SelectItem value="Sementeryo">Sementeryo</SelectItem>
                                            <SelectItem value="Alipio">Alipio</SelectItem>
                                            <SelectItem value="Goodwill 2">Goodwill 2</SelectItem>
                                            <SelectItem value="Goodwill Town Homes">Goodwill Town Homes</SelectItem>
                                            <SelectItem value="Biglang-awa">Biglang-awa</SelectItem>
                                            <SelectItem value="625">625</SelectItem>
                                            <SelectItem value="Wings Sampalokan">Wings Sampalokan</SelectItem>
                                            <SelectItem value="Blas Roque">Blas Roque</SelectItem>
                                            <SelectItem value="Celina Drive">Celina Drive</SelectItem>
                                            <SelectItem value="Tolentino">Tolentino</SelectItem>
                                            <SelectItem value="615">615</SelectItem>
                                            <SelectItem value="Callejon">Callejon</SelectItem>
                                            <SelectItem value="Quirino Highway">Quirino Highway</SelectItem>
                                            <SelectItem value="Ngi Yaw (604)">Ngi Yaw (604)</SelectItem>
                                            <SelectItem value="Carreon">Carreon</SelectItem>
                                            <SelectItem value="Goldhill">Goldhill</SelectItem>
                                            <SelectItem value="Sinagtala">Sinagtala</SelectItem>
                                            <SelectItem value="Kingspoint Subdivision">Kingspoint Subdivision</SelectItem>
                                            <SelectItem value="Alipio Compound">Alipio Compound</SelectItem>
                                            <SelectItem value="Oro Compound">Oro Compound</SelectItem>
                                            <SelectItem value="Uping">Uping</SelectItem>
                                            <SelectItem value="Pinera">Pinera</SelectItem>
                                            <SelectItem value="San Pedro 9">San Pedro 9</SelectItem>
                                            <SelectItem value="Maloles Compound">Maloles Compound</SelectItem>
                                            <SelectItem value="Babina Compound">Babina Compound</SelectItem>
                                            <SelectItem value="Unang Tangke">Unang Tangke</SelectItem>
                                            <SelectItem value="Daniac">Daniac</SelectItem>
                                            <SelectItem value="Kasiyahan">Kasiyahan</SelectItem>
                                            <SelectItem value="Enclave">Enclave</SelectItem>
                                            <SelectItem value="Grand Villas">Grand Villas</SelectItem>
                                            <SelectItem value="Dupax">Dupax</SelectItem>
                                            <SelectItem value="Wings">Wings</SelectItem>
                                            <SelectItem value="Santos Compound">Santos Compound</SelectItem>
                                            <SelectItem value="Camp Grezar">Camp Grezar</SelectItem>
                                            <SelectItem value="Franco">Franco</SelectItem>
                                            <SelectItem value="Katipunan Kaliwa">Katipunan Kaliwa</SelectItem>
                                            <SelectItem value="Coronel Compound">Coronel Compound</SelectItem>
                                            <SelectItem value="Mantikaan">Mantikaan</SelectItem>
                                            <SelectItem value="Likas">Likas</SelectItem>
                                            <SelectItem value="Don Julio Gregorio">Don Julio Gregorio</SelectItem>
                                            <SelectItem value="Richland V">Richland V</SelectItem>
                                            <SelectItem value="Marides">Marides</SelectItem>
                                            <SelectItem value="Abbey Road">Abbey Road</SelectItem>
                                            <SelectItem value="Manggahan">Manggahan</SelectItem>
                                            <SelectItem value="RD 1-4">RD 1-4</SelectItem>
                                            <SelectItem value="R7">R7</SelectItem>
                                            <SelectItem value="Narra">Narra</SelectItem>
                                            <SelectItem value="Progressive Phase 1">Progressive Phase 1</SelectItem>
                                            <SelectItem value="Progressive Phase 2">Progressive Phase 2</SelectItem>
                                            <SelectItem value="Progressive Phase 3">Progressive Phase 3</SelectItem>
                                            <SelectItem value="De Asis Compound">De Asis Compound</SelectItem>
                                            <SelectItem value="Ibayo II (Taas, Baba)">Ibayo II (Taas, Baba)</SelectItem>
                                            <SelectItem value="Maligay">Maligay</SelectItem>
                                            <SelectItem value="Ibayo I (Leon Cleofas St.)">Ibayo I (Leon Cleofas St.)</SelectItem>
                                            <SelectItem value="Karaan">Karaan</SelectItem>
                                            <SelectItem value="St. Michael">St. Michael</SelectItem>
                                            <SelectItem value="Urcia">Urcia</SelectItem>
                                            <SelectItem value="Magno">Magno</SelectItem>
                                            <SelectItem value="Bernarty">Bernarty</SelectItem>
                                            <SelectItem value="Seminaryo">Seminaryo</SelectItem>
                                            <SelectItem value="Remarville Ave.">Remarville Avenue</SelectItem>
                                            <SelectItem value="Zodiac">Zodiac</SelectItem>
                                            <SelectItem value="Apollo">Apollo</SelectItem>
                                            <SelectItem value="Old Paliguan">Old Paliguan</SelectItem>
                                            <SelectItem value="Gawad Kalinga">Gawad Kalinga</SelectItem>
                                            <SelectItem value="Remarville Subdivision">Remarville Subdivision</SelectItem>
                                            <SelectItem value="Mangilog Compound">Mangilog Compound</SelectItem>
                                            <SelectItem value="Princess Homes">Princess Homes</SelectItem>
                                        </>
                                    )}

                                    {user?.Community?.address === "Nova Proper" && (
                                        <>
                                            <SelectItem value="Doña Rosario">Doña Rosario</SelectItem>
                                            <SelectItem value="Doña Isaura">Doña Isaura</SelectItem>
                                            <SelectItem value="Prinsipe Tupas">Prinsipe Tupas</SelectItem>
                                            <SelectItem value="F. Balagtas">F. Balagtas</SelectItem>
                                            <SelectItem value="M Agoncillo">M Agoncillo</SelectItem>
                                            <SelectItem value="Buenamar">Buenamar</SelectItem>
                                            <SelectItem value="Ramirez">Ramirez</SelectItem>
                                            <SelectItem value="Susano">Susano</SelectItem>
                                            <SelectItem value="Austria">Austria</SelectItem>
                                            <SelectItem value="Gold">Gold</SelectItem>
                                            <SelectItem value="Diamond">Diamond</SelectItem>
                                            <SelectItem value="Emerald">Emerald</SelectItem>
                                        </>
                                    )}

                                    {user?.Community?.address === "Bagong Silangan" && (
                                        <>
                                            <SelectItem value="Area B">Area B</SelectItem>
                                            <SelectItem value="Area C">Area C</SelectItem>
                                            <SelectItem value="Sitio Kumunoy">Sitio Kumunoy</SelectItem>
                                            <SelectItem value="Sitio Bakal">Sitio Bakal</SelectItem>
                                            <SelectItem value="Sitio Pugot">Sitio Pugot</SelectItem>
                                            <SelectItem value="Sitio Veterans">Sitio Veterans</SelectItem>
                                            <SelectItem value="Sitio Rolling Hills">Sitio Rolling Hills</SelectItem>
                                            <SelectItem value="Filside">Filside</SelectItem>
                                            <SelectItem value="San Policarpio">San Policarpio</SelectItem>
                                            <SelectItem value="Comia">Comia</SelectItem>
                                            <SelectItem value="Jubilee Phase 1">Jubilee Phase 1</SelectItem>
                                            <SelectItem value="Jubilee Phase 2">Jubilee Phase 2</SelectItem>
                                            <SelectItem value="Jubilee Phase 3">Jubilee Phase 3</SelectItem>
                                            <SelectItem value="Jubilee Phase 4">Jubilee Phase 4</SelectItem>
                                            <SelectItem value="Jubilee Phase 5">Jubilee Phase 5</SelectItem>
                                            <SelectItem value="Jubilee Phase 6">Jubilee Phase 6</SelectItem>
                                            <SelectItem value="Jubilee Phase 7">Jubilee Phase 7</SelectItem>
                                            <SelectItem value="Jubilee Phase 8">Jubilee Phase 8</SelectItem>
                                            <SelectItem value="Isla Pulang Bato">Isla Pulang Bato</SelectItem>
                                            <SelectItem value="Mt. Carmel">Mt. Carmel</SelectItem>
                                            <SelectItem value="Mapayapa">Mapayapa</SelectItem>
                                            <SelectItem value="Brookside">Brookside</SelectItem>
                                            <SelectItem value="Hilltop">Hilltop</SelectItem>
                                            <SelectItem value="Calamiong">Calamiong</SelectItem>
                                            <SelectItem value="Pinagbuklod">Pinagbuklod</SelectItem>
                                            <SelectItem value="Tumana">Tumana</SelectItem>
                                            <SelectItem value="New Greenland">New Greenland</SelectItem>
                                        </>
                                    )}
                                </>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {errors.address && (
                    <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                        {errors.address.message}
                    </span>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-2">
                    <div>
                        <Label htmlFor="phone">House / Blk no.</Label>
                        <Input
                            {...register("blk")}
                            type="text"
                            className=""
                        />
                        {errors.blk && (
                            <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                                {errors.blk.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="phone">Zip Code</Label>
                        <Input
                            {...register("zip")}
                            type="text"
                            className=""
                        />
                    </div>
                    {errors.zip && (
                        <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                            {errors.zip.message}
                        </span>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Street Name</Label>
                    <Input
                        {...register("street")}
                        type="text"
                        className=""
                    />
                </div>
                {errors.street && (
                    <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                        {errors.street.message}
                    </span>
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
        </>
    )
}
