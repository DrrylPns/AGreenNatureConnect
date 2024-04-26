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

export const SalesByBar = () => {

    const [filter, setFilter] = useState("currentYear")
    const [sales, setSales] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSalesByDate(filter);
                setSales(data);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        if (filter) {
            fetchData();
        }
    }, [filter]);

    return (
        <div className='h-full'>
            <div className='flex justify-between'>
                <Title>Sales Report</Title>
                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select a date" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Range</SelectLabel>
                            <SelectItem value="lastWeek">Last 7 days</SelectItem>
                            <SelectItem value="lastMonth">Current Month</SelectItem>
                            <SelectItem value="currentYear">Current Year</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {sales && (
                <BarChart
                    className="h-72 mt-4"
                    data={sales}
                    index="month"
                    categories={["Others", "Vegetables", "Fruits"]}
                    colors={["indigo", "gray", "lime"]}
                    yAxisWidth={30}
                />
            )}
        </div>
    )
}
