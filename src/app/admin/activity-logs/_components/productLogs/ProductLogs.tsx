import React from 'react'
import { DataTable } from '../DataTable'
import { columns } from './column'
import { employeeActivityHistoryWithTransaction } from '@/lib/types'

function ProductLogs({
    productLogs
}:{
    productLogs: employeeActivityHistoryWithTransaction
}) {
  return (
    <div className="">
    <DataTable 
        columns={columns} 
        //@ts-ignore
        data={productLogs} />
    </div>
  )
}

export default ProductLogs