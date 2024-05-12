import React from "react";
import { getAuthSession } from "@/lib/auth";
import { getUserById } from "../../../../data/user";
import { ConsignorForm } from "./_components/ConsignorForm";

const Consignor = async () => {
  const session = await getAuthSession();

  const user = await getUserById(session?.user.id as string);

  if (!user) return (
    <div className="text-center mt-4">You need to be logged in to apply as a consignor</div>
  );

  return (
    <>
      <ConsignorForm user={user!} />
    </>
  );
};

export default Consignor;
