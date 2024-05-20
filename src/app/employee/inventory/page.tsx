"use client"
import { Products, columns } from './_components/columns'
import { columns as ReportCol } from './_components/reports/columns'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { DataTable } from './_components/data-table'
import { DataTable as ReportDT } from './_components/reports/data-table'
import { fetchAllProducts, fetchProducts } from '../../../../actions/products'
import { Legend } from "@tremor/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/Ui/tabs'
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/Ui/popover"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { cn, formatDate, formatDateWithTime } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Button } from '@/app/components/Ui/Button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/Ui/Dialog'
import { TbReportAnalytics } from 'react-icons/tb'
import { useTotalSalesValueStore } from '@/lib/hooks/useCalculatedRevenue'
import { useSaleValue } from '@/contexts/TotalSaleContext'
import { useSession } from 'next-auth/react'

const InventoryPage = () => {
  const [date, setDate] = useState<DateRange>();
  const { totalSalesValue } = useTotalSalesValueStore.getState();
  const session  = useSession()
  const { totalSale,
    setTotalSale,
    totalSalectedCatA,
    setTotalSalectedCatA,
    totalSalectedCatB,
    setTotalSalectedCatB,
    totalSalectedCatC,
    setTotalSalectedCatC,
    revPercentage
  } = useSaleValue();
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
      queryKey: ["allProducts",date],
      queryFn: async () => (await fetchAllProducts(date && date.from ? date.from : null, date?.to ? date?.to : null)),
  })
  const {
    data: products,

  } = useQuery({
    queryKey: ["products", date],
    queryFn: async () => (await fetchProducts(date && date.from ? date.from : null, date?.to ? date?.to : null)),
  })

  useEffect(()=>{
    if(allProducts?.modifiedProducts){
      setTotalSale(products?.sum || 0)
    }
    setTotalSalectedCatA(products?.sumCatA || 0)
    setTotalSalectedCatB(products?.sumCatB || 0)
    setTotalSalectedCatC(products?.sumCatC || 0)
  }, [products, allProducts, date])

  return (

    <div className="container mx-auto py-10">
      <Tabs defaultValue="classA" className="w-full">
        <TabsList>
          <TabsTrigger value="allProducts">All Products</TabsTrigger>
          <TabsTrigger value="classA">Top Performers</TabsTrigger>
          <TabsTrigger value="classB">Moderate Performers</TabsTrigger>
          <TabsTrigger value="classC" className='border-x-1 border-gray-300'>Least Performers</TabsTrigger>
        </TabsList>
        <TabsContent value="allProducts">
        <div className=' flex justify-between items-center w-full'>
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
            <Button variant={'outline'}>
            <DialogTrigger className='flex gap-3 py-2 px-2 text-xl'>                            
              Generate Report
              <TbReportAnalytics />
            </DialogTrigger>
            </Button>
            <DialogContent className=' max-w-full'>
              <DialogHeader>
                <DialogTitle>
                  <div>
                    <h1>Generated By:{session.data?.user.username} </h1>
                    <h1>{formatDateWithTime(new Date())} </h1>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  {date === undefined ? (
                    <h1>All time</h1>
                  ):(
                    <h1>From: {date?.from ? formatDate(date.from) : 'None'} To: {date?.to ? formatDate(date.to) : 'None'}</h1>
                  )}
                  <ReportDT
                    //@ts-ignore
                    columns={ReportCol}
                    isAllProduct={true}
                    sum={allProducts?.sum}
                    //@ts-ignore
                    data={allProducts?.modifiedProducts ?? []}
                    isInventory
                  />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          </div>
          <DataTable
            //@ts-ignore
            columns={columns}
            //@ts-ignore
            data={allProducts?.modifiedProducts ?? []}
            isInventory
          />
        </TabsContent>
        <TabsContent value="classA">
          <div className=' flex justify-between items-center w-full'>
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
            <Button variant={'outline'}>
              <DialogTrigger className='flex gap-3 py-2 px-2 text-xl'>                            
                Generate Report
                <TbReportAnalytics />
              </DialogTrigger>
            </Button>
            <DialogContent className='max-w-full'>
              <DialogHeader>
              <DialogTitle>
                  <div>
                    <h1>Generated By:{session.data?.user.username} </h1>
                    <h1>{formatDateWithTime(new Date())} </h1>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  {date === undefined ? (
                    <h1>All time</h1>
                  ):(
                    <h1>From: {date?.from ? formatDate(date.from) : 'None'} To: {date?.to ? formatDate(date.to) : 'None'}</h1>
                  )}
                  <ReportDT
                    //@ts-ignore
                    columns={ReportCol}
                    isCatA={true}
                    salesRevPercentageCatA={products?.salesRevPercentageCatA}
                    totalSalectedCatA={totalSalectedCatA}
                    //@ts-ignore
                    data={products?.categoryAProducts ?? []}
                    isInventory
                  />
                    
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          </div>

          <DataTable
            //@ts-ignore
            columns={columns}
            //@ts-ignore
            data={products?.categoryAProducts ?? []}
            isInventory
          />

        </TabsContent>
        <TabsContent value="classB">
          <div className=' flex justify-between items-center w-full'>
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
            <Button variant={'outline'}>
              <DialogTrigger className='flex gap-3 py-2 px-2 text-xl'>                            
                Generate Report
                <TbReportAnalytics />
          
            </DialogTrigger>
            </Button>
            <DialogContent className='max-w-full'>
              <DialogHeader>
              <DialogTitle>
                  <div>
                    <h1>Generated By:{session.data?.user.username} </h1>
                    <h1>{formatDateWithTime(new Date())} </h1>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <div>
                  {date === undefined ? (
                    <h1>All time</h1>
                  ):(
                    <h1>From: {date?.from ? formatDate(date.from) : 'None'} To: {date?.to ? formatDate(date.to) : 'None'}</h1>
                  )}
                    <ReportDT
                      //@ts-ignore
                      columns={ReportCol}
                      isCatB={true}
                      salesRevPercentageCatB={products?.salesRevPercentageCatB}
                      totalSalectedCatB={totalSalectedCatB}
                      //@ts-ignore
                      data={products?.categoryBProducts ?? []}
                      isInventory
                    />
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          </div>

          <DataTable
            //@ts-ignore
            columns={columns}
            //@ts-ignore
            data={products?.categoryBProducts ?? []}
            isInventory
          />
        </TabsContent>
        <TabsContent value="classC">
          <div className=' flex justify-between items-center w-full'>
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
              <DialogTrigger className='flex gap-3 py-2 px-2 text-xl bg-white rounded-xl items-center'>

                Generate Report
                <TbReportAnalytics />

              </DialogTrigger>
              <DialogContent className=' max-w-full'>
                <DialogHeader>
                <DialogTitle>
                  <div>
                    <h1>Generated By:{session.data?.user.username} </h1>
                    <h1>{formatDateWithTime(new Date())} </h1>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <div>
                  {date === undefined ? (
                    <h1>All time</h1>
                  ):(
                    <h1>From: {date?.from ? formatDate(date.from) : 'None'} To: {date?.to ? formatDate(date.to) : 'None'}</h1>
                  )}
                      <ReportDT
                        //@ts-ignore
                        columns={ReportCol}
                        isCatC={true}
                        salesRevPercentageCatC={products?.salesRevPercentageCatC}
                        totalSalectedCatC={totalSalectedCatC}
                        //@ts-ignore
                        data={products?.categoryCProducts ?? []}
                        isInventory
                      />
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

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