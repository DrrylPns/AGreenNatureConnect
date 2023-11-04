import prisma from "@/lib/db/db"
import { ChangeUserProfileSchema } from "@/lib/validations/changeUserProfile";
import { getAuthSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
  const session = await getAuthSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }

  const body = await req.json();
  const { newUsername, newPhone, newBirthday, newAddress } = ChangeUserProfileSchema.parse(body)

  //try catch start

    console.log(session.user.id)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return new Response("User not found", { status: 404 })
    }

    // Check if the new username is available or already exists
    const usernameExists = await prisma.user.findFirst({
      where: { username: newUsername },
    });

    // palabasin sa client conflicting status // done
    if (usernameExists) {
      return new Response("Username is already in use", { status: 409 })
    }

    // dipende sa logic natin pero 30days muna. pag nag palit ng username dapat 30days ulit bago makapagpalit
    // const thirtyDaysAgo = new Date()
    // thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // if (user.lastUsernameChange && user.lastUsernameChange > thirtyDaysAgo) {
    //   return new Response("Username can't be changed again within 30 days", { status: 400 });
    // }

    // Update the user's username
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        username: newUsername,
        phoneNumber: newPhone,
        birthday: newBirthday,
        address: newAddress,
        // lastUsernameChange: new Date()
      },
    });

    return new Response("Username updated successfully", { status: 200 })
  } catch (error: any) {
    return new Response(`${error.message}`, { status: 500 })
  }
};
