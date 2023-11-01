// api/user/editUser/route.ts

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession();

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { newUsername } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the new username is available
      const usernameExists = await prisma.user.findFirst({
        where: { username: newUsername },
      });

      if (usernameExists) {
        return res.status(400).json({ error: "Username is already in use" });
      }

      // Update the user's username
      await prisma.user.update({
        where: { id: user.id },
        data: {
          username: newUsername,
        },
      });

      return res.status(200).json({ message: "Username updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: "An error occurred" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};
