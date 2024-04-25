"use client"

import { Button } from "@/app/components/Ui/Button";
import { buttonVariants } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Community, User } from "@prisma/client";
import { Card, MultiSelect, MultiSelectItem, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text } from '@tremor/react';
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
interface SearchEmployeesProps {
    // employees: Array<User & { Community: Community | null }>;
    communities: Array<Community>
}

const SearchCommunities: React.FC<SearchEmployeesProps> = ({
    communities
}) => {
    const [selectedNames, setSelectedNames] = useState<string[]>([]);

    const isEmployeeSelected = (community: Community) =>
        selectedNames.length === 0 || selectedNames.includes(community.name || "");

    const handleValueChange = (value: string | string[]) => {
        const names = Array.isArray(value) ? value : [value];
        setSelectedNames(names);
    };
 
    return (
        <>
            <div className="flex justify-between space-x-2 mt-2">
                <MultiSelect
                    className="max-w-full sm:max-w-xs"
                    onValueChange={handleValueChange}
                    placeholder="Search Employees..."
                >
                    {communities.map((community) => (
                        <MultiSelectItem key={community.id} value={community.name || ""}>
                            {community.name}
                        </MultiSelectItem>
                    ))}
                </MultiSelect>

                <Link className={buttonVariants({
                    variant: "outline"
                })}
                    href="/register-communities"
                >
                    <Plus className="mr-2" strokeWidth={1} /> New
                </Link>
            </div>

            <Card className="mt-5 w-full">
                <Table className="w-full">
                    <TableHead className="bg-gray-200">
                        <TableRow>
                            <TableHeaderCell className="text-black">Name</TableHeaderCell>
                            <TableHeaderCell className="text-black">Address</TableHeaderCell>
                            <TableHeaderCell className="text-black">Date Joined</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {communities.filter((community) => isEmployeeSelected(community))
                            .map((community) => (
                                <TableRow key={community.id}>
                                    <TableCell>{community.name}</TableCell>
                                    <TableCell>
                                        <Text>{community.address}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{formatDate(community.createdAt)}</Text>
                                    </TableCell>
                                    {/* <TableCell>
                                        <Text>{employee.phoneNumber}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{formatDate(employee.createdAt)}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{employee.email}</Text>
                                    </TableCell> */}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Card>

        </>
    )
}

export default SearchCommunities