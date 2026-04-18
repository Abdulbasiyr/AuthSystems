
import { Worker } from "bullmq";
import { sendEmail } from "../emails/sendEmailCode.js";
import { redis } from "../configs/redis.js";


new Worker('emailQueue', async (job) => {

  const {email, token, code} = job.data
  await sendEmail({email, token, code})

}, {
  connection: redis,
  concurrency: 2,
  limiter: {
    max: 2,
    duration: 10000
  }
})