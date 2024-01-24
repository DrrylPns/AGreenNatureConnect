"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { notFound, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/Ui/form"
import { Input } from '@/app/components/Ui/Input'
import { Button } from '@/app/components/Ui/Button'
import { Product } from '@prisma/client'
import { UpdateProductSchema, UpdateProductType } from '@/lib/validations/employee/products'
import { toast } from '@/lib/hooks/use-toast'

interface UpdateProductProps {
  product: Product | null
}

export const UpdateProduct: React.FC<UpdateProductProps> = ({ product }) => {

  // console.log(product)

  if (product === null) return notFound()

  const router = useRouter()

  const form = useForm<UpdateProductType>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      id: product.id,
      // itemNumber: product.itemNumber as number,
      name: product.name,
      price: Number(product.price),
      // kilo: product.kilo,
    }
  })

  const { mutate: updateProduct, isLoading } = useMutation({
    mutationFn: async ({
      id,
      // kilo,
      name,
      price
    }: UpdateProductType) => {
      const payload: UpdateProductType = {
        id: product.id,
        // kilo,
        name,
        price,
      }

      const { data } = await axios.put("/api/employee/products", payload)
      console.log(data)
      return data
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          toast({
            title: "Error",
            description: "Unauthorized",
            variant: "destructive",
          })
        }

        if (err.response?.status === 402) {
          toast({
            title: 'Invalid Action',
            description: "Please put a valid price!",
            variant: 'destructive',
          })
        }

        if (err.response?.status === 403) {
          toast({
            title: 'Invalid Action',
            description: "Please put a valid weight!",
            variant: 'destructive',
          })
        }
      } else {
        return toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        })
      }

    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: "You have updated the product!",
        variant: "default",
      })
      router.push("/employee/inventory")
    }
  })

  function onSubmit(values: UpdateProductType) {
    const payload: UpdateProductType = {
      id: product?.id,
      // kilo: values.kilo,
      name: values.name,
      price: values.price,
    }

    // console.log(payload)
    updateProduct(payload)
  }


  return (
    <div className='border-t mt-5'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">

          <FormField
            control={form.control}
            name="id"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item ID:</FormLabel>
                <FormControl>
                  <Input placeholder="product id" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="itemNumber"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item No.</FormLabel>
                <FormControl>
                  <Input placeholder="Item Number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product Name" {...field} />
                  {/* <Input placeholder={`${product.id}`} {...field} /> */}
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (PHP)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your price" {...field} type='number' />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="kilo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kilo (kg)</FormLabel>
                <FormControl>
                  <Input placeholder="Kilo" {...field} type='number' />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Submit</Button>
        </form>
      </Form>
    </div>
  )
}
