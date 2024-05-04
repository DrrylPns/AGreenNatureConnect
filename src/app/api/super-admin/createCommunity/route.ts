import prisma from "@/lib/db/db";
import { CreateEmployeeSchema } from "@/lib/validations/admin/createEmployee";
import { UpdateEmployeeSchema } from "@/lib/validations/admin/updateEmployee";
import { NextRequest, NextResponse } from "next/server";
import { sendEmployeePasswordLink } from "../../../../../actions/set-employee-password";
import { getAuthSession } from "../../../../lib/auth";
import { CreateCommunitySchema } from "@/lib/validations/super-admin/createCommunity";

export async function POST(req: Request) {
    const currentYear = new Date().getFullYear()
    const session = await getAuthSession()

    if (session?.user.role !== "SUPER_ADMIN") return new Response("Unauthorized", { status: 401 })

    try {
        const body = await req.json()

        const {
            barangayName,
            urbanFarmName,
            communityAddress,
            communityDescription,
            communityEmail,
            firstname,
            gender,
            lastName,
            email,
            userPhone,
            // password,
            // communityImages,
            communityDisplayPhoto,
            phone,
        } = CreateCommunitySchema.parse(body)

        const emailExist = await prisma.user.findFirst({
            where: {
                email
            }
        })

        const communityEmailExist = await prisma.community.findFirst({
            where: {
                email: communityEmail
            }
        })


        if (emailExist) return new NextResponse(`${email} already exists`, { status: 406 })

        if (communityEmailExist) return new NextResponse(`${communityEmailExist} already exists`, { status: 403 })


        // phone number check
        const phoneNumberExists = await prisma.community.findFirst({
            where: { contactNumber: phone }
        })

        const communityExists = await prisma.community.findFirst({
            where: { name: barangayName }
        })

        const urbanFarmExists = await prisma.community.findFirst({
            where: {
                urbanFarmName,
            }
        })

        const userPhoneExists = await prisma.user.findUnique({
            where: { phoneNumber: userPhone }
        })

        if (userPhoneExists && session.user.id !== userPhoneExists.id) {
            return new Response("Error: Bad Request, phone number is already in use by another user.", { status: 407 })
        }

        if (phoneNumberExists) {
            return new Response("Error: Bad Request, phone number is already in use by another community.", { status: 400 })
        }

        if (communityExists) {
            return new Response("Error: Community already exists!", { status: 402 })
        }

        if (urbanFarmExists) {
            return new Response("Error: Urban Farm name already exists!", { status: 405 })
        }

        const currentDate = new Date();

        const successUserCreate = await prisma.user.create({
            data: {
                name: firstname,
                role: "ADMIN",
                phoneNumber: userPhone,
                gender,
                email,
                lastName,
                emailVerified: currentDate,
                // hashedPassword,
                Community: {
                    create: {
                        name: barangayName,
                        address: communityAddress,
                        description: communityDescription,
                        email: communityEmail,
                        displayPhoto: communityDisplayPhoto,
                        contactNumber: phone,
                        urbanFarmName,
                        // carouselImage: communityImages,
                    }
                }
            }
        })

        if (successUserCreate) {
            sendEmployeePasswordLink(successUserCreate.email as string)
        }


        return new NextResponse(`Successfully created a community!`)
    } catch (error) {
        return new NextResponse('Could not create a community' + error, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    const session = await getAuthSession()

    if (session?.user.role !== "ADMIN") return new Response("Unauthorized", { status: 401 })

    try {
        const body = await req.json()

        const {
            address,
            employeeId,
            firstname,
            lastName,
            phone,
            avatar,
            gender,
        } = UpdateEmployeeSchema.parse(body)

        const phoneNumberExists = await prisma.user.findFirst({
            where: {
                phoneNumber: phone
            }
        })

        const getEmployeeUpdate = await prisma.user.findFirst({
            where: {
                EmployeeId: employeeId,
            }
        })

        console.log(employeeId)
        // get muna yung user na inuupdate tapus if 
        // yung user na yun ay hindi kaniya ang phonenumberexists then proceed

        if (phoneNumberExists && phoneNumberExists.id !== getEmployeeUpdate?.id) {
            return new Response("Error: Bad Request, phone number already exists!", { status: 401 })
        }

        await prisma.user.update({
            data: {
                name: firstname,
                address,
                lastName,
                phoneNumber: phone,
                image: avatar,
                gender,
            },
            where: {
                EmployeeId: employeeId,
            }
        })

        return new NextResponse(`Successfully updated the employee!`)
    } catch (error) {
        return new NextResponse('Could not create an employee' + error, { status: 500 })
    }
}
