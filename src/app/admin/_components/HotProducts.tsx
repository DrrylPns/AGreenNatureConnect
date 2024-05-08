"use client"
import { ProductWithOrderdProducts, ProductWithOrderedVariant } from '@/lib/types'
import Image from 'next/image'
import { Button } from "@/app/components/Ui/Button";
import { formatDate } from "@/lib/utils";
import { Community, User } from "@prisma/client";
import { Card, MultiSelect, MultiSelectItem, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'
import { useState } from "react";

interface Props {
    products: ProductWithOrderdProducts[]
}

export const HotProducts = ({ products }: Props) => {
    return (
        <Card className="mt-5 h-[620px]">
            <Table className="h-[600px]">
                <TableHead className="bg-gray-200">
                    <TableRow>
                        <TableHeaderCell className="text-black">Image</TableHeaderCell>
                        <TableHeaderCell className="text-black">Product Name</TableHeaderCell>
                        <TableHeaderCell className="text-black">Sold</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products
                        .map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <div className='w-20 h-20'>
                                        <Image alt={product.name} src={product.productImage} width={100} height={100} className='object-contain w-full h-full' />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Text>{product.name}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{product.orderedProducts.length}</Text>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </Card>
    )
}
