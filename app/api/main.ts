import { prisma } from '../../global/db'

export const main = async () => {
  try {
    await prisma.$connect()
  } catch (err) {
    throw new Error('DB接続に失敗しました')
  }
}
