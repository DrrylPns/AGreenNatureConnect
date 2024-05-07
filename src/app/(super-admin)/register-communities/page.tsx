import React from 'react'
import { UrbanFarmForm } from './_components/UrbanFarmForm'
import { getAuthSession } from '@/lib/auth'
import { getUserById } from '../../../../data/user'

const RegisterCommunitiesPage = async () => {
  const session = await getAuthSession()

  const user = await getUserById(session?.user.id as string)

  if (!user) return <>Error fetching current user</>

  return (
    <>
      <UrbanFarmForm user={user!} />
    </>
  )
}

export default RegisterCommunitiesPage