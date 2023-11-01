import { getAuthSession } from "@/lib/auth"
import MainSettings from "./component/MainSettings"

async function Settings() {
  const session = await getAuthSession()

  return (
    <MainSettings session={session} />
  )
}

export default Settings