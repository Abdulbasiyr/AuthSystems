
import z from 'zod'
import { AppError } from '../utils/app.error'


const signUpSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(50, ''),
  email: z.string().trim().toLowerCase().email(''),
  password: z.string().trim().min(8, '').max(100, '')
})

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(''),
  password: z.string().trim()
})



export function validateSignUp(data) {
  const parsed = signUpSchema.safeParse(data)
  if(!parsed.success) throw new AppError('', 403)

  return parsed.data
}


export function validateLogin(data) {
  const parsed = loginSchema.safeParse(data)
  if(!parsed.success) throw new AppError('', 403)

  return parsed.data
}