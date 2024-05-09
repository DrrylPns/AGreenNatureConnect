import React from 'react'
import { DataTable } from '../DataTable'
import { columns } from './column'
import { StocksWitProducts, employeeActivityHistoryWithTransaction } from '@/lib/types'

function Stocks({
    stockLogs
}:{
  stockLogs: StocksWitProducts[]
}) {
  return (
    <div className="">
    <DataTable 
        columns={columns} 
        //@ts-ignore
        data={stockLogs} />
    </div>
  )
}

export default Stocks