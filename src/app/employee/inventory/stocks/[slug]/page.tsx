import React from 'react'

import { fetchStocks } from '../../../../../../actions/products'
import { columns } from '../../_components/stocks/column'
import { DataTable } from '../../_components/stocks/DataTable'



async function Stocks({
  params
}: {
  params: {
    slug: string
  }
}) {

  const stocks = await fetchStocks(params.slug)
  return (
    <div className="">
      <DataTable
        //@ts-ignore
        columns={columns}
        //@ts-ignore
        data={stocks} />
    </div>
  )
}

export default Stocks