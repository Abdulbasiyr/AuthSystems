
import bcrypt from 'bcrypt'
import { createUser, findUserByEmail } from '../repositorys/auth.repository.js'
import { createAccessToken, createRefreshToken } from '../utils/token.utils.js'
import { AppError } from '../utils/app.error.js'

const SALT_ROUNDS = 10


// service Sign Up
export async function serviceSignUp(data) {

  const { name, email, password } = data

  try {

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await createUser({name, email, password: hashedPassword})
    
    const refreshToken = createRefreshToken(user)
    const accessToken = createAccessToken(user)


    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
      refreshToken
    }

  } catch(err) {
    if(err instanceof AppError) throw err

    if(err?.code === 'P2002') {
      throw new AppError('User already exists', 409, {techMessage: `Email: ${email} already exists`, errorCode: 'EMAIL_ALREADY_EXISTS'})
    }

    throw new AppError('Failed to register a user. Please try again later', 500, {techMessage: err?.message || 'Unknown signup user', errorCode: 'SIGNUP_FAILED'})
  }

}


// service Login
export async function serviceLogin(data) {

    
  const user = await findUserByEmail(data.email)
  if(!user) throw new AppError('Email or password invalid', 401, {techMessage:`User with email ${data.email} not found`, errorCode: 'INVALID_CREDENTIALS'})

  const isValidPassword = await bcrypt.compare(data.password, user.password)
  if(!isValidPassword) throw new AppError('Email or password invalid', 401, {techMessage: 'Invalid password', errorCode: 'INVALID_CREDENTIALS'})

  const refreshToken = createRefreshToken(user)
  const accessToken  = createAccessToken(user)

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    accessToken,
    refreshToken
  }

}



// { service for Forgot, Reset Passwords }

// Forgot password 
export async function serviceForgotPassword(email) {

  

}


// Reset password 
export async function serviceResetPassword(email) {

  

}