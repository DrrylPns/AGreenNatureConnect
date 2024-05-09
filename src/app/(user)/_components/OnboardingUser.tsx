"use client";
import { Input } from "@/app/components/Ui/Input";
import { Label } from "@/app/components/Ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/app/components/Ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectItem } from "@/components/ui/select";
import { toast } from "@/lib/hooks/use-toast";
import {
  OnboardingUserSchema,
  OnboardingUserType,
} from "@/lib/validations/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Community, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { signOut } from "next-auth/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  user: User & {
    Community: Community;
  };
}

export const OnboardingUser = ({ user }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OnboardingUserType>({
    resolver: zodResolver(OnboardingUserSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
      address: "",
    },
  });

  const { mutate: onboardingUpdate, isLoading } = useMutation({
    mutationFn: async ({
      username,
      phoneNumber,
      address,
      lastName,
      name,
      suffix,
      blk,
      street,
      zip,
    }: OnboardingUserType) => {
      const payload: OnboardingUserType = {
        username,
        phoneNumber,
        address,
        lastName,
        name,
        suffix,
        blk,
        street,
        zip,
      };
      const { data } = await axios.post("/api/user/onboardingUser", payload);
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

  const onSubmit: SubmitHandler<OnboardingUserType> = (
    data: OnboardingUserType
  ) => {
    const payload: OnboardingUserType = {
      username: data.username,
      phoneNumber: data.phoneNumber,
      address: data.address,
      lastName: data.lastName,
      name: data.name,
      suffix: data.suffix,
      blk: data.blk,
      street: data.street,
      zip: data.zip,
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

  const handleSelectChange = (selectedValue: string) => {
    setValue('address', selectedValue);
  };

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
            <div className="grid grid-cols-3 gap-4">
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
                  placeholder="Enter your Suffix "
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
                    <SelectLabel>Areas</SelectLabel>
                    <>
                      {user.Community.address === "Bagbag" && (
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

                      {user.Community.address === "Nova Proper" && (
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

                      {user.Community.address === "Bagong Silangan" && (
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
                  placeholder="..."
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
                  placeholder="..."
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
