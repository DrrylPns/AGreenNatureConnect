"use client"
import { Products, columns } from './_components/columns'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { DataTable } from './_components/data-table'
import { fetchAllProducts, fetchProducts } from '../../../../actions/products'
import { Legend } from "@tremor/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/Ui/tabs'
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/Ui/popover"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Button } from '@/app/components/Ui/Button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/Ui/Dialog'

const InventoryPage = () => {
  const [date, setDate] = useState<DateRange | null>(null);
  // const { data: products, isFetching } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: async () => {
  //     const { data } = await axios.get("/api/employee/products")
  //     return data as Products[]
  //   }
  // })
  const {
    data: allProducts,
   
  } = useQuery({
      queryKey: ["allProducts"],
      queryFn: async () => (await fetchAllProducts()),
  })
  const {
    data: products,
  
  } = useQuery({
      queryKey: ["products", date],
      queryFn: async () => (await fetchProducts(date && date.from ? date.from : null, date?.to ? date?.to : null)),
  })


  return (

    <div className="container mx-auto py-10">
      <Tabs defaultValue="classA" className="w-full">
        <TabsList>
          <TabsTrigger value="allProducts">All Products</TabsTrigger>
          <TabsTrigger value="classA">Class A</TabsTrigger>
          <TabsTrigger value="classB">Class B</TabsTrigger>
          <TabsTrigger value="classC">Class C</TabsTrigger>
        </TabsList>
        <TabsContent value="allProducts">
         
          <DataTable
            //@ts-ignore
            columns={columns}
            //@ts-ignore
            data={allProducts ?? []}
            isInventory
          />
        </TabsContent>
        <TabsContent value="classA">
          <h1>*Top 1% to 20% based on their overall revenue</h1>
          <h1>*All products in this class is subject for 10% markup.</h1>
          <Popover>
          <PopoverTrigger asChild>
              <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                      "w-full md:w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                  )}
              >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                      date.to ? (
                          <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                          </>
                      ) : (
                          format(date.from, "LLL dd, y")
                      )
                  ) : (
                      <span>Pick a date</span>
                  )}
              </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
              {/* Replace Calendar with your @shadcn/ui Calendar component */}
              <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  //@ts-ignore
                  selected={date}
                  //@ts-ignore
                  onSelect={setDate}
                  numberOfMonths={2}
              />
          </PopoverContent>
          </Popover>
          <Dialog>
            <DialogTrigger>Generate Report</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <DataTable
            //@ts-ignore
            columns={columns}
            //@ts-ignore
            data={products?.categoryAProducts ?? []}
            isInventory
          />
        </TabsContent>
        <TabsContent value="classB">
          <DataTable
            //@ts-ignore
            columns={columns}
            //@ts-ignore
            data={products?.categoryBProducts ?? []}
            isInventory
          />
        </TabsContent>
        <TabsContent value="classC">
          <DataTable
            //@ts-ignore
            columns={columns}
            //@ts-ignore
            data={products?.categoryCProducts ?? []}
            isInventory
          />
        </TabsContent>
      </Tabs>
     
      
    </div>
  )
}

export default InventoryPage