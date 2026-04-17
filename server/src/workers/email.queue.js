
import {Queue} from 'bullmq'
import { redis } from '../configs/redis'

export const emailQueue = new Queue('emailQueue', {
  connection: redis
})