import { redis } from "../configs/redis"



export const reteLimit = async (req, res, next) => {
  const ip  = req.ip
  const key = `rate:${ip}`

  const count = await redis.incr(key)

  if(count <= 5 ) await redis.expire(key, 60)
  
  if(count > 5) {
    res.status(429).json({message: 'Too many requests. Please try again later'})
  }

  next()
}