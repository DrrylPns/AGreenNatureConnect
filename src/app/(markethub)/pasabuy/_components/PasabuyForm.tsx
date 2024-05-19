"use client";

import { Button } from "@/app/components/Ui/Button";
import { Input } from "@/app/components/Ui/Input";
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
import { toast } from "@/lib/hooks/use-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import {
  CreateCommunitySchema,
  CreateCommunityType,
} from "@/lib/validations/super-admin/createCommunity";
import { zodResolver } from "@hookform/resolvers/zod";
import { Community, User } from "@prisma/client";
import { Card } from "@tremor/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  createPasabuy,
  fetchUrbanFarms,
} from "../../../../../actions/community";
import { useMutation } from "@tanstack/react-query";
import { PasabuySchema, PasabuyType } from "@/lib/validations/pasabuy";

type StateType = {
  countryCode: string;
  isoCode: string;
  latitude: string;
  longitude: string;
  name: string;
};

type CityType = {
  stateCode: string;
  latitude: string;
  longitude: string;
  name: string;
  countryCode: string;
};

interface Props {
  user: User;
}

export const PasabuyForm = ({ user }: Props) => {
  const [area, setArea] = useState("");
  const [formStep, setFormStep] = useState(1);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [formUrl, setFormUrl] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [selectFarm, setSelectFarm] = useState<string>("");

  const form = useForm<PasabuyType>({
    resolver: zodResolver(PasabuySchema),
    defaultValues: {
      email: user.email || "",
      firstname: user.name || "",
      lastName: user.lastName || "",
      userPhone: user.phoneNumber || "",
      gender: user.gender || "",
    },
  });

  const router = useRouter();

  const imageIsEmpty = imageUrl.length === 0;
  const formUrlIsEmpty = formUrl.length === 0;
  const areaIsEmpty = area.length === 0;

  function onSubmit(values: PasabuyType) {
    startTransition(() => {
      createPasabuy(values, formUrl).then((callback) => {
        if (callback.error) {
          toast({
            description: callback.error,
            variant: "destructive",
          });
        }

        if (callback.success) {
          toast({
            description: callback.success,
          });
          router.replace(`/markethub`);
        }
      });
    });
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#E3E1E1]">
      <section className="flex items-center justify-center p-11 rounded-3xl">
        <Card className="">
          <div className="w-full h-full">
            <div className="w-full flex justify-center items-center">
              <h1 className="font-bold text-lg mb-6">
                Urban Farm Registration Request
              </h1>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full"
              >
                {formStep === 1 && (
                  <>
                    <div className="grid grid-cols-1">
                      <FormField
                        control={form.control}
                        name="urbanFarmName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Urban Farm Name</FormLabel>
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
                        name="communityAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Barangay</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Urbn"
                                {...field}
                                type="text"
                                value={user?.barangay as string}
                                disabled={true}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <h1>Your Details:</h1>
                    <div className="grid grid-cols-1">
                      <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Area</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
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
                                      {user?.barangay === "Bagbag" && (
                                        <>
                                          <SelectItem value="Pagkabuhay Road">
                                            Pagkabuhay Road
                                          </SelectItem>
                                          <SelectItem value="Sinforosa">
                                            Sinforosa
                                          </SelectItem>
                                          <SelectItem value="Urbano">
                                            Urbano
                                          </SelectItem>
                                          <SelectItem value="Sementeryo">
                                            Sementeryo
                                          </SelectItem>
                                          <SelectItem value="Alipio">
                                            Alipio
                                          </SelectItem>
                                          <SelectItem value="Goodwill 2">
                                            Goodwill 2
                                          </SelectItem>
                                          <SelectItem value="Goodwill Town Homes">
                                            Goodwill Town Homes
                                          </SelectItem>
                                          <SelectItem value="Biglang-awa">
                                            Biglang-awa
                                          </SelectItem>
                                          <SelectItem value="625">
                                            625
                                          </SelectItem>
                                          <SelectItem value="Wings Sampalokan">
                                            Wings Sampalokan
                                          </SelectItem>
                                          <SelectItem value="Blas Roque">
                                            Blas Roque
                                          </SelectItem>
                                          <SelectItem value="Celina Drive">
                                            Celina Drive
                                          </SelectItem>
                                          <SelectItem value="Tolentino">
                                            Tolentino
                                          </SelectItem>
                                          <SelectItem value="615">
                                            615
                                          </SelectItem>
                                          <SelectItem value="Callejon">
                                            Callejon
                                          </SelectItem>
                                          <SelectItem value="Quirino Highway">
                                            Quirino Highway
                                          </SelectItem>
                                          <SelectItem value="Ngi Yaw (604)">
                                            Ngi Yaw (604)
                                          </SelectItem>
                                          <SelectItem value="Carreon">
                                            Carreon
                                          </SelectItem>
                                          <SelectItem value="Goldhill">
                                            Goldhill
                                          </SelectItem>
                                          <SelectItem value="Sinagtala">
                                            Sinagtala
                                          </SelectItem>
                                          <SelectItem value="Kingspoint Subdivision">
                                            Kingspoint Subdivision
                                          </SelectItem>
                                          <SelectItem value="Alipio Compound">
                                            Alipio Compound
                                          </SelectItem>
                                          <SelectItem value="Oro Compound">
                                            Oro Compound
                                          </SelectItem>
                                          <SelectItem value="Uping">
                                            Uping
                                          </SelectItem>
                                          <SelectItem value="Pinera">
                                            Pinera
                                          </SelectItem>
                                          <SelectItem value="Quirino Highway">
                                            San Pedro 9
                                          </SelectItem>
                                          <SelectItem value="Maloles Compound">
                                            Maloles Compound
                                          </SelectItem>
                                          <SelectItem value="Babina Compound">
                                            Babina Compound
                                          </SelectItem>
                                          <SelectItem value="Unang Tangke">
                                            Unang Tangke
                                          </SelectItem>
                                          <SelectItem value="Daniac">
                                            Daniac
                                          </SelectItem>
                                          <SelectItem value="Kasiyahan">
                                            Kasiyahan
                                          </SelectItem>
                                          <SelectItem value="Enclave">
                                            Enclave
                                          </SelectItem>
                                          <SelectItem value="Grand Villas">
                                            Grand Villas
                                          </SelectItem>
                                          <SelectItem value="Dupax">
                                            Dupax
                                          </SelectItem>
                                          <SelectItem value="Wings">
                                            Wings
                                          </SelectItem>
                                          <SelectItem value="Santos Compound">
                                            Santos Compound
                                          </SelectItem>
                                          <SelectItem value="Camp Grezar">
                                            Camp Grezar
                                          </SelectItem>
                                          <SelectItem value="Franco">
                                            Franco
                                          </SelectItem>
                                          <SelectItem value="Katipunan Kaliwa">
                                            Katipunan Kaliwa
                                          </SelectItem>
                                          <SelectItem value="Coronel Compound">
                                            Coronel Compound
                                          </SelectItem>
                                          <SelectItem value="Mantikaan">
                                            Mantikaan
                                          </SelectItem>
                                          <SelectItem value="Likas">
                                            Likas
                                          </SelectItem>
                                          <SelectItem value="Don Julio Gregorio">
                                            Don Julio Gregorio
                                          </SelectItem>
                                          <SelectItem value="Richland V">
                                            Richland V
                                          </SelectItem>
                                          <SelectItem value="Marides">
                                            Marides
                                          </SelectItem>
                                          <SelectItem value="Abbey Road">
                                            Abbey Road
                                          </SelectItem>
                                          <SelectItem value="Manggahan">
                                            Manggahan
                                          </SelectItem>
                                          <SelectItem value="RD 1-4">
                                            RD 1-4
                                          </SelectItem>
                                          <SelectItem value="R7">R7</SelectItem>
                                          <SelectItem value="Narra">
                                            Narra
                                          </SelectItem>
                                          <SelectItem value="Progressive Phase 1">
                                            Progressive Phase 1
                                          </SelectItem>
                                          <SelectItem value="Progressive Phase 2">
                                            Progressive Phase 2
                                          </SelectItem>
                                          <SelectItem value="Progressive Phase 3">
                                            Progressive Phase 3
                                          </SelectItem>
                                          <SelectItem value="De Asis Compound">
                                            De Asis Compound
                                          </SelectItem>
                                          <SelectItem value="Ibayo II (Taas, Baba)">
                                            Ibayo II (Taas, Baba)
                                          </SelectItem>
                                          <SelectItem value="Maligay">
                                            Maligay
                                          </SelectItem>
                                          <SelectItem value="Ibayo I (Leon Cleofas St.)">
                                            Ibayo I (Leon Cleofas St.)
                                          </SelectItem>
                                          <SelectItem value="Karaan">
                                            Karaan
                                          </SelectItem>
                                          <SelectItem value="St. Michael">
                                            St. Michael
                                          </SelectItem>
                                          <SelectItem value="Urcia">
                                            Urcia
                                          </SelectItem>
                                          <SelectItem value="Magno">
                                            Magno
                                          </SelectItem>
                                          <SelectItem value="Bernarty">
                                            Bernarty
                                          </SelectItem>
                                          <SelectItem value="Seminaryo">
                                            Seminaryo
                                          </SelectItem>
                                          <SelectItem value="Remarville Ave.">
                                            Remarville Avenue
                                          </SelectItem>
                                          <SelectItem value="Zodiac">
                                            Zodiac
                                          </SelectItem>
                                          <SelectItem value="Apollo">
                                            Apollo
                                          </SelectItem>
                                          <SelectItem value="Old Paliguan">
                                            Old Paliguan
                                          </SelectItem>
                                          <SelectItem value="Gawad Kalinga">
                                            Gawad Kalinga
                                          </SelectItem>
                                          <SelectItem value="Remarville Subdivision">
                                            Remarville Subdivision
                                          </SelectItem>
                                          <SelectItem value="Mangilog Compound">
                                            Mangilog Compound
                                          </SelectItem>
                                          <SelectItem value="Mangilog Compound">
                                            Princess Homes
                                          </SelectItem>
                                        </>
                                      )}

                                      {user?.barangay === "Nova Proper" && (
                                        <>
                                          <SelectItem value="Doña Rosario">
                                            Doña Rosario
                                          </SelectItem>
                                          <SelectItem value="Doña Isaura">
                                            Doña Isaura
                                          </SelectItem>
                                          <SelectItem value="Prinsipe Tupas">
                                            Prinsipe Tupas
                                          </SelectItem>
                                          <SelectItem value="F. Balagtas">
                                            F. Balagtas
                                          </SelectItem>
                                          <SelectItem value="M Agoncillo">
                                            M Agoncillo
                                          </SelectItem>
                                          <SelectItem value="Buenamar">
                                            Buenamar
                                          </SelectItem>
                                          <SelectItem value="Ramirez">
                                            Ramirez
                                          </SelectItem>
                                          <SelectItem value="Susano">
                                            Susano
                                          </SelectItem>
                                          <SelectItem value="Austria">
                                            Austria
                                          </SelectItem>
                                          <SelectItem value="Gold">
                                            Gold
                                          </SelectItem>
                                          <SelectItem value="Diamond">
                                            Diamond
                                          </SelectItem>
                                          <SelectItem value="Emerald">
                                            Emerald
                                          </SelectItem>
                                        </>
                                      )}

                                      {user?.barangay === "Bagong Silangan" && (
                                        <>
                                          <SelectItem value="Area B">
                                            Area B
                                          </SelectItem>
                                          <SelectItem value="Area C">
                                            Area C
                                          </SelectItem>
                                          <SelectItem value="Sitio Kumunoy">
                                            Sitio Kumunoy
                                          </SelectItem>
                                          <SelectItem value="Sitio Bakal">
                                            Sitio Bakal
                                          </SelectItem>
                                          <SelectItem value="Sitio Pugot">
                                            Sitio Pugot
                                          </SelectItem>
                                          <SelectItem value="Sitio Veterans">
                                            Sitio Veterans
                                          </SelectItem>
                                          <SelectItem value="Sitio Rolling Hills">
                                            Sitio Rolling Hills
                                          </SelectItem>
                                          <SelectItem value="Filside">
                                            Filside
                                          </SelectItem>
                                          <SelectItem value="San Policarpio">
                                            San Policarpio
                                          </SelectItem>
                                          <SelectItem value="Comia">
                                            Comia
                                          </SelectItem>
                                          <SelectItem value="Jubilee Phase 1">
                                            Jubilee Phase 1
                                          </SelectItem>
                                          <SelectItem value="Jubilee Phase 2">
                                            Jubilee Phase 2
                                          </SelectItem>
                                          <SelectItem value="Jubilee Phase 3">
                                            Jubilee Phase 3
                                          </SelectItem>
                                          <SelectItem value="Jubilee Phase 4">
                                            Jubilee Phase 4
                                          </SelectItem>
                                          <SelectItem value="Jubilee Phase 5">
                                            Jubilee Phase 5
                                          </SelectItem>
                                          <SelectItem value="Jubilee Phase 6">
                                            Jubilee Phase 6
                                          </SelectItem>
                                          <SelectItem value="Jubilee Phase 7">
                                            Jubilee Phase 7
                                          </SelectItem>
                                          <SelectItem value="Jubilee Phase 8">
                                            Jubilee Phase 8
                                          </SelectItem>
                                          <SelectItem value="Isla Pulang Bato">
                                            Isla Pulang Bato
                                          </SelectItem>
                                          <SelectItem value="Mt. Carmel">
                                            Mt. Carmel
                                          </SelectItem>
                                          <SelectItem value="Mapayapa">
                                            Mapayapa
                                          </SelectItem>
                                          <SelectItem value="Brookside">
                                            Brookside
                                          </SelectItem>
                                          <SelectItem value="Hilltop">
                                            Hilltop
                                          </SelectItem>
                                          <SelectItem value="Calamiong">
                                            Calamiong
                                          </SelectItem>
                                          <SelectItem value="Pinagbuklod">
                                            Pinagbuklod
                                          </SelectItem>
                                          <SelectItem value="Tumana">
                                            Tumana
                                          </SelectItem>
                                          <SelectItem value="New Greenland">
                                            New Greenland
                                          </SelectItem>
                                        </>
                                      )}
                                    </>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="..."
                                defaultValue={
                                  user?.barangay === "Bagong Silangan"
                                    ? "1144"
                                    : user?.barangay === "Nova Proper"
                                    ? "2256"
                                    : user?.barangay === "Bagbag"
                                    ? "5566"
                                    : ""
                                }
                                {...field}
                                type="text"
                                className=""
                                disabled
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1">
                      <h1 className="text-sm font-medium">Form</h1>
                      {formUrl.length ? (
                        <div className="w-full flex flex-col items-center justify-center mt-5">
                          <Image
                            alt="product image"
                            src={formUrl}
                            width={250}
                            height={250}
                            className="mb-3"
                          />
                          <Button
                            variant="outline"
                            onClick={() => setFormUrl("")}
                          >
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
                      <h1 className="text-muted-foreground text-sm mt-1">
                        Note: The form submitted here is proof that this urban
                        farm is registered.
                      </h1>
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-5"
                      variant="newGreen"
                      disabled={formUrlIsEmpty}
                      onClick={() => {
                        form.trigger(["urbanFarmName", "blk", "street", "zip"]);

                        const cpState = form.getFieldState("urbanFarmName");
                        const pwState = form.getFieldState("zip");
                        const lnState = form.getFieldState("blk");
                        const emState = form.getFieldState("street");

                        form.setValue(
                          "communityAddress",
                          user?.barangay as string
                        );

                        if (!cpState.isDirty || cpState.invalid) return;
                        // if (!fnState.isDirty || fnState.invalid) return;
                        if (!emState.isDirty || emState.invalid) return;

                        setFormStep(2);
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
                            <FormLabel>Email</FormLabel>
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
                            <FormLabel>Contact No.</FormLabel>
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
                      Submit
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
