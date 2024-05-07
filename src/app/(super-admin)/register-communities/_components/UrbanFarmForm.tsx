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
    SelectItem,
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
import { Country } from "country-state-city";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

    let countryData = Country.getAllCountries();
    const [stateData, setStateData] = useState();
    const [cityData, setCityData] = useState();
    const [country, setCountry] = useState(countryData[173]);
    const [state, setState] = useState<StateType>();
    const [city, setCity] = useState<CityType>();
    const [district, setDistrict] = useState("");
    const { data: session } = useSession();
    const [formStep, setFormStep] = useState(1);

    const form = useForm<CreateCommunityType>({
        resolver: zodResolver(CreateCommunitySchema),
    });

    const router = useRouter();

    const [imageUrl, setImageUrl] = useState<string>("");

    const imageIsEmpty = imageUrl.length === 0;

    // const {} = useMutation({
    //   mutationFn: () => {},
    //   onError: (err) => {

    //   },
    //   onSuccess: (data) => {

    //   } 
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

    function onSubmit(values: CreateCommunityType) {
        // const payload: CreateCommunityType = {
        //   email: values.email,
        //   firstname: values.firstname,
        //   lastName: values.lastName,
        //   phone: values.phone,
        //   gender: values.gender,
        //   communityEmail: values.communityEmail,
        //   urbanFarmName: values.urbanFarmName,
        //   // barangayName: values.barangayName,
        //   communityAddress: values.communityAddress,
        //   communityDescription: values.communityDescription,
        //   communityDisplayPhoto: imageUrl,
        //   userPhone: values.userPhone,
        //   // communityImages: imageUrl,
        //   // password: values.password,
        //   // confirmPassword: values.confirmPassword,
        // };
        // // createEmployee(payload);
        // // console.log('Form submitted with values:', payload);
        // // console.log(payload)
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

                                <div className="grid grid-cols-1">
                                    <FormField
                                        control={form.control}
                                        name="urbanFarmName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Urban Farm Community Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Urbn" {...field} type="text" value={user?.barangay as string} disabled={true} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1">

                                </div>

                                <div className="grid grid-cols-1">
                                    <FormField
                                        control={form.control}
                                        name="communityEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Urban Farm Email</FormLabel>
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

                                <div className="grid grid-cols-1">
                                    <FormField
                                        control={form.control}
                                        name="communityAddress"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Urban Farm Address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Blk 6 Lt 7"
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
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Urban Farm Contact No.</FormLabel>
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

                                <Separator />

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

                                <div className="w-full">
                                    <Button
                                        type="submit"
                                        className="bg-[#4DE69E] hover:bg-[#bababa8f] w-full text-black"
                                    // isLoading={isLoading}
                                    // disabled={isLoading || imageIsEmpty}
                                    >
                                        Sign up
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </Card>
            </section>
        </div>
    );
};
