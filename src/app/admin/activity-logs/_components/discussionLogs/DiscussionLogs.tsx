import React from 'react'
import { DataTable } from '../DataTable'
import { columns } from './column'
import { employeeActivityHistoryWithTransaction } from '@/lib/types'

function DiscussionLogs({
    discussionLogs
}:{
    discussionLogs: employeeActivityHistoryWithTransaction
}) {
  return (
    <div className="">
    <DataTable 
        columns={columns} 
        //@ts-ignore
        data={discussionLogs} />
    </div>
  )
}

export default DiscussionLogs