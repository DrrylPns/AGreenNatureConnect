import prisma from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import { ChangePasswordSchema } from "@/lib/validations/changePasswordSchema";
import { getAuthSession } from "@/lib/auth";

// const saltRounds = 12; // number of salt for hashing ito gamit bcrypt

// export async function POST(req: Request) {
//   try {
//     const session = await getServerSession();

//     //check
//     if (!session?.user) {
//       return new Response("Unauthorized", { status: 401 })
//     }

//     const body = await req.json();
//     const { oldPassword, newPassword, confirmNewPassword } = ChangePasswordSchema.parse(body);

//     // Retrieve the user by their session token
//     const user = await prisma.user.findUnique({
//       where: { id: session.user.id },
//     });

//     if (!user) {
//       return new Response("User not found", { status: 404 })
//     }

//     // compare the old password with the hashed password
//     const passwordMatch = await bcrypt.compare(oldPassword, user.hashedPassword as string); // if error try to remove as string

//     if (!passwordMatch) {
//       return new Response("Old password is incorrect", { status: 400 })
//     }

//     // hash the new password
//     const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

//     // update the user's password with the hashed new password
//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         hashedPassword: hashedNewPassword,
//       },
//     });


//     return new Response("Password Updated Successfully", { status: 200 });

//   } catch (error: any) {
//     if (error instanceof z.ZodError) {
//       return new Response(error.message, { status: 422 })
//     }

//       return new Response(error.message)
//   }
// };

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user && !session) {
      return new Response("Error: No session found!", { status: 401 })
    }

    const body = await req.json();

    const { oldPassword, newPassword, confirmNewPassword } = ChangePasswordSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { id: session?.user.id }
    })

    const passwordMatch = await bcrypt.compare(oldPassword, user?.hashedPassword as string);

    if (!passwordMatch) {
      return new Response("Old password is incorrect", { status: 400 })
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: user?.id },
      data: {
        hashedPassword: hashedNewPassword
      }
    })

    return new Response("Password Updated Successfully", { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid POST request data passed", { status: 422 })
    }

    return new Response("Could not create a user, please try again later!", { status: 500 });
  }
}

