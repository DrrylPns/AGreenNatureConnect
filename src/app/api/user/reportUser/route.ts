import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db";
import { ReportSchema } from "@/lib/validations/reportSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getAuthSession()

    try {
        const body = await req.json()

        // need to get user who has been reported and post. (done)
        // posterId = yung irereport
        // postId = yung post na rineport
        const { type, postId, posterId } = ReportSchema.parse(body)

        console.log("Reporting user with ID:", posterId);

        // increment user number of violations by 1 every report
        const reportedUser = await prisma.user.findUnique({
            where: {
                id: posterId
            },
        });

        if (!reportedUser) {
            return new NextResponse("Reported user not found.", { status: 404 });
        }

        const updatedPost = await prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              reports: {
                increment: 1,
              },
            },
          });

        // ILIPAT TONG NUMBER OF VIOLATIONS SA EMPLOYEE SIDE PARA KAPAG 3 NA YUNG NUMBER OF VIOLATIONS
        // I-BAN NA YUNG USER NA YON HAHA 

        // const updatedUser = await prisma.user.update({
        //     where: {
        //         id: posterId
        //     },
        //     data: {
        //         numberOfViolations: reportedUser.numberOfViolations + 1
        //     },
        // });

        // kapag iffetch na to sa employee / admin side dapat kung saan community nung rineport, dun lang siya makikita.
        // hindi dapat makikita sa dashboard ng ibang community
        const report = await prisma.report.create({
            data: {
                reporterId: session?.user.id as string, // yung nang report
                reportedId: posterId as string, // yung rineport
                postId, // post na rineport
                type,
            },
        })

        return new NextResponse(`Reported.`)
    } catch (error) {
        return new NextResponse("Could not update!" + error, { status: 500 })
    }
}