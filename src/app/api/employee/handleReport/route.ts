import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db";
import { handleReportSchema } from "@/lib/validations/employee/reports";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const session = await getAuthSession()

        const body = await req.json()

        // might need postId and reportId and reportedId
        const { status } = handleReportSchema.parse(body)

        // if rejected yung report make post reports 0 again and delete the existing reports
        // if resolved add numberOfViolations of user na rineport + 1
        const reports = await prisma.report.update({
            where: {
                id: "123" // reportId
            },
            data: {
                status,
            }
        })

        if (status === "REJECTED") {
            await prisma.post.update({
                where: {
                    id: "123" // postId
                },
                data: {
                    reports: 0
                }
            })

            await prisma.report.delete({
                where: {
                    id: "123", // reportId
                    postId: "123" // postId
                }
            })
        } else if (status === "RESOLVED") {
            const userReported = await prisma.user.findFirst({
                where: {
                    id: "123" //reportedId
                }
            })

            if (userReported) {
                await prisma.user.update({
                    where: {
                        id: userReported.id,
                    },
                    data: {
                        numberOfViolations: userReported.numberOfViolations + 1,
                    },
                });
            }
        }

        return new NextResponse("Success handling reports")
    } catch (error) {
        return new NextResponse(`Error handling reports ${error}`, { status: 500 })
    }
}