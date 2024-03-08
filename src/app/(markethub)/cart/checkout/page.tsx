
import CheckoutModal from "../../components/CheckooutModal"
import prisma from "@/lib/db/db"
import axios from "axios";
import { useSession } from "next-auth/react";


function page() {

  return (
    <div>
      <CheckoutModal/>
    </div>
    
)}

export default page