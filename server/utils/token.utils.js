
import jwt from 'jsonwebtoken'
import 'dotenv/config'


export function createRefreshToken(data) {
  return jwt.sign(
    {id: data.id},
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: '7d' }
  )
}


export function createAccessToken(data) {
  return jwt.sign(
    {id: data.id},
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: '30m' }
  )
}