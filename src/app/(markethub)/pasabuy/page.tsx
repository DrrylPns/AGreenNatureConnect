import { getAuthSession } from "@/lib/auth";
import { getUserById } from "../../../../data/user";
import { PasabuyForm } from "./_components/PasabuyForm";

const PasabuyPage = async () => {
  const session = await getAuthSession();

  const user = await getUserById(session?.user.id as string);

  if (!user) return <>You need to be logged in to join as an urban farm in AGreen Nature Connect</>;

  return (
    <>
      <PasabuyForm user={user!} />
    </>
  );
};

export default PasabuyPage;
