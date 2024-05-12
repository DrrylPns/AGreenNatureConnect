"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/Ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { CompletedTransaction } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, FileUp } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { salesReport } from "../../../../actions/sales";
import { DataTable } from "../inventory/_components/data-table";
import { ColumnSalesReport } from "./ColumnSalesReport";

export const SalesReportTable = () => {
    const [date, setDate] = useState<DateRange | undefined>(undefined);
    const [sales, setSales] = useState<CompletedTransaction[]>([])
    const [totalSalesAmount, setTotalSalesAmount] = useState<number>(0);
    const [totalProductsSold, setTotalProductsSold] = useState<number>(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let startDate: Date | undefined;
                let endDate: Date | undefined;

                if (date && date.from && date.to) {
                    startDate = date.from;
                    endDate = new Date(date.to)

                    endDate.setHours(23, 59, 59, 999)
                } else {
                    // Default to current year if date range not selected
                    const today = new Date();
                    startDate = new Date(today.getFullYear(), 0, 1); // Start date is first day of current year
                    endDate = new Date(today.getFullYear(), 11, 31); // End date is last day of current year
                }

                const { salesData, totalSalesAmount, totalProductsSold } = await salesReport(startDate, endDate);
                setSales(salesData as CompletedTransaction[]);
                setTotalSalesAmount(totalSalesAmount);
                setTotalProductsSold(totalProductsSold);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchData();
    }, [date]);

    function handlePrint() {
        const card = document.querySelector('.print-card');
        if (card) {
            card.classList.add('print-visible'); // Add a class to make the card visible for printing
            window.print(); // Trigger printing
            card.classList.remove('print-visible'); // Remove the class after printing
        } else {
            console.error('Card element not found.');
        }
    }

    // function getSoldProductsSummary(sales: CompletedTransaction[]) {
    //     const summaryMap: { [productName: string]: number } = {};

    //     sales.forEach((transaction) => {
    //         transaction.orderedProducts.forEach((orderedProduct) => {
    //             const { name, quantity } = orderedProduct.product;

    //             if (summaryMap[name]) {
    //                 summaryMap[name] += orderedProduct.quantity; // Accumulate the quantity sold
    //             } else {
    //                 summaryMap[name] = orderedProduct.quantity;
    //             }
    //         });
    //     });

    //     return summaryMap;
    // }

    const groupSoldProductsByCategory = (sales: CompletedTransaction[]) => {
        const productsByCategory: { [key: string]: { [key: string]: { quantity: number; totalSales: number } } } = {};

        sales.forEach((transaction) => {
            transaction.orderedProducts.forEach((orderedProduct) => {
                const { name, category } = orderedProduct.product;
                const { quantity, priceInKg } = orderedProduct;
                const totalSales = quantity * priceInKg; // Calculate total sales amount for this product

                if (!productsByCategory[category]) {
                    productsByCategory[category] = {};
                }

                if (!productsByCategory[category][name]) {
                    productsByCategory[category][name] = { quantity: 0, totalSales: 0 };
                }

                productsByCategory[category][name].quantity += quantity;
                productsByCategory[category][name].totalSales += totalSales;
            });
        });

        return productsByCategory;
    };

    // Group sold products by category and calculate total sales amount for each product
    const soldProductsByCategory = groupSoldProductsByCategory(sales);


    return (
        <div className="space-y-3">
            <div className="w-full flex justify-between print-card">
                <h1>Select a date range to generate the report:</h1>
                <div
                    className={cn(
                        buttonVariants({
                            variant: "outline"
                        }),
                        "cursor-pointer flex flex-row"
                    )}
                    onClick={handlePrint}
                >

                    <FileUp className="mr-2" strokeWidth={1} />
                    Generate Report
                    {/* Make this generate report work where it can be a printed data report */}
                </div>
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full md:w-full justify-start text-left font-normal print-card",
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
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>

            <Card className="mx-auto max-w-full h-full drop-shadow-lg p-3 ">
                <div className="text-xl font-semibold flex flex-row gap-2 mb-2">
                    <h1>Date Report:</h1>
                    {date && date.from && date.to ? (
                        <p>
                            {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                        </p>
                    ) : (
                        <p>This report includes the overall summary of data.</p>
                    )}
                </div>

                <div className="flex justify-between mb-4">
                    <div>
                        <h2>Total Sales Amount: {formatPrice(totalSalesAmount)}</h2>
                        <h2>Total Products Sold: {totalProductsSold.toLocaleString()}</h2>
                    </div>
                </div>

                <div>
                    <h2 className="font-bold text-xl">Sold Products Summary</h2>
                    {Object.entries(soldProductsByCategory).map(([category, products]) => (
                        <div key={category}>
                            <h3 className="text-lg font-medium">{category}:</h3>
                            <ul className="text-muted-foreground">
                                {Object.entries(products).map(([name, { quantity, totalSales }]) => (
                                    <li key={name}>
                                        {name}: {quantity} kg (Total Sale: {formatPrice(totalSales)})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <DataTable
                    columns={ColumnSalesReport}
                    data={sales ?? []}
                    isSalesReport
                />
            </Card>
        </div>
    )
}
