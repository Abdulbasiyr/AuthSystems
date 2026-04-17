
import { Worker } from "bullmq";
import { sendEmail } from "../emails/sendEmailCode";
import { redis } from "../configs/redis";


export const emailWorker = new Worker('emailQueue', async (job) => {

  const {email, token, code} = job.data
  await sendEmail({email, token, code})

}, {
  connection: redis
})