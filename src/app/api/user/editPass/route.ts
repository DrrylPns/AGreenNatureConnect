import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt"; // Import bcrypt

const prisma = new PrismaClient();
const saltRounds = 12; // Define the number of salt rounds for bcrypt

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession();

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { oldPassword, newPassword } = req.body;

    // Retrieve the user by their session token
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the old password with the hashed password
    const passwordMatch = await bcrypt.compare(oldPassword, user.hashedPassword as string); // if error try to remove as string

    if (!passwordMatch) {
      return res.status(400).json({ error: "Old password is incorrect" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password with the hashed new password
    await prisma.user.update({
      where: { id: user.id },
      data: {
        hashedPassword: hashedNewPassword,
      },
    });

    return res.status(200).json({ message: "Password updated successfully" });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};



