'use client'
import OrderTab from "../components/OrderTab";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function page() {

    const {data: Pending} = useQuery({
        queryKey: ['pending'],
        queryFn: async() =>{
            const res = await axios.get(`/api/markethub/transaction/pending`)

            return res.data
        }
    })
    const {data: Approved} = useQuery({
        queryKey: ['pending'],
        queryFn: async() =>{
            const res = await axios.get(`/api/markethub/transaction/approved`)

            return res.data
        }
    })
    const {data: Pickup} = useQuery({
        queryKey: ['pending'],
        queryFn: async() =>{
            const res = await axios.get(`/api/markethub/transaction/pickUp`)

            return res.data
        }
    })
    const {data: Cancelled} = useQuery({
        queryKey: ['pending'],
        queryFn: async() =>{
            const res = await axios.get(`/api/markethub/transaction/cancelled`)

            return res.data
        }
    })
    const {data: Completed} = useQuery({
        queryKey: ['pending'],
        queryFn: async() =>{
            const res = await axios.get(`/api/markethub/transaction/completed`)

            return res.data
        }
    })
  return (
     <div>
     {Pending === undefined && Approved === undefined && Pickup === undefined && Completed === undefined && Cancelled === undefined ? (
        <></>
     ):(
        <OrderTab 
            pending={Pending} 
            approved={Approved} 
            pickup={Pickup} 
            cancelled={Cancelled}
            completed={Completed}
        />
     )}
        
     </div>
  )
}

export default page