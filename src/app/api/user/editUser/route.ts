import prisma from "@/lib/db/db"
import { getServerSession } from "next-auth";
import { ChangeUserProfileSchema } from "@/lib/validations/changeUserProfile";

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }

  const body = req.json();
  const { newUsername } = ChangeUserProfileSchema.parse(body)

  //try catch start
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return new Response("User not found", { status: 404 })
    }

    // Check if the new username is available
    const usernameExists = await prisma.user.findFirst({
      where: { username: newUsername },
    });

    if (usernameExists) {
      return new Response("Username is already in use", { status: 400 })
    }

    // dipende sa logic natin pero 30days muna. pag nag palit ng username dapat 30days ulit bago makapagpalit
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    if (user.lastUsernameChange && user.lastUsernameChange > thirtyDaysAgo) {
      return new Response("Username can't be changed again within 30 days", { status: 400 });
    }

    // Update the user's username
    await prisma.user.update({
      where: { id: user.id },
      data: {
        username: newUsername,
        lastUsernameChange: new Date()
      },
    });

    return new Response("Username updated successfully", { status: 200 })
  } catch (error) {
    return new Response("An error occurred", { status: 500 })
  }

};
