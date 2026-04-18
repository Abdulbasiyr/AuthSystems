
import Redis from 'ioredis'
import 'dotenv/config'

export const redis = new Redis('redis://redis:6379', {
  maxRetriesPerRequest: null
})