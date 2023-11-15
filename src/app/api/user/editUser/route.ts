import prisma from "@/lib/db/db"
import { ChangeUserProfileSchema } from "@/lib/validations/changeUserProfile";
import { getAuthSession } from "@/lib/auth";
import { calculateDaysUntilUsernameChange } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json();
    const { newUsername, newPhone, newBirthday, newAddress } = ChangeUserProfileSchema.parse(body);

    console.log(session.user.id)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return new Response("User not found", { status: 404 })
    }

    // Check if the new username is available or already exists

    // palabasin sa client conflicting status // done
    // const usernameExists = await prisma.user.findFirst({
    //   where: {
    //     username: newUsername,
    //   },
    // });

    // if (usernameExists) {
    //   return new Response("Username is already in use", { status: 409 })
    // }

    // dipende sa logic natin pero 30days muna. pag nag palit ng username dapat 30days ulit bago makapagpalit

    // const allowUserExist = await prisma.user.findFirst({
    //   where: {
    //     id: session.user.id,
    //     username: newUsername,
    //   },
    // });

    const usernameExists = await prisma.user.findFirst({
      where: { username: newUsername },
    });

    if (usernameExists && usernameExists.id !== session.user.id) {
      return new Response("Username is already in use", { status: 409 })
    }

    // TODO: if kanya yung existing phone number then allow it
    const phoneNumberExists = await prisma.user.findFirst({
      where: { phoneNumber: newPhone }
    })

    if (phoneNumberExists && phoneNumberExists.id !== session.user.id) {
      return new Response("Error: Bad Request, phone number is already in use by another user.", { status: 400 })
    }

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // if (user.lastUsernameChange && user.lastUsernameChange > thirtyDaysAgo) {
    //   const nextChangeDate = new Date(user.lastUsernameChange);
    //   nextChangeDate.setDate(nextChangeDate.getDate() + 30);

    //   // not necessary tanggalin if d need nasa baba
    //   const options: Intl.DateTimeFormatOptions = {
    //     weekday: 'long',
    //     month: 'long',
    //     day: '2-digit',
    //     year: 'numeric'
    //   };

    //   const dateFormatter = new Intl.DateTimeFormat(undefined, options);
    //   const formattedDate = dateFormatter.format(nextChangeDate);

    //   return new Response(`Username can't be changed again until ${formattedDate}.`, {
    //     status: 400,
    //   });
    // }

    // if (user.lastUsernameChange) {
    //   const thirtyDaysAgo = new Date();
    //   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    //   if (user.lastUsernameChange > thirtyDaysAgo) {
    //     const nextChangeDate = new Date(user.lastUsernameChange);
    //     nextChangeDate.setDate(nextChangeDate.getDate() + 30);

    //     const options: Intl.DateTimeFormatOptions = {
    //       weekday: 'long',
    //       month: 'long',
    //       day: '2-digit',
    //       year: 'numeric',
    //     };

    //     const dateFormatter = new Intl.DateTimeFormat(undefined, options);
    //     const formattedDate = dateFormatter.format(nextChangeDate);

    //     return new Response(`Username can't be changed again until ${formattedDate}.`, {
    //       status: 400,
    //     });
    //   }
    // }

    const daysLeft = calculateDaysUntilUsernameChange(user.lastUsernameChange as Date);

    const dataToUpdate: Record<string, any> = {
      phoneNumber: newPhone,
      birthday: newBirthday,
      address: newAddress,
      lastUsernameChange: new Date(),
    }

    if (daysLeft <= 0) {
      dataToUpdate.username = newUsername;
    }

    // Update the user's username
    await prisma.user.update({
      where: { id: session.user.id },
      data: dataToUpdate
    });

    return new Response("Username updated successfully", { status: 200 })
  } catch (error: any) {
    return new Response(`${error.message}`, { status: 500 })
  }
};
