
import { prisma } from "../../lib/prisma.js"

export function createUser(data) {
  return prisma.user.create({ data, select: { id: true, name: true, email: true } })
}

export function findUserByEmail(email) {
  return prisma.user.findUnique({ where: {email}, select: { id: true, name: true, email: true, password: true } })
}