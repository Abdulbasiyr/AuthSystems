import { redis } from "../configs/redis"


export async function AuthAttempts(email) {

  const key = `auth:attempts:${email}`

  const count = await redis.incr(key)

  if(count === 1) await redis.expire(key, 120)

  if(count >= 5) {
    throw new AppError('Too many invalid password. Please try again later', 403, {techMessage: 'Too many invalid password', errorCode: 'TOO_MANY_ATTEMPTS'})
  }


}
