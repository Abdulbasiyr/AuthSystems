
import z from 'zod'
import { AppError } from '../utils/app.error.js'


const userMessageInput = 'Validation failed'
const passwordRegex    = / ^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).+$ /;
const nameRegex        = /^[^<>/"'`]+$/


const signUpSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(50, 'Name is too long').regex(nameRegex, 'Invalid name'),
  email: z.string().trim().toLowerCase().email('Please, provide a valid email'),
  password: z.string().trim().min(8, 'Password is too short').max(100, 'Password is too long').regex(passwordRegex, 'Password too weak')
})

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Please, provide a valid email'),
  password: z.string().trim().min(1, 'Password required')
})



export function validateSignUp(data) {
  const parsed = signUpSchema.safeParse(data)
  if(!parsed.success) throw new AppError(parsed.error.issues[0].message || userMessageInput, 403)

  return parsed.data
}


export function validateLogin(data) {
  const parsed = loginSchema.safeParse(data)
  if(!parsed.success) throw new AppError(parsed.error.issues[0].message || userMessageInput, 403)

  return parsed.data
}