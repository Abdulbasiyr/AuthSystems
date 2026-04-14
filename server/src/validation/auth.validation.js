
import z from 'zod'
import { AppError } from '../utils/app.error.js'


const passwordRegex    = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).+$/;
const nameRegex        = /^[^<>/"'`]+$/


const signUpSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(50, 'Name is too long').regex(nameRegex, 'Invalid name'),
  email: z.string().trim().toLowerCase().email('Please, provide a valid email'),
  password: z.string().trim().min(8, 'Password is too short').max(100, 'Password is too long').regex(passwordRegex, 'Password must contain a capital letter, number, and one symbol')
})

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Please, provide a valid email'),
  password: z.string().trim().min(1, 'Password required')
})


// validated Sign Up
export function validateSignUp(data) {
  const parsed = signUpSchema.safeParse(data)
  if(!parsed.success) {
    const result = parsed.error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message
    }))
    const [details] = result
    throw new AppError('Some fields are filled in incorrectly', 400, {techMessage: parsed.error.issues[0].message ?? 'Signup validation failed', errorCode: 'VALIDATION_FAILED', details})
  } 

  return parsed.data
}


// validated Login
export function validateLogin(data) {
  const parsed = loginSchema.safeParse(data)
  if(!parsed.success) {
    const result = parsed.error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message
    }))
    const [details] = result
    throw new AppError('Some fields are filled in incorrectly', 400, {techMessage: parsed.error.issues[0].message ?? 'Login validation failed', errorCode: 'VALIDATION_FAILED', details})
  } 

  return parsed.data
}