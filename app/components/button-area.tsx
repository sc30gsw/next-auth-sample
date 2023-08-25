'use client'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

export const ButtonArea = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user

  const handleSignOut = () => {
    signOut()
    router.push('/login')
  }
  return (
    <div className="w-full flex justify-evenly mt-5">
      <Button variant="outlined">{user?.name}のページ</Button>
      <Button
        className="border-red-500 text-red-500"
        variant="outlined"
        onClick={handleSignOut}
      >
        Sign out
      </Button>
    </div>
  )
}

export default ButtonArea
