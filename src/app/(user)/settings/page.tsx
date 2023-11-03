import { getAuthSession } from "@/lib/auth"
import MainSettings from "./component/MainSettings"

async function Settings() {
  const session = await getAuthSession()

  return (
    //ginawa ko server session para mas mabilis pag kuha ng data mabagal kasi pag client session hook lang
    <MainSettings session={session} />
  )
}

export default Settings