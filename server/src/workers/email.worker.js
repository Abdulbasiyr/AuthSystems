import { sendEmail } from "../emails/sendEmailCode";


export async function HandleEmailJob(job) {
  if(job.type === 'RESET_PASSWORD') await sendEmail(job.data)
}