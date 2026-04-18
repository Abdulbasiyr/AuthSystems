import { redis } from "../configs/redis"




export const authAttempts = async(req, res, next) => {

  const key = 'request: '

  const count = await redis.incr(key)

  if(count <= 5) await redis.expire(key, 120)

  if(count > 5) {
    return res.status(403).json({message: 'Too many requests. Plesage try again later'})
  }

}