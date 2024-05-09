import React from "react";
import { getAuthSession } from "@/lib/auth";
import { getUserById } from "../../../../data/user";
import { PasabuyForm } from "./_components/PasabuyForm";

const PasabuyPage = async () => {
  const session = await getAuthSession();

  const user = await getUserById(session?.user.id as string);

  if (!user) return <>Error fetching current user</>;

  return (
    <>
      <PasabuyForm user={user!} />
    </>
  );
};

export default PasabuyPage;
