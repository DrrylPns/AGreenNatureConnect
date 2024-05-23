"use server"

import prisma from "@/lib/db/db";
import { CartwithProduct, ProductVariant, ResultItem, listItemsTypes } from "@/lib/types";

export const createCheckOutSession = async (checkOutItems: ResultItem[], transactions:any[])=>{
    const listItems:listItemsTypes[] = []
    
    checkOutItems.forEach((item)=>{
        item.products.map((product)=>{
            const centavos = Math.round(product.totalPrice * 100);
            const amount = Number(centavos) / product.kilograms

            listItems.push({ amount: amount, currency: 'PHP', name: product.name, quantity: product.kilograms})
        })
    })
    console.log(listItems)   
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: 'Basic c2tfdGVzdF9YZDhHb1pxNEh6QVp2ZEFKb0Jub1o3MUM6'
            },
            body: JSON.stringify({
              data: {
                attributes: {
                  payment_method_types: ['gcash'],
                  line_items: listItems,
                  send_email_receipt: true,
                  success_url: 'https://www.agreennatureconnect.online/order-status',
                  reference_number: 'a',
                  statement_descriptor: 'Urban Farm name',
                  description: 'check out',
                  cancel_url: 'https://www.agreennatureconnect.online/order-status'
                }
              }
            })
          };
           
        try {
            const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', options);
            const data = await response.json();
            for (const transaction of transactions){
                await prisma.transaction.update({
                    where:{
                        id: transaction.id
                    },
                    data:{
                        checkOutSessionId: data.data.id
                    }
                })
            }
        } catch (err) {
            return { error: err };
        }  
}

export const retrieveCheckOutSession = async(transactions: any[])=>{
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: 'Basic c2tfdGVzdF9YZDhHb1pxNEh6QVp2ZEFKb0Jub1o3MUM6'
        }
    };

  
            
    for (const transaction of transactions){
      
        const existingTransaction = await prisma.transaction.findFirst({
            where:{
                id: transaction.id
            }
        })
        console.log(existingTransaction)
        if(!existingTransaction){
            return {error: "No transaction found!"}
        }
    
        if(existingTransaction.checkOutSessionId === null){
            return {error: "Checkout Session id is null"}
        }
        const response = await fetch(`https://api.paymongo.com/v1/checkout_sessions/${existingTransaction.checkOutSessionId}`, options);
        const data = await response.json();
        return data.data.attributes.checkout_url

        // try {
        //     const response = await fetch(`https://api.paymongo.com/v1/checkout_sessions/${transaction.checkOutSessionId}`, options);
        //     const data = await response.json();
        //     console.log(data)
        // } catch (err) {
        //     return { error: err };
        // }
    }
   

    

  
   
}