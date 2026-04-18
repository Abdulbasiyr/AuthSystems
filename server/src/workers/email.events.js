import { QueueEvents } from "bullmq";



const events = new QueueEvents('emailQueue')

events.on('completed', ({jobId}) => {
  console.log(`job: ${jobId} completed`)
})

events.on('failed', (jobId, failedReason) => {
  console.log(`job ${jobId} failed, ${failedReason}`)
})