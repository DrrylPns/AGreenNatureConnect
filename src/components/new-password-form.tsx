"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { CardWrapper } from "@/components/card-wrapper";
import { newPassword } from "../../actions/new-password";
import { useSearchParams } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/Ui/form";
import { Input } from "@/app/components/Ui/Input";
import { Button } from "@/app/components/Ui/Button";
import { NewPasswordSchema, NewPasswordType } from "@/lib/validations/changePasswordSchema";

export const NewPasswordForm = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();



    const form = useForm<NewPasswordType>({
        resolver: zodResolver(NewPasswordSchema),
    });

    const onSubmit = (values: NewPasswordType) => {
        setError("");
        setSuccess("");


        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                });
        });
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <CardWrapper
                headerLabel="Enter a new password"
                backButtonLabel="Back to login"
                backButtonHref="/discussion"
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="******"
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormDescription>Password must contain at least one lowercase letter, one uppercase letter, and one special character.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="******"
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormDescription>Password must contain at least one lowercase letter, one uppercase letter, and one special character.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                            variant="newGreen"
                        >
                            Reset password
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    );
};