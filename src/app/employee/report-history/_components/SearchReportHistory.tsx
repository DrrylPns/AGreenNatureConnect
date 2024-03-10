"use client"

import { formatDate } from "@/lib/utils";
import { Post, Report, Topic, User } from "@prisma/client";
import { Card, MultiSelect, MultiSelectItem, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text } from "@tremor/react";
import { useState } from "react";

export interface SearchReportHistoryProps {
    reports: Array<Report & {
        reporter: User
        reported: User
        post: Post & {
            topic: Topic
        }
    }>
}

export const SearchReportHistory: React.FC<SearchReportHistoryProps> = ({ reports = [] }) => {
    const [selectedNames, setSelectedNames] = useState<string[]>([]);

    const isEmployeeSelected = (report: Report & {
        reporter: User
        reported: User
        post: Post & {
            topic: Topic
        }
    }) =>
        selectedNames.length === 0 || selectedNames.includes(report?.type || "");

    const handleValueChange = (value: string | string[]) => {
        const names = Array.isArray(value) ? value : [value];
        setSelectedNames(names);
    };

    const formatReportType = (reportType: string) => {
        return reportType.replace(/([a-z])([A-Z])/g, '$1 $2');
    };

    return (
        <>
            <div className="flex space-x-2 mt-2">
                <MultiSelect
                    className="max-w-full sm:max-w-xs"
                    onValueChange={handleValueChange}
                    placeholder="Search"
                >
                    <MultiSelectItem value="IrrelevantContent">Irrelevant Content</MultiSelectItem>
                    <MultiSelectItem value="IntellectualProperty">Intellectual Property</MultiSelectItem>
                    <MultiSelectItem value="FraudOrScam">Fraud or Scam</MultiSelectItem>
                    <MultiSelectItem value="MockingVictims">Mocking Victims</MultiSelectItem>
                    <MultiSelectItem value="Bullying">Bullying</MultiSelectItem>
                    <MultiSelectItem value="ChildAbuse">Child Abuse</MultiSelectItem>
                    <MultiSelectItem value="AnimalAbuse">Animal Abuse</MultiSelectItem>
                    <MultiSelectItem value="SexualActivity">Sexual Activity</MultiSelectItem>
                    <MultiSelectItem value="SuicideOrSelfInjury">Suicide or self-injury</MultiSelectItem>
                    <MultiSelectItem value="HateSpeech">Hate Speech</MultiSelectItem>
                    <MultiSelectItem value="PromotingDrugUse">Promoting drug use</MultiSelectItem>
                    <MultiSelectItem value="NonConsensualIntimateImages">Non-consensual intimate images</MultiSelectItem>
                    <MultiSelectItem value="SexualExploitation">Sexual Exploitation</MultiSelectItem>
                    <MultiSelectItem value="Harassment">Harassment</MultiSelectItem>
                    <MultiSelectItem value="UnauthorizedSales">Unauthorized Sales</MultiSelectItem>
                    <MultiSelectItem value="Violence">Violence</MultiSelectItem>
                    <MultiSelectItem value="SharingPrivateImages">Sharing Private Images</MultiSelectItem>
                </MultiSelect>

            </div>

            <Card className="mt-5 w-full">
                <Table className="w-full">
                    <TableHead className="bg-gray-200">
                        <TableRow>
                            <TableHeaderCell className="text-black">Reporter</TableHeaderCell>
                            <TableHeaderCell className="text-black">Reported User</TableHeaderCell>
                            <TableHeaderCell className="text-black">Reason</TableHeaderCell>
                            <TableHeaderCell className="text-black">Date Reported</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports.filter((report) => isEmployeeSelected(report))
                            .map((report) => (
                                <TableRow key={report?.id}>
                                    <TableCell>
                                        <Text>{report?.reported?.name}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{report?.reported?.lastName}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{formatReportType(report?.type)}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{formatDate(report?.createdAt)}</Text>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Card>

        </>
    )
}
