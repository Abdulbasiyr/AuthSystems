
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
    const user = await createUser({name, email, hashedPassword})
    
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
    if(err?.code === 'P2002') {
      throw new AppError('User already exists','Email exists', 409, true)
    }
    throw new AppError('Sign up failed due to server error', err.message, 500, false)
  }

}


// service Login
export async function serviceLogin(data) {

    
  const user = await findUserByEmail(data.email)
  if(!user) throw new AppError('Email or password invalid', 'Email invalid', 401, true)

  const isValidPassword = await bcrypt.compare(data.password, user.password)
  if(!isValidPassword) throw new AppError('Email or password invalid', 'Password invalid', 401, true) 

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