"use client"

import { Button } from "@/app/components/Ui/Button";
import { formatDate } from "@/lib/utils";
import { Community, User } from "@prisma/client";
import { Card, MultiSelect, MultiSelectItem, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'
import { useState } from "react";

interface SearchEmployeesProps {
    employees: Array<User & { Community: Community | null }>;
}

const SearchEmployees: React.FC<SearchEmployeesProps> = ({
    employees
}) => {
    const [selectedNames, setSelectedNames] = useState<string[]>([]);

    const isEmployeeSelected = (employee: User & { Community: Community | null }) =>
        selectedNames.length === 0 || selectedNames.includes(employee.name || "");

    const handleValueChange = (value: string | string[]) => {
        const names = Array.isArray(value) ? value : [value];
        setSelectedNames(names);
    };

    return (
        <>
            <div className="flex space-x-2 mt-2">
                <MultiSelect
                    className="max-w-full sm:max-w-xs"
                    onValueChange={handleValueChange}
                    placeholder="Search Employees..."
                >
                    {employees.map((employee) => (
                        <MultiSelectItem key={employee.name} value={employee.name || ""}>
                            {employee.name}
                        </MultiSelectItem>
                    ))}
                </MultiSelect>
            </div>

            <Card className="mt-5 w-full">
                <Table className="w-full">
                    <TableHead className="bg-gray-200">
                        <TableRow>
                            <TableHeaderCell className="text-black">Employee ID</TableHeaderCell>
                            <TableHeaderCell className="text-black">Firstname</TableHeaderCell>
                            <TableHeaderCell className="text-black">Lastname</TableHeaderCell>
                            <TableHeaderCell className="text-black">Contact Number</TableHeaderCell>
                            <TableHeaderCell className="text-black">Date Joined</TableHeaderCell>
                            <TableHeaderCell className="text-black">Email</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.filter((employee) => isEmployeeSelected(employee))
                            .map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell>{employee.EmployeeId}</TableCell>
                                    <TableCell>
                                        <Text>{employee.name}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{employee.lastName}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{employee.phoneNumber}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{formatDate(employee.createdAt)}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{employee.email}</Text>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Card>

        </>
    )
}

export default SearchEmployees