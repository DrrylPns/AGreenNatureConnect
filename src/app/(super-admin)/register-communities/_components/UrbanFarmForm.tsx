"use client";

import { Button } from "@/app/components/Ui/Button";
import { Input } from "@/app/components/Ui/Input";
import { Separator } from "@/app/components/Ui/Separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/Ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/app/components/Ui/select";
import { Textarea } from "@/app/components/Ui/textarea";
import { toast } from "@/lib/hooks/use-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import {
    CreateCommunitySchema,
    CreateCommunityType,
} from "@/lib/validations/super-admin/createCommunity";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { Card } from "@tremor/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createUrbanFarm } from "../../../../../actions/community";
import { useMutation } from "@tanstack/react-query";

type StateType = {
    countryCode: string;
    isoCode: string;
    latitude: string;
    longitude: string;
    name: string;
}

type CityType = {
    stateCode: string;
    latitude: string;
    longitude: string;
    name: string;
    countryCode: string;
}

interface Props {
    user: User
}

export const UrbanFarmForm = ({ user }: Props) => {

    // let countryData = Country.getAllCountries();
    // const [stateData, setStateData] = useState();
    // const [cityData, setCityData] = useState();
    // const [country, setCountry] = useState(countryData[173]);
    // const [state, setState] = useState<StateType>();
    // const [city, setCity] = useState<CityType>();
    const [area, setArea] = useState("");
    // const [areaAddress, setAreaAddress] = useState("");
    const [formStep, setFormStep] = useState(1);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [formUrl, setFormUrl] = useState<string>("");
    const [isPending, startTransition] = useTransition()

    const form = useForm<CreateCommunityType>({
        resolver: zodResolver(CreateCommunitySchema),
    });

    const router = useRouter();



    const imageIsEmpty = imageUrl.length === 0;
    const formUrlIsEmpty = formUrl.length === 0;
    const areaIsEmpty = area.length === 0;
    // const areaAddressIsEmpty = areaAddress.length === 0;

    // const { data: createUrbanFarmCommunity, isLoading } = useMutation({
    //     mutationFn: () => createUrbanFarm,
    //     onSuccess: (data) => {
    //         toast({
    //             description: data.
    //         })
    //     }
    // })

    // const { mutate: createEmployee, isLoading } = useMutation({
    //   mutationFn: async ({
    //     firstname,
    //     lastName,
    //     phone,
    //     gender,
    //     communityEmail,
    //     password,
    //     email,
    //     confirmPassword,
    //     urbanFarmName,
    //     communityAddress,
    //     communityDescription,
    //     // barangayName,
    //     communityDisplayPhoto,
    //     userPhone,
    //   }: // communityImages,
    //     CreateCommunityType) => {
    //     const payload: CreateCommunityType = {
    //       firstname,
    //       lastName,
    //       urbanFarmName,
    //       // barangayName,
    //       phone,
    //       email,
    //       gender,
    //       communityEmail,
    //       password,
    //       confirmPassword,
    //       communityAddress,
    //       communityDescription,
    //       communityDisplayPhoto,
    //       userPhone,
    //       // communityImages,
    //     };

    //     const { data } = await axios.post(
    //       "/api/super-admin/createCommunity",
    //       payload
    //     );
    //     return data;
    //   },
    //   onError: (err) => {
    //     if (err instanceof AxiosError) {
    //       if (err.response?.status === 400) {
    //         toast({
    //           title: "Error",
    //           description:
    //             "Bad Request, phone number is already in use by another community.",
    //           variant: "destructive",
    //         });
    //       }
    //       if (err.response?.status === 401) {
    //         toast({
    //           title: "Error",
    //           description: "Unauthorized!",
    //           variant: "destructive",
    //         });
    //       }
    //       if (err.response?.status === 402) {
    //         toast({
    //           title: "Error",
    //           description: "Community already exists!",
    //           variant: "destructive",
    //         });
    //       }
    //       if (err.response?.status === 403) {
    //         toast({
    //           title: "Error",
    //           description: "Community email already exists!",
    //           variant: "destructive",
    //         });
    //       }
    //       if (err.response?.status === 405) {
    //         toast({
    //           title: "Error",
    //           description: "Urban Farm name already exists!",
    //           variant: "destructive",
    //         });
    //       }
    //       if (err.response?.status === 406) {
    //         toast({
    //           title: "Error",
    //           description:
    //             "Invalid admin email, it is already used by another user!",
    //           variant: "destructive",
    //         });
    //       }
    //       if (err.response?.status === 407) {
    //         toast({
    //           title: "Error",
    //           description:
    //             "Invalid admin number, it is already used by another user!",
    //           variant: "destructive",
    //         });
    //       }
    //     } else {
    //       return toast({
    //         title: "Something went wrong.",
    //         description: "Error",
    //         variant: "destructive",
    //       });
    //     }
    //     toast({
    //       title: "Something went wrong.",
    //       description: `${err}`,
    //       variant: "destructive",
    //     });
    //   },
    //   onSuccess: (data) => {
    //     toast({
    //       title: "Success!",
    //       description: `${data}`,
    //       variant: "default",
    //     });

    //     setTimeout(() => {
    //       router.push("/communities");
    //       router.refresh();
    //     }, 1000);
    //   },
    // });
    console.log(
        form.watch()
    )

    function onSubmit(values: CreateCommunityType) {


        startTransition(() => {
            createUrbanFarm(values, formUrl).then((callback) => {
                if (callback.error) {
                    toast({
                        description: callback.error,
                        variant: "destructive"
                    })
                }

                if (callback.success) {
                    toast({
                        description: callback.success,
                    })
                }
            })
        })
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-[#E3E1E1]">
            <section className="flex items-center justify-center p-11 rounded-3xl">
                <Card className="">
                    <div className="w-full h-full">
                        <div className="w-full flex justify-center items-center">
                            <h1 className="font-bold text-lg mb-6">Urban Farm Community Registration</h1>
                        </div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6 w-full"
                            >
                                {formStep === 1 && (
                                    <>
                                        <div className="grid grid-cols-1 w-full">
                                            <FormField
                                                control={form.control}
                                                name="urbanFarmName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Urban Farm Community Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Urbn" {...field} type="text" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1">
                                            <FormField
                                                control={form.control}
                                                name="communityAddress"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Barangay</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Urbn" {...field} type="text" value={user?.barangay as string} disabled={true} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1">
                                            <h1 className="ml-1 text-sm font-medium">Area</h1>
                                            <Select value={area} onValueChange={setArea}>
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select an area" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Areas</SelectLabel>
                                                        <>
                                                            {/* <SelectItem value="Area 1">Area 1</SelectItem>
                                                            <SelectItem value="Area 2">Area 2</SelectItem>
                                                            <SelectItem value="Area 3">Area 3</SelectItem>
                                                            <SelectItem value="Area 4">Area 4</SelectItem>
                                                            <SelectItem value="Area 5">Area 5</SelectItem>
                                                            <SelectItem value="Area 6">Area 6</SelectItem>
                                                            <SelectItem value="Area 7">Area 7</SelectItem> */}
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
                                                            <SelectItem value="Quirino Highway">San Pedro 9</SelectItem>
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
                                                            <SelectItem value="Mangilog Compound">Princess Homes</SelectItem>
                                                        </>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* <div className="grid grid-cols-1">
                                            <h1 className="ml-1 text-sm font-medium">Address</h1>
                                            <Select value={areaAddress} onValueChange={setAreaAddress}>
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select address" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Areas</SelectLabel>
                                                        <>
                                                            {area === "Area 1" && (
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
                                                                </>
                                                            )}
                                                            {area === "Area 2" && (
                                                                <>
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
                                                                </>
                                                            )}
                                                            {area === "Area 3" && (
                                                                <>
                                                                    <SelectItem value="Kingspoint Subdivision">Kingspoint Subdivision</SelectItem>
                                                                    <SelectItem value="Alipio Compound">Alipio Compound</SelectItem>
                                                                    <SelectItem value="Oro Compound">Oro Compound</SelectItem>
                                                                    <SelectItem value="Uping">Uping</SelectItem>
                                                                    <SelectItem value="Pinera">Pinera</SelectItem>
                                                                    <SelectItem value="Quirino Highway">San Pedro 9</SelectItem>
                                                                    <SelectItem value="Maloles Compound">Maloles Compound</SelectItem>
                                                                    <SelectItem value="Babina Compound">Babina Compound</SelectItem>
                                                                    <SelectItem value="Unang Tangke">Unang Tangke</SelectItem>
                                                                    <SelectItem value="Daniac">Daniac</SelectItem>
                                                                    <SelectItem value="Kasiyahan">Kasiyahan</SelectItem>
                                                                    <SelectItem value="Enclave">Enclave</SelectItem>
                                                                    <SelectItem value="Grand Villas">Grand Villas</SelectItem>
                                                                </>
                                                            )}
                                                            {area === "Area 4" && (
                                                                <>
                                                                    <SelectItem value="Dupax">Dupax</SelectItem>
                                                                    <SelectItem value="Wings">Wings</SelectItem>
                                                                    <SelectItem value="Santos Compound">Santos Compound</SelectItem>
                                                                    <SelectItem value="Camp Grezar">Camp Grezar</SelectItem>
                                                                    <SelectItem value="Franco">Franco</SelectItem>
                                                                    <SelectItem value="Katipunan Kaliwa">Katipunan Kaliwa</SelectItem>
                                                                    <SelectItem value="Coronel Compound">Coronel Compound</SelectItem>
                                                                    <SelectItem value="Mantikaan">Mantikaan</SelectItem>
                                                                    <SelectItem value="Likas">Likas</SelectItem>
                                                                </>
                                                            )}
                                                            {area === "Area 5" && (
                                                                <>
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
                                                                </>
                                                            )}
                                                            {area === "Area 6" && (
                                                                <>
                                                                    <SelectItem value="Ibayo II (Taas, Baba)">Ibayo II (Taas, Baba)</SelectItem>
                                                                    <SelectItem value="Maligay">Maligay</SelectItem>
                                                                    <SelectItem value="Ibayo I (Leon Cleofas St.)">Ibayo I (Leon Cleofas St.)</SelectItem>
                                                                    <SelectItem value="Karaan">Karaan</SelectItem>
                                                                    <SelectItem value="St. Michael">St. Michael</SelectItem>
                                                                    <SelectItem value="Urcia">Urcia</SelectItem>
                                                                    <SelectItem value="Magno">Magno</SelectItem>
                                                                    <SelectItem value="Bernarty">Bernarty</SelectItem>
                                                                </>
                                                            )}
                                                            {area === "Area 7" && (
                                                                <>
                                                                    <SelectItem value="Seminaryo">Seminaryo</SelectItem>
                                                                    <SelectItem value="Remarville Ave.">Remarville Avenue</SelectItem>
                                                                    <SelectItem value="Zodiac">Zodiac</SelectItem>
                                                                    <SelectItem value="Apollo">Apollo</SelectItem>
                                                                    <SelectItem value="Old Paliguan">Old Paliguan</SelectItem>
                                                                    <SelectItem value="Gawad Kalinga">Gawad Kalinga</SelectItem>
                                                                    <SelectItem value="Remarville Subdivision">Remarville Subdivision</SelectItem>
                                                                    <SelectItem value="Mangilog Compound">Mangilog Compound</SelectItem>
                                                                    <SelectItem value="Mangilog Compound">Princess Homes</SelectItem>
                                                                </>
                                                            )}
                                                        </>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div> */}

                                        <div className="grid grid-cols-1">
                                            <FormField
                                                control={form.control}
                                                name="blk"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>House / Blk no.</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="..."
                                                                {...field}
                                                                type="text"
                                                                className=""
                                                            />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1">
                                            <FormField
                                                control={form.control}
                                                name="street"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Street Name</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="..."
                                                                {...field}
                                                                type="text"
                                                                className=""
                                                            />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1">
                                            <FormField
                                                control={form.control}
                                                name="zip"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Postal Code</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="..."
                                                                {...field}
                                                                type="text"
                                                                className=""
                                                            />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1">
                                            <h1 className="text-sm font-medium">
                                                Form
                                            </h1>
                                            {formUrl.length ? (
                                                <div className="w-full flex flex-col items-center justify-center mt-5">
                                                    <Image
                                                        alt="product image"
                                                        src={formUrl}
                                                        width={250}
                                                        height={250}
                                                        className="mb-3"
                                                    />
                                                    <Button variant="outline" onClick={() => setFormUrl("")}>
                                                        Change
                                                    </Button>
                                                </div>
                                            ) : (
                                                <UploadDropzone
                                                    className="text-green"
                                                    appearance={{
                                                        button: "bg-[#00B207] p-2 mb-3",
                                                        label: "text-green",
                                                        allowedContent:
                                                            "flex h-8 flex-col items-center justify-center px-2 text-green",
                                                    }}
                                                    endpoint="changeAvatar"
                                                    onClientUploadComplete={(res) => {
                                                        console.log("Files: ", res);
                                                        if (res && res.length > 0 && res[0].url) {
                                                            setFormUrl(res[0].url);
                                                        } else {
                                                            console.error("Please input a valid image.", res);
                                                        }
                                                    }}
                                                    onUploadError={(error: Error) => {
                                                        toast({
                                                            title: "Error!",
                                                            description: error.message,
                                                            variant: "destructive",
                                                        });
                                                    }}
                                                />
                                            )}
                                            <h1 className="text-muted-foreground text-sm mt-1">Note: The form </h1>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full mt-5"
                                            variant="newGreen"
                                            disabled={areaIsEmpty || formUrlIsEmpty}
                                            onClick={() => {
                                                form.trigger(['urbanFarmName', 'blk', 'street', 'zip'])

                                                const cpState = form.getFieldState("urbanFarmName")
                                                const pwState = form.getFieldState("zip")
                                                const lnState = form.getFieldState("blk")
                                                const emState = form.getFieldState("street")

                                                form.setValue("communityAddress", user?.barangay as string)

                                                if (!cpState.isDirty || cpState.invalid) return;
                                                if (!pwState.isDirty || pwState.invalid) return;
                                                if (!lnState.isDirty || lnState.invalid) return;
                                                // if (!fnState.isDirty || fnState.invalid) return;
                                                if (!emState.isDirty || emState.invalid) return;

                                                setFormStep(2)
                                            }}
                                        >
                                            Next Step
                                        </Button>
                                    </>
                                )}

                                {formStep === 2 && (
                                    <>
                                        <div className="grid grid-cols-1">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Admin Email</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="@gmail.com"
                                                                {...field}
                                                                type="email"
                                                            />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center w-full gap-7">
                                            <FormField
                                                control={form.control}
                                                name="firstname"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>First Name</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Firstname"
                                                                {...field}
                                                                type="text"
                                                                className=""
                                                                onKeyPress={(event) => {
                                                                    const charCode = event.which
                                                                        ? event.which
                                                                        : event.keyCode;
                                                                    if (
                                                                        !(charCode >= 65 && charCode <= 90) &&
                                                                        !(charCode >= 97 && charCode <= 122) &&
                                                                        charCode !== 32 &&
                                                                        charCode !== 8 &&
                                                                        charCode !== 9 &&
                                                                        charCode !== 0
                                                                    ) {
                                                                        event.preventDefault();
                                                                    }
                                                                }}
                                                            />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="lastName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Last Name</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Lastname"
                                                                {...field}
                                                                type="text"
                                                                className=""
                                                                onKeyPress={(event) => {
                                                                    const charCode = event.which
                                                                        ? event.which
                                                                        : event.keyCode;
                                                                    if (
                                                                        !(charCode >= 65 && charCode <= 90) &&
                                                                        !(charCode >= 97 && charCode <= 122) &&
                                                                        charCode !== 32 &&
                                                                        charCode !== 8 &&
                                                                        charCode !== 9 &&
                                                                        charCode !== 0
                                                                    ) {
                                                                        event.preventDefault();
                                                                    }
                                                                }}
                                                            />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1">
                                            <FormField
                                                control={form.control}
                                                name="userPhone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Admin Contact No.</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="09"
                                                                {...field}
                                                                type="number"
                                                                className=""
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1">
                                            <FormField
                                                control={form.control}
                                                name="gender"
                                                render={({ field }) => (
                                                    <FormItem className="">
                                                        <FormLabel>Gender</FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Gender" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="Male">Male</SelectItem>
                                                                <SelectItem value="Female">Female</SelectItem>
                                                                <SelectItem value="Other">Other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </>
                                )}


                                {/* <div className="grid grid-cols-1">
                                    <FormField
                                        control={form.control}
                                        name="communityDescription"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Urban Farm Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Markethub description...."
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1">
                                    <h1 className="text-sm font-medium">
                                        Urban Farm Display Photo
                                    </h1>
                                    {imageUrl.length ? (
                                        <div className="w-full flex flex-col items-center justify-center mt-5">
                                            <Image
                                                alt="product image"
                                                src={imageUrl}
                                                width={250}
                                                height={250}
                                                className="mb-3"
                                            />
                                            <Button variant="outline" onClick={() => setImageUrl("")}>
                                                Change
                                            </Button>
                                        </div>
                                    ) : (
                                        <UploadDropzone
                                            className="text-green"
                                            appearance={{
                                                button: "bg-[#00B207] p-2 mb-3",
                                                label: "text-green",
                                                allowedContent:
                                                    "flex h-8 flex-col items-center justify-center px-2 text-green",
                                            }}
                                            endpoint="changeAvatar"
                                            onClientUploadComplete={(res) => {
                                                console.log("Files: ", res);
                                                if (res && res.length > 0 && res[0].url) {
                                                    setImageUrl(res[0].url);
                                                } else {
                                                    console.error("Please input a valid image.", res);
                                                }
                                            }}
                                            onUploadError={(error: Error) => {
                                                toast({
                                                    title: "Error!",
                                                    description: error.message,
                                                    variant: "destructive",
                                                });
                                            }}
                                        />
                                    )}
                                </div>

                                <Separator /> */}



                                {/* <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Password" {...field} type='password' />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Confirm Password" {...field} type='password' />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}

                                {formStep === 2 && (
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            variant="outline"
                                            onClick={() => setFormStep(1)}
                                        >
                                            Go back
                                        </Button>

                                        <Button
                                            type="submit"
                                            className="bg-[#4DE69E] hover:bg-[#bababa8f] w-full text-black"
                                            isLoading={isPending}
                                            disabled={isPending || formUrlIsEmpty}
                                        >
                                            Sign up
                                        </Button>
                                    </div>
                                )}

                                {/* <div className="w-full">
                                    <Button
                                        type="submit"
                                        className="bg-[#4DE69E] hover:bg-[#bababa8f] w-full text-black"
                                    // isLoading={isLoading}
                                    // disabled={isLoading || imageIsEmpty}
                                    >
                                        Sign up
                                    </Button>
                                </div> */}
                            </form>
                        </Form>
                    </div>
                </Card>
            </section>
        </div>
    );
};
