import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db";
import { handleReportSchema } from "@/lib/validations/employee/reports";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const session = await getAuthSession()
    //need to fetch reports based on the community ng rineport.....
    try {
        const loggedInUser = await prisma.user.findFirst({
            where: {
                id: session?.user.id
            },
            include: {
                Community: true
            }
        })

        const reports = await prisma.report.findMany({
            where: {
                status: "PENDING",
                reported: {
                    communityId: loggedInUser?.Community?.id
                }
            },
            include: {
                post: {
                    include: {
                        topic: true
                    }
                },
                reported: true,
                reporter: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return new NextResponse(JSON.stringify(reports))
    } catch (error) {
        return new NextResponse("Can't get reports" + error, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const session = await getAuthSession()

        const body = await req.json()

        // might need postId and reportId and reportedId
        //turns out reportedId === reporter , vice versa reporterId = reported
        const { status, postId, reportedId, reporterId, reportId } = handleReportSchema.parse(body)

        console.log(`Post ID: ${postId}`)

        // if rejected yung report make post reports 0 again and delete the existing reports
        // if resolved add numberOfViolations of user na rineport + 1, then ibato sa reports history.
        const reports = await prisma.report.updateMany({
            where: {
                postId: postId,
            },
            data: {
                status,
            }
        })

        if (status === "REJECTED") {
            await prisma.post.update({
                where: {
                    id: postId // postId
                },
                data: {
                    reports: 0
                }
            })

            // await prisma.report.delete({
            //     where: {
            //         id: reportId, 
            //         postId: postId 
            //     }
            // })

        } else if (status === "RESOLVED") {
            const userReported = await prisma.user.findFirst({
                where: {
                    id: reportedId //reportedId
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