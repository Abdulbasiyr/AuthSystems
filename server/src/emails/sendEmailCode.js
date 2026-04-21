
import 'dotenv/config'
import nodemailer from "nodemailer"

import { AppError } from "../utils/app.error.js"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS // App Password
  }
})

export async function sendEmail(user) {
  try {
    console.log('send email start')
    if (!user.email || !user.token) {
      throw new AppError({ userMessage: "Invalid email payload", statusCode: 400, techMessage: 'One of data is not for send RESET PASSWORD', errorCode: 'EMAIL_SEND_FAILED'})
    }

    const url = `${process.env.RESET_PASSWORD_URL}?token=${encodeURIComponent(user.token)}`

    const info = await transporter.sendMail({
      from: `Auth App <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject: "Reset your password",
      html:`
        <h2>Password Reset</h2>
        <button><a href="${url}">Reset Password</a></button>
        <h3>If you didn’t request this — ignore</h3>
      `
    })

    return info

  } catch (err) {
    throw new AppError({ userMessage: "Something went wrong. Plesage try again later", statusCode: 500, techMessage: err?.message, errorCode: "EMAIL_SEND_FAILED"})
  }
}