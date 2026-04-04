
import bcrypt from 'bcrypt'
import { createUser, findUserByEmail } from '../repositorys/auth.repository'
import { createAccessToken, createRefreshToken } from '../utils/token.utils'
import { resCookie } from '../utils/cookie.utils'
import { validateLogin } from '../validation/auth.validation'
import { AppError } from '../utils/app.error'

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
      throw new AppError('User already exists', 401)
    }
    throw err
  }

}


// service Login
export async function serviceLogin(data) {

  try {
    
    const validatedData = validateLogin(data)
    const user = await findUserByEmail(validatedData.email)
    if(!user) throw new AppError('Email or password invalid', 401)

    const isValidPassword = bcrypt.compare(validatedData.password, user.password)
    if(!isValidPassword) throw new AppError('Email or password invalid', 401)

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
    throw err
  }

}