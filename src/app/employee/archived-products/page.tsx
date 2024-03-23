import { fetchArchivedProducts } from "../../../../actions/products"
import { DataTable } from "../inventory/_components/data-table"
import { columns } from "./_components/columns"


const page = async () => {

    const products = await fetchArchivedProducts()

    if (!products) return <>No Product Found.</>

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-xl font-semibold">Archived Products</h1>
            <DataTable
                columns={columns}
                //@ts-ignore
                data={products}
                isArchived
            />
        </div>
    )
}

export default page