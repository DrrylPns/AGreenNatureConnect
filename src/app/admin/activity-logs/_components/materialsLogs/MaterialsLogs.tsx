import React from 'react'
import { DataTable } from '../DataTable'
import { columns } from './column'
import { employeeActivityHistoryWithTransaction } from '@/lib/types'

function MaterialsLogs({
    materialsLogs
}:{
    materialsLogs: employeeActivityHistoryWithTransaction
}) {
  return (
    <div className="">
    <DataTable 
        columns={columns} 
        //@ts-ignore
        data={materialsLogs} />
    </div>
  )
}

export default MaterialsLogs