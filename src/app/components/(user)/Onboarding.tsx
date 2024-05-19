"use client";
import { toast } from "@/lib/hooks/use-toast";
import { getMinBirthDate } from "@/lib/utils";
import {
  OnboardingSchema,
  OnboardingType,
} from "@/lib/validations/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { X } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/Ui/select";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/app/components/Ui/label";
import { Input } from "@/app/components/Ui/Input";
import { Textarea } from "@/app/components/Ui/textarea";
import { Checkbox } from "@/app/components/Ui/checkbox";
import { Button } from "@/components/ui/button";
import { getCommunitiesWithoutSession } from "../../../../actions/community";
import { Community, User } from "@prisma/client";
import { UserWithCommunity } from "@/lib/types";

interface Props {
  user: UserWithCommunity;
}
type Barangay = "Nova Proper" | "Bagbag" | "Bagong Silangan";

const barangayZipCodes: Record<Barangay, string> = {
  "Nova Proper": "1121",
  Bagbag: "1116",
  "Bagong Silangan": "1119",
};

export const Onboarding = ({ user }: Props) => {
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [selectedBrgy, setSelectedBrgy] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<OnboardingType>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
      address: "",
    },
  });

  const { data: communities, refetch } = useQuery({
    queryKey: ["communities"],
    queryFn: async () => await getCommunitiesWithoutSession(),
  });

  const handleSelectChange = (value: string | null) => {
    // Check for null and handle accordingly
    const communityValue = value !== null ? value : ""; // or provide a default value
    refetch();
    setValue("community", communityValue);
  };

  const handleBarangayChange = (value: string | null) => {
    const selectedBrgy = value !== null ? value : "";
    setValue("barangay", selectedBrgy);
    setSelectedBrgy(selectedBrgy);
    const selectedZip =
      value !== null ? barangayZipCodes[value as Barangay] || "" : "";
    setZipCode(selectedZip);
  };

  const handleAreaChange = (value: string) => {
    const selectedArea = value !== null ? value : "";

    setValue("address", selectedArea);
  };

  useEffect(() => {
    if (communities) {
      const currentCommunity = communities.find(
        (community) => community.name === getValues("community")
      );
      setSelectedCommunity(currentCommunity?.address ?? "");
    }
  }, [getValues, communities]);

  const { mutate: onboardingUpdate, isLoading } = useMutation({
    mutationFn: async ({
      username,
      phoneNumber,
      birthday,
      community,
      address,
      lastName,
      name,
      suffix,
      blk,
      street,
      zip,
      barangay,
    }: OnboardingType) => {
      const payload: OnboardingType = {
        username,
        phoneNumber,
        birthday,
        community,
        address,
        lastName,
        name,
        suffix,
        blk,
        street,
        zip,
        barangay,
      };
      const { data } = await axios.post("/api/user/onboarding", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 400) {
            return toast({
              title: "Invalid Action",
              description:
                "Phone Number already exists. Please use a different one.",
              variant: "destructive",
            });
          }
          if (err.response?.status === 401) {
            return toast({
              title: "Invalid Action",
              description: "Unauthorized.",
              variant: "destructive",
            });
          }
          if (err.response?.status === 404) {
            return toast({
              title: "Invalid Action",
              description: "User not found!",
              variant: "destructive",
            });
          }
          if (err.response?.status === 405) {
            return toast({
              title: "Invalid Action",
              description: "Method not allowed",
              variant: "destructive",
            });
          }
          if (err.response?.status === 409) {
            return toast({
              title: "Invalid username",
              description:
                "Username already exists. Please use a different one.",
              variant: "destructive",
            });
          }
        } else {
          return toast({
            title: "Error!",
            description: "Error: Something went wrong!",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Updated account successfully!",
        variant: "default",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });

  const onSubmit: SubmitHandler<OnboardingType> = (data: OnboardingType) => {
    const payload: OnboardingType = {
      username: data.username,
      phoneNumber: data.phoneNumber,
      birthday: data.birthday,
      community: data.community,
      address: data.address,
      lastName: data.lastName,
      name: data.name,
      suffix: data.suffix,
      blk: data.blk,
      street: data.street,
      zip: data.zip,
      barangay: data.barangay,
    };

    onboardingUpdate(payload);
  };

  const handleSignOut = () => {
    toast({
      title: "Logging out",
      description:
        "You have been automatically logged out because you cancelled onboarding.",
      variant: "destructive",
    });

    setTimeout(() => {
      signOut();
    }, 2000);
  };

  const [zipCode, setZipCode] = useState("");

  console.log(selectedCommunity);

  return (
    <main className="flex flex-col items-center justify-center border min-h-screen">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <CardTitle className="text-2xl">
                Welcome to{" "}
                <span className="text-[#24643B]">
                  AGreen <span className="text-[#F7C35F]">Nature</span> Connect
                </span>
              </CardTitle>
              <CardDescription>
                Fill out the forms, to continue using AGreenNatureConnect.
              </CardDescription>
            </div>
            <Button
              className="rounded-full w-8 h-8"
              size="icon"
              variant="ghost"
              onClick={handleSignOut}
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/** input */}
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...register("username")}
                placeholder="Enter your Username"
              />
            </div>
            {errors.username && (
              <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                {errors.username.message}
              </span>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                  {...register("name")}
                  id="name"
                  placeholder="Enter your Firstname"
                  type="text"
                  onKeyPress={(event) => {
                    const charCode = event.which ? event.which : event.keyCode;
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Enter your Lastname"
                  type="name"
                  onKeyPress={(event) => {
                    const charCode = event.which ? event.which : event.keyCode;
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="suffix">Suffix (optional)</Label>
                <Input
                  id="suffix"
                  {...register("suffix")}
                  placeholder="Enter your Suffix"
                  type="suffix"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phoneNumber"
                {...register("phoneNumber")}
                placeholder="Enter your phone number"
                type="number"
              />
            </div>
            {errors.phoneNumber && (
              <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                {errors.phoneNumber.message}
              </span>
            )}
            <div className="space-y-2">
              <Label htmlFor="birthday">Birthday</Label>
              <Input
                type="date"
                id="birthday"
                placeholder=""
                {...register("birthday")}
                max={getMinBirthDate()}
              />
            </div>
            {errors.birthday && (
              <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                {errors.birthday.message}
              </span>
            )}

            <div>
              <Label htmlFor="communities">Barangay</Label>
              <div className="w-full flex items-center justify-center">
                <Select
                  {...register("barangay")}
                  onValueChange={handleBarangayChange}
                >
                  <SelectTrigger
                    className="
                                md:w-[620px]
                                rounded-md
                                h-[30px]
                                mt-2
                                p-4
                                dark:bg-[#09090B]
                                font-light 
                                bg-white 
                                border-2
                                outline-none
                                transition
                                disabled:opacity-70
                                disabled:cursor-not-allowed"
                  >
                    <SelectValue placeholder="Choose your specified barangay" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Barangay</SelectLabel>
                      <SelectItem value="Nova Proper">Nova Proper</SelectItem>
                      <SelectItem value="Bagbag">Bagbag</SelectItem>
                      <SelectItem value="Bagong Silangan">
                        Bagong Silangan
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {errors.barangay && (
                <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                  {errors.barangay.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="communities">Urban Farm</Label>
              <div className="w-full flex items-center justify-center">
                <Select
                  {...register("community")}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger
                    className="
                                md:w-[620px]
                                rounded-md
                                h-[30px]
                                mt-2
                                p-4
                                dark:bg-[#09090B]
                                font-light 
                                bg-white 
                                border-2
                                outline-none
                                transition
                                disabled:opacity-70
                                disabled:cursor-not-allowed"
                  >
                    <SelectValue placeholder="Select your urban farms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Urban Farms</SelectLabel>
                      {communities
                        ?.filter(
                          (community) => community.address === selectedBrgy
                        )
                        .map((community, i) => (
                          <SelectItem key={i} value={community.name}>
                            {community.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {errors.community && (
                <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                  {errors.community.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h1 className="ml-1 text-sm font-medium">Area</h1>
              <Select {...register("address")} onValueChange={handleAreaChange}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select an area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Areas</SelectLabel>
                    <>
                      {selectedCommunity === "Bagbag" && (
                        <>
                          <SelectItem value="Pagkabuhay Road">
                            Pagkabuhay Road
                          </SelectItem>
                          <SelectItem value="Sinforosa">Sinforosa</SelectItem>
                          <SelectItem value="Urbano">Urbano</SelectItem>
                          <SelectItem value="Sementeryo">Sementeryo</SelectItem>
                          <SelectItem value="Alipio">Alipio</SelectItem>
                          <SelectItem value="Goodwill 2">Goodwill 2</SelectItem>
                          <SelectItem value="Goodwill Town Homes">
                            Goodwill Town Homes
                          </SelectItem>
                          <SelectItem value="Biglang-awa">
                            Biglang-awa
                          </SelectItem>
                          <SelectItem value="625">625</SelectItem>
                          <SelectItem value="Wings Sampalokan">
                            Wings Sampalokan
                          </SelectItem>
                          <SelectItem value="Blas Roque">Blas Roque</SelectItem>
                          <SelectItem value="Celina Drive">
                            Celina Drive
                          </SelectItem>
                          <SelectItem value="Tolentino">Tolentino</SelectItem>
                          <SelectItem value="615">615</SelectItem>
                          <SelectItem value="Callejon">Callejon</SelectItem>
                          <SelectItem value="Quirino Highway">
                            Quirino Highway
                          </SelectItem>
                          <SelectItem value="Ngi Yaw (604)">
                            Ngi Yaw (604)
                          </SelectItem>
                          <SelectItem value="Carreon">Carreon</SelectItem>
                          <SelectItem value="Goldhill">Goldhill</SelectItem>
                          <SelectItem value="Sinagtala">Sinagtala</SelectItem>
                          <SelectItem value="Kingspoint Subdivision">
                            Kingspoint Subdivision
                          </SelectItem>
                          <SelectItem value="Alipio Compound">
                            Alipio Compound
                          </SelectItem>
                          <SelectItem value="Oro Compound">
                            Oro Compound
                          </SelectItem>
                          <SelectItem value="Uping">Uping</SelectItem>
                          <SelectItem value="Pinera">Pinera</SelectItem>
                          <SelectItem value="San Pedro 9">
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
                          <SelectItem value="Daniac">Daniac</SelectItem>
                          <SelectItem value="Kasiyahan">Kasiyahan</SelectItem>
                          <SelectItem value="Enclave">Enclave</SelectItem>
                          <SelectItem value="Grand Villas">
                            Grand Villas
                          </SelectItem>
                          <SelectItem value="Dupax">Dupax</SelectItem>
                          <SelectItem value="Wings">Wings</SelectItem>
                          <SelectItem value="Santos Compound">
                            Santos Compound
                          </SelectItem>
                          <SelectItem value="Camp Grezar">
                            Camp Grezar
                          </SelectItem>
                          <SelectItem value="Franco">Franco</SelectItem>
                          <SelectItem value="Katipunan Kaliwa">
                            Katipunan Kaliwa
                          </SelectItem>
                          <SelectItem value="Coronel Compound">
                            Coronel Compound
                          </SelectItem>
                          <SelectItem value="Mantikaan">Mantikaan</SelectItem>
                          <SelectItem value="Likas">Likas</SelectItem>
                          <SelectItem value="Don Julio Gregorio">
                            Don Julio Gregorio
                          </SelectItem>
                          <SelectItem value="Richland V">Richland V</SelectItem>
                          <SelectItem value="Marides">Marides</SelectItem>
                          <SelectItem value="Abbey Road">Abbey Road</SelectItem>
                          <SelectItem value="Manggahan">Manggahan</SelectItem>
                          <SelectItem value="RD 1-4">RD 1-4</SelectItem>
                          <SelectItem value="R7">R7</SelectItem>
                          <SelectItem value="Narra">Narra</SelectItem>
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
                          <SelectItem value="Maligay">Maligay</SelectItem>
                          <SelectItem value="Ibayo I (Leon Cleofas St.)">
                            Ibayo I (Leon Cleofas St.)
                          </SelectItem>
                          <SelectItem value="Karaan">Karaan</SelectItem>
                          <SelectItem value="St. Michael">
                            St. Michael
                          </SelectItem>
                          <SelectItem value="Urcia">Urcia</SelectItem>
                          <SelectItem value="Magno">Magno</SelectItem>
                          <SelectItem value="Bernarty">Bernarty</SelectItem>
                          <SelectItem value="Seminaryo">Seminaryo</SelectItem>
                          <SelectItem value="Remarville Ave.">
                            Remarville Avenue
                          </SelectItem>
                          <SelectItem value="Zodiac">Zodiac</SelectItem>
                          <SelectItem value="Apollo">Apollo</SelectItem>
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
                          <SelectItem value="Princess Homes">
                            Princess Homes
                          </SelectItem>
                        </>
                      )}

                      {selectedCommunity === "Nova Proper" && (
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
                          <SelectItem value="Buenamar">Buenamar</SelectItem>
                          <SelectItem value="Ramirez">Ramirez</SelectItem>
                          <SelectItem value="Susano">Susano</SelectItem>
                          <SelectItem value="Austria">Austria</SelectItem>
                          <SelectItem value="Gold">Gold</SelectItem>
                          <SelectItem value="Diamond">Diamond</SelectItem>
                          <SelectItem value="Emerald">Emerald</SelectItem>
                        </>
                      )}

                      {selectedCommunity === "Bagong Silangan" && (
                        <>
                          <SelectItem value="Area B">Area B</SelectItem>
                          <SelectItem value="Area C">Area C</SelectItem>
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
                          <SelectItem value="Filside">Filside</SelectItem>
                          <SelectItem value="San Policarpio">
                            San Policarpio
                          </SelectItem>
                          <SelectItem value="Comia">Comia</SelectItem>
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
                          <SelectItem value="Mt. Carmel">Mt. Carmel</SelectItem>
                          <SelectItem value="Mapayapa">Mapayapa</SelectItem>
                          <SelectItem value="Brookside">Brookside</SelectItem>
                          <SelectItem value="Hilltop">Hilltop</SelectItem>
                          <SelectItem value="Calamiong">Calamiong</SelectItem>
                          <SelectItem value="Pinagbuklod">
                            Pinagbuklod
                          </SelectItem>
                          <SelectItem value="Tumana">Tumana</SelectItem>
                          <SelectItem value="New Greenland">
                            New Greenland
                          </SelectItem>
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
                  placeholder="..."
                  {...register("blk")}
                  type="text"
                  className=""
                />
              </div>

              <div>
                <Label htmlFor="zip">Zip Code</Label>
                <Input
                  placeholder="..."
                  {...register("zip")}
                  type="text"
                  value={zipCode}
                  className=""
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Street Name</Label>
              <Input
                placeholder="..."
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
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="bg-[#099073]  duration-300 rounded-xl w-[300px] h-[50px] font-bold md:w-[620px] md:h-[50px] text-white md:mb-5">
              Update
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
};

function XIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
