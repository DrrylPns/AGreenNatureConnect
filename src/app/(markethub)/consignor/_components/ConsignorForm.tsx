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
import { Community, ConsignorApplicants, User } from "@prisma/client";
import { Card } from "@tremor/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createConsignorRequest, createPasabuy, fetchUrbanFarms } from "../../../../../actions/community";
import { useMutation } from "@tanstack/react-query";
import { ConsignorSchema, ConsignorType, PasabuySchema, PasabuyType } from "@/lib/validations/pasabuy";
import { Textarea } from "@/app/components/Ui/textarea";

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

export const ConsignorForm = ({ user }: Props) => {
  const [area, setArea] = useState("");
  const [formStep, setFormStep] = useState(1);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [formUrl, setFormUrl] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [selectFarm, setSelectFarm] = useState<string>('')
  const [farm, setFarm] = useState<Community[]>([])

  const form = useForm<ConsignorType>({
    resolver: zodResolver(ConsignorSchema),
    defaultValues:{
      
      
    }
  });

  const router = useRouter();

  const imageIsEmpty = imageUrl.length === 0;
  const formUrlIsEmpty = formUrl.length === 0;
  const areaIsEmpty = area.length === 0;
  useEffect(()=>{
    urbanFarms()
  },[])

  const urbanFarms = async()=>{
    console.log(user.barangay)
    const farms = await fetchUrbanFarms(user.barangay || "")
    setFarm(farms)

  }
  function onSubmit(values: ConsignorType) {
    startTransition(() => {

      createConsignorRequest(values).then((callback) => {
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
          router.replace(`/markethub`)
        }
      });
    });
  }
  
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#E3E1E1]">
      <section className="flex items-center justify-center p-11 rounded-3xl">
        <Card className="w-full">
          <div className="w-full h-full">
            <div className="w-full flex justify-center items-center">
              <h1 className="font-bold text-lg mb-6">Consignor Request Form</h1>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full"
              >
               
                    <div className="grid grid-cols-1">
                      <FormField
                        control={form.control}
                        name="urbanFarmId"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel>Urban Farm Name</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Urban Farm" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {farm.map((farm)=>(
                                  <SelectItem value={farm.id}>{farm.name}</SelectItem>
                                ))}
                               
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1">
                      <FormField
                        control={form.control}
                        name="products"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Products you want to sell</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Product 1, Product 2 ..."
                                {...field}
                                type="text"
                                
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
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Descript how you often you get your products"
                                className="resize-none"
                                {...field}
                              />
                      
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                  <Button
                      type="submit"
                      className="bg-[#4DE69E] hover:bg-[#bababa8f] w-full text-black"
                      isLoading={isPending}
                      disabled={isPending}
                    >
                      Submit
                    </Button>
              </form>
            </Form>
          </div>
        </Card>
      </section>
    </div>
  );
};
