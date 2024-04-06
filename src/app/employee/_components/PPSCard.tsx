"use client"
import { Card, DonutChart, Legend, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import { fetchSalesByCategories } from "../../../../actions/sales";

const PPSCard = () => {
    const [sales, setSales] = useState() as any
    // ps hardcoded muna

    // const products = [
    //     {
    //         category: "Fruits",
    //         sales: 9800,
    //     },
    //     {
    //         category: "Vegetables",
    //         sales: 4567,
    //     },
    // ];

    const [value, setValue] = useState(null);

    useEffect(() => {
        fetchSalesPieChart()
    }, [])

    const fetchSalesPieChart = async () => {
        const sales = await fetchSalesByCategories()
        setSales(sales)
    }

    console.log(sales)

    return (
        <>
            <Card className="">
                <Title className="mt-4 mb-4">Product Sale Summary</Title>
                <DonutChart
                    className="mt-10"
                    data={sales}
                    category="sales"
                    index="category"
                    colors={["indigo", "gray", "lime"]}
                    // valueFormatter={valueFormatter}
                    onValueChange={(v) => setValue(v)}
                />
                {/* <span>{formattedValue}</span>; */}

                <Legend
                    className="mt-3 flex flex-col"
                    categories={["Others", "Vegetables", "Fruits"]}
                    colors={["indigo", "gray", "lime"]}
                />

            </Card>
            {/* <pre>{JSON.stringify(value)}</pre> */}
            {/* TO VISUALIZE THE DATA USE THIS ^ */}
        </>

    )
}

export default PPSCard