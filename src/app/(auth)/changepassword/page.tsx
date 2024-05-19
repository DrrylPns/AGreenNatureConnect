"use client";
import { toast } from "@/lib/hooks/use-toast";
import {
  ChangePasswordSchema,
  ChangePasswordType,
} from "@/lib/validations/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/app/components/Ui/label";
import { Input } from "@/app/components/Ui/Input";
import { Button } from "@/components/ui/button";

const changePassword = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { mutate: oldPasswordRequest, isLoading } = useMutation({
    mutationFn: async ({
      oldPassword,
      newPassword,
      confirmNewPassword,
    }: ChangePasswordType) => {
      const payload: ChangePasswordType = {
        oldPassword,
        newPassword,
        confirmNewPassword,
      };
      const { data } = await axios.post("api/user/editPass", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          return toast({
            title: "Request Failed",
            description: "Old Password is incorrect!",
            variant: "destructive",
          });
        }
      } else {
        return toast({
          title: "Error",
          description: "Something went wrong, please try again later!",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Updated account successfully!",
        variant: "default",
      });

      setTimeout(() => {
        router.push("/discussion");
      }, 1000);
    },
  });

  const Xbutton = () => {
    router.back();
  };

  const onSubmit: SubmitHandler<ChangePasswordType> = (
    data: ChangePasswordType
  ) => {
    if (data.oldPassword === data.newPassword) {
      return toast({
        title: "Invalid Action!",
        description: "New password must be different from the current password",
        variant: "destructive",
      });
    } else {
      const payload: ChangePasswordType = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      };

      oldPasswordRequest(payload);
    }
  };

  return (
    <main className="flex items-center justify-center border min-h-screen">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader className="flex items-start space-x-2">
          <Button
            className="h-8 w-8 p-1 rounded-full ml-auto"
            size="icon"
            variant="ghost"
            onClick={Xbutton}
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <div className="">
            <CardTitle className="text-2xl">Change Password</CardTitle>
            <CardDescription>
              Enter your current password and choose a new password
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="oldPassword"
                placeholder=""
                {...register("oldPassword")}
              />
              <p className="text-muted-foreground text-sm">
                Enter your old password
              </p>
            </div>
            {errors.oldPassword && (
              <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                {errors.oldPassword.message}
              </span>
            )}
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="newPassword"
                placeholder=""
                {...register("newPassword")}
                type="password"
              />
              <p className="text-muted-foreground text-sm">
                Password must contain at least one lowercase letter, one uppercase letter, and one special character.
              </p>
            </div>
            {errors.newPassword && (
              <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                {errors.newPassword.message}
              </span>
            )}
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirmNewPassword"
                placeholder=""
                {...register("confirmNewPassword")}
                type="password"
              />
            </div>
            {errors.confirmNewPassword && (
              <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                {errors.confirmNewPassword.message}
              </span>
            )}
            <Button className="w-full mt-8 bg-[#099073] dark:text-white">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default changePassword;

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
