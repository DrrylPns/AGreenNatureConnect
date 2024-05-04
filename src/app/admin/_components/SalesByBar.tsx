"use client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/app/components/Ui/select"
import { BarChart, Title } from '@tremor/react'
import { useEffect, useState } from "react"
import { fetchSalesByDate } from "../../../../actions/sales"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/Ui/popover"
import { Button } from "@/app/components/Ui/Button"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"

export const SalesByBar = () => {
    const [date, setDate] = useState<DateRange | null>(null);

    const [sales, setSales] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let startDate: Date | undefined;
                let endDate: Date | undefined;

                if (date && date.from && date.to) {
                    startDate = date.from;
                    endDate = date.to;
                } else {
                    // Default to current year if date range not selected
                    const today = new Date();
                    startDate = new Date(today.getFullYear(), 0, 1); // Start date is first day of current year
                    endDate = new Date(today.getFullYear(), 11, 31); // End date is last day of current year
                }

                const data = await fetchSalesByDate(startDate, endDate);
                setSales(data);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchData();
    }, [date]);

    return (
        <div className="h-full">
            <div className="flex justify-between">
                <Title>Sales Report</Title>
                <div className={cn("grid gap-2")}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-[300px] justify-start text-left font-normal",
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
                </div>
            </div>

            {sales && (
                <BarChart
                    className="h-72 mt-4"
                    data={sales}
                    index="date"
                    categories={["Others", "Vegetables", "Fruits"]}
                    colors={["indigo", "gray", "lime"]}
                    yAxisWidth={30}
                    allowDecimals={false}
                />
            )}
        </div>
    );
};