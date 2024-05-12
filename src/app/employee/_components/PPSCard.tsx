"use client"
import { Card, DateRangePicker, DonutChart, Legend, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import { fetchSalesByCategories } from "../../../../actions/sales";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/Ui/popover";
import { Button } from "@/app/components/Ui/Button";
import { CalendarIcon } from "lucide-react";

const PPSCard = () => {
    const [sales, setSales] = useState() as any;
    const [value, setValue] = useState(null);

    const [date, setDate] = useState<DateRange | undefined>(undefined);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (date && date.from && date.to) {

    //             let startDate: Date | undefined;
    //             let endDate: Date | undefined;

    //             startDate = date.from
    //             endDate = new Date(date.to)

    //             endDate.setHours(23, 59, 59, 999)

    //             const sales = await fetchSalesByCategories(startDate, endDate);
    //             setSales(sales);
    //         }
    //     }

    //     fetchData();
    // }, [date]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let startDate: Date | undefined;
                let endDate: Date | undefined;

                if (date && date.from && date.to) {
                    startDate = date.from;
                    endDate = new Date(date.to);

                    endDate.setHours(23, 59, 59, 999)
                } else {
                    // Default to current year if date range not selected
                    const today = new Date();
                    startDate = new Date(today.getFullYear(), 0, 1); // Start date is first day of current year
                    endDate = new Date(today.getFullYear(), 11, 31); // End date is last day of current year
                }

                const sales = await fetchSalesByCategories(startDate, endDate);
                setSales(sales);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchData();
    }, [date]);

    return (
        <>
            <Card className="">
                <div className="flex flex-col md:flex-col gap-3">
                    <Title className="mt-4 mb-4">Total Sales Summary</Title>

                    <div className={cn("grid gap-2")}>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                        "w-full md:w-[200px] justify-start text-left font-normal",
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

                <DonutChart
                    className="mt-10"
                    data={sales}
                    category="sales"
                    index="category"
                    colors={["gray", "indigo", "lime"]}
                    onValueChange={(v) => setValue(v)}
                />

                {/* <Legend
                    className="mt-3 flex flex-col"
                    categories={["Others", "Vegetables", "Fruits"]}
                    colors={["indigo", "gray", "lime"]}
                /> */}
            </Card >
        </>
    );
};

export default PPSCard;