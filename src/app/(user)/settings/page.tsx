import { getAuthSession } from "@/lib/auth"
import MainSettings from "./component/MainSettings"
import prisma from "@/lib/db/db";

async function Settings() {
  const session = await getAuthSession()

    const getUserProfile = async () => {
        if (session) {
          const user = await prisma.user.findUnique({
            where: {
              id: session.user.id,
            },
            include: {
              Account: true, // It should be 'accounts', not 'Account'
            },
          });
    
          if (user) {
            return user;
          }
        }
        return null;
      };

    const user = await getUserProfile();

    const isGoogleProvider = user !== null && user.Account.some(
        (account) => account.provider === 'google'
      );

  return (
    //ginawa ko server session para mas mabilis pag kuha ng data mabagal kasi pag client session hook lang
    <MainSettings session={session} user={user} isGoogleProvider={isGoogleProvider} />
  )
}

export default Settings