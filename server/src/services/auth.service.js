
import bcrypt from 'bcrypt'
import { createUser, findUserByEmail } from '../repositorys/auth.repository.js'
import { createAccessToken, createRefreshToken } from '../utils/token.utils.js'
import { resCookie } from '../utils/cookie.utils.js'
import { validateLogin } from '../validation/auth.validation.js'
import { AppError } from '../utils/app.error.js'

const SALT_ROUNDS = 10


// service Sign Up
export async function serviceSignUp(data) {

  const { name, email, password } = data

  try {

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await createUser({name, email, hashedPassword})
    
    const refreshToken = createRefreshToken(user)
    const accessToken = createAccessToken(user)
    resCookie(refreshToken)

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken
    }

  } catch(err) {
    if(err?.code === 'P2002') {
      throw new AppError({userMessage: 'User already exists', techMessage: 'Email exists', statusCode: 409, isOperational: true})
    }
    throw new AppError({userMessage: 'Sign up failed due to server error', techMessage: err.message, statusCode: 500, isOperational: false})
  }

}


// service Login
export async function serviceLogin(data) {

    
  const user = await findUserByEmail(data.email)
  if(!user) throw new AppError({userMessage: 'Email or password invalid', techMessage: 'Email invalid', statusCode: 401, isOperational: true})

  const isValidPassword = await bcrypt.compare(data.password, user.password)
  if(!isValidPassword) throw new AppError({userMessage: 'Email or password invalid', techMessage: 'Password invalid', statusCode: 401, isOperational: true}) 

  const refreshToken = createRefreshToken(user)
  const accessToken = createAccessToken(user)

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    accessToken,
    refreshToken
  }


}