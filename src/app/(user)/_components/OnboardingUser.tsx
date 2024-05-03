"use client";
import { toast } from "@/lib/hooks/use-toast";
import { getMinBirthDate } from "@/lib/utils";
import {
  OnboardingUserSchema,
  OnboardingUserType,
} from "@/lib/validations/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";
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

export const OnboardingUser = () => {
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
      birthday,
      address,
      lastName,
      name,
    }: OnboardingUserType) => {
      const payload: OnboardingUserType = {
        username,
        phoneNumber,
        birthday,
        address,
        lastName,
        name,
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
      birthday: data.birthday,
      address: data.address,
      lastName: data.lastName,
      name: data.name,
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
                      charCode !== 8 &&
                      charCode !== 9 &&
                      charCode !== 0
                    ) {
                      event.preventDefault();
                    }
                  }}
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
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register("address")}
                placeholder="Enter your address"
              />
            </div>
            {errors.address && (
              <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                {errors.address.message}
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
