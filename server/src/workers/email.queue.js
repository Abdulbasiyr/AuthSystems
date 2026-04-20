
import 'dotenv/config'
import {Queue} from 'bullmq'
// import { redis } from '../configs/redis.js'


export const emailQueue = new Queue('emailQueue');


// export const emailQueue = new Queue('emailQueue', {
//   connection: redis,
//   defaultJobOptions: {
//     attempts: 3,
//     backoff: {
//       type: 'exponential',
//       delay: 5000
//     },
//     removeOnComplete: true
//   },
// })