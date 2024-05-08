import { getAuthSession } from "../../../../lib/auth";
import prisma from "@/lib/db/db";
import { CreateEmployeeSchema } from "@/lib/validations/admin/createEmployee";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { UpdateEmployeeSchema } from "@/lib/validations/admin/updateEmployee";
import { sendEmployeePasswordLink } from "../../../../../actions/set-employee-password";

export async function POST(req: Request) {
    const currentYear = new Date().getFullYear()
    const session = await getAuthSession()

    if (session?.user.role !== "ADMIN") return new Response("Unauthorized", { status: 401 })

    try {
        const body = await req.json()

        const {
            address,
            avatar,
            email,
            firstname,
            gender,
            lastName,
            // password,
            specialization,
            phone,
        } = CreateEmployeeSchema.parse(body)

        let counter = await prisma.employeeIdCounter.findUnique({
            where: { year: currentYear }
        })

        const emailExist = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (emailExist) return new NextResponse(`${email} already exists`, { status: 400 })

        // const hashedPassword = await bcrypt.hash(password as string, 12)

        if (!counter) {
            counter = await prisma.employeeIdCounter.create({
                data: {
                    year: currentYear,
                    counter: 1,
                }
            })
        } else {
            counter = await prisma.employeeIdCounter.update({
                where: { year: currentYear },
                data: { counter: counter.counter + 1 }
            })
        }

        const formattedId = `${currentYear.toString().slice(-2)}-${counter.counter.toString().padStart(4, '0')}`

        //finding the community of the loggedIn user code starts here:
        const loggedIn = await prisma.user.findFirst({
            where: {
                id: session?.user.id,
            },
            include: {
                Community: true
            }
        })

        const getCommunity = await prisma.community.findFirst({
            where: {
                name: loggedIn?.Community?.name
            }
        })

        // phone number check
        const phoneNumberExists = await prisma.user.findFirst({
            where: { phoneNumber: phone }
        })

        if (phoneNumberExists && phoneNumberExists.id !== session.user.id) {
            return new Response("Error: Bad Request, phone number is already in use by another user.", { status: 401 })
        }

        const currentDate = new Date();

        const successUserCreate = await prisma.user.create({
            data: {
                name: firstname,
                EmployeeId: formattedId,
                phoneNumber: phone,
                image: avatar,
                gender,
                address,
                email,
                lastName,
                role: "EMPLOYEE",
                emailVerified: currentDate,
                specialization,
                // hashedPassword,
                Community: {
                    connect: {
                        name: getCommunity?.name as string
                    }
                }
            }
        })

        if (successUserCreate) {
            sendEmployeePasswordLink(successUserCreate.email as string)
        }


        return new NextResponse(`Successfully created a farmer!`)
    } catch (error) {
        return new NextResponse('Could not create a farmer' + error, { status: 500 })
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
            specialization,
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
                specialization,
            },
            where: {
                EmployeeId: employeeId,
            }
        })

        return new NextResponse(`Successfully updated the farmer!`)
    } catch (error) {
        return new NextResponse('Could not create an farmer' + error, { status: 500 })
    }
}
