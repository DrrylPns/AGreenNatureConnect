"use client"

import React from 'react'
import { Input } from "@/app/components/Ui/Input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/Ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/app/components/Ui/Button';


export const AccountSettings = () => {
    const form = useForm({
        // resolver: zodResolver(),
    });

    // const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    const onSubmit = (values: any) => {
        // setError("");
        // setSuccess("");

        // startTransition(() => {
        //     register(values)
        //         .then((data) => {
        //             setError(data.error);
        //             setSuccess(data.success);
        //         });
        // });
    };

    return (
        <div>
            
        </div>
    )
}
