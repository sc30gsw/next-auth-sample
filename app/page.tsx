import Link from 'next/link'
import { getServerSession } from 'next-auth'
import React from 'react'

import ButtonArea from './components/button-area'
import Provider from './components/provider'
import { options } from './options'

const Home = async () => {
  const session = await getServerSession(options)

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Link href="/" className="inline-block my-5">
        HOME
      </Link>
      {session?.user ? (
        <>
          <div>Log in: {session?.user.name}</div>
          <Provider>
            <ButtonArea />
          </Provider>
        </>
      ) : (
        <Link href="/login">ログインする</Link>
      )}
    </main>
  )
}

export default Home
