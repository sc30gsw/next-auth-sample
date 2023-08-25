import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

import { prisma } from '../../../global/db'
import { main } from '../main'

// ユーザー新規登録API
export const POST = async (req: Request, res: NextResponse) => {
  try {
    await main()

    const { name, email, password } = await req.json()

    const foundUser = await prisma.user.findUnique({ where: { email } })

    if (foundUser)
      return NextResponse.json(
        { message: 'user is already exists' },
        { status: 409 },
      )

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json(
      { message: 'register successful', user },
      { status: 201 },
    )
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
