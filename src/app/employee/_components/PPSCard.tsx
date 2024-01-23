"use client"
import { useQuery } from "@tanstack/react-query";
import { BarList, Bold, Card, DonutChart, Flex, Legend, Text, Title } from "@tremor/react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const PPSCard = () => {

    // ps hardcoded muna

    const products = [
        {
            category: "Fruits",
            sales: 9800,
        },
        {
            category: "Vegetables",
            sales: 4567,
        },
    ];

    const [value, setValue] = useState(null);

    // @ts-ignore
    // const valueFormatter = ({ number }: { number: number }) => {
    //     const formattedValue = new Intl.NumberFormat('en-PH', {
    //         style: 'currency',
    //         currency: 'PHP',
    //     }).format(number);

    return (
        <>
            <Card className="">
                <Title className="mt-4 mb-4">Product Sale Summary</Title>
                <DonutChart
                    className="mt-10"
                    data={products}
                    category="sales"
                    index="category"
                    colors={["teal", "indigo"]}
                    // valueFormatter={valueFormatter}
                    onValueChange={(v) => setValue(v)}
                />
                {/* <span>{formattedValue}</span>; */}

                <Legend
                    className="mt-3 flex flex-col"
                    categories={["Fruits", "Vegetables"]}
                    colors={["teal", "indigo"]}
                />

            </Card>
            {/* <pre>{JSON.stringify(value)}</pre> */}
            {/* TO VISUALIZE THE DATA USE THIS ^ */}
        </>

    )
}

export default PPSCard