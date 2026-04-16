

import "dotenv/config";
import { Resend } from "resend";
import { AppError } from "./app.error.js";

const resend = new Resend(process.env.RESEND_API_KEY);
const from = process.env.EMAIL_FROM || "Acme <onboarding@resend.dev>";


export async function sendEmail(user) {

  if(!user.email || !user.token || !user.code) throw new AppError('Invalid email payload', 400, {techMessage: 'One of the data is missing, RESEND', errorCode: 'SEND_CODE_FAILED'})

  const RESET_PASSWORD_URL = `${process.env.RESET_PASSWORD_URL}?token=${encodeURIComponent(user.token)}`

  const { data, error } = await resend.emails.send({
    from,
    to: [user.email],
    subject: "Reset your password",
    html: `<h2>Password Reset Request</h2>
    <p>Your verification code: ${user.code} </p>
    <p>Click link below to reset password:</p> <a href="${RESET_PASSWORD_URL}">Reset Password</a>
    <p>If you didn't request, ignore this email.</p>`,
  });

  if (error) throw new AppError('Something went wrong. Please try again later', 500, {techMessage: error?.message || 'Unknown error RESEND', errorCode: 'SEND_CODE_FAILED'})

}