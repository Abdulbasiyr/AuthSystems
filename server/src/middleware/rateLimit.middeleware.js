import { redis } from "../configs/redis"



export const rateLimit = async (req, res, next) => {
  const ip  = req.ip
  let key;

  if(req.body?.email) {
    key = `rate:${ip}:${req.body.email}`
  } else {
    key = `rate:${ip}`
  }

  const count = await redis.incr(key)

  if(count === 1 ) await redis.expire(key, 90)
  
  if(count > 5) {
    res.status(429).json({message: 'Too many requests. Please try again later'})
  }

  next()
}