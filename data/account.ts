import prisma from "@/lib/db/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: { userId }
    });

    return account;
  } catch {
    return null;
  }
};