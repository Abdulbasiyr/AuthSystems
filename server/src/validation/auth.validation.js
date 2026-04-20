
import z from 'zod'
import { AppError } from '../utils/app.error.js'


const passwordRegex    = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).+$/;
const nameRegex        = /^[^<>/"'`]+$/
const codeRegex        = /^\d{6}$/


const signUpSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(50, 'Name is too long').regex(nameRegex, 'Invalid name'),
  email: z.string().trim().toLowerCase().email('Please, provide a valid email'),
  password: z.string().trim().min(10, 'Password is too short').max(100, 'Password is too long').regex(passwordRegex, 'Password must contain a capital letter, number, and one symbol')
})

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Please, provide a valid email'),
  password: z.string().trim().min(1, 'Password required')
})

const emailSchema = z.object({
  email: z.string().trim().toLowerCase().email('Please, provide a valid email')
})

const passwordShema = z.object({
  password: z.string().trim().min(10, 'Password is too short').max(100, 'Password is too long').regex(passwordRegex, 'Password must contain a capital letter, number, and one symbol')
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


export function validateEmail(email) {
  const parsed = emailSchema.safeParse(email)
  if(!parsed.success) {
    const details = {path: parsed.error.issues[0].path, message: parsed.error.issues[0].message}
    throw new AppError('Please, provide a valied email', 400, {techMessage: parsed.error.issues[0].message ?? 'Check email failed', errorCode: 'VALIDATION_FAILED', details})
  }

  return parsed.data
}


// chech password
export function validatePassword(password) {
  const parsed = passwordShema.safeParse(password)
  if(!parsed.success) throw new AppError('Password field are filled in incorrectly', 400, {techMessage: parsed.error.issues[0].message ?? 'Reset password validation failed', errorCode: 'VALIDATION_FAILED'})

  return parsed.data
}

