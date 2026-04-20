
// import 'dotenv/config'
import { Worker } from "bullmq";
import { sendEmail } from "../emails/sendEmailCode.js";
import { redis } from "../configs/redis.js";


new Worker('emailQueue', async (job) => {

  const {email, token} = job.data
  await sendEmail({email, token})

}, {
  connection: redis,
  concurrency: 2,
  limiter: {
    max: 2,
    duration: 10000
  }
})