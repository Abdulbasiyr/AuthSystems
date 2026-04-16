
import nodemailer from "nodemailer"
import 'dotenv/config'

import { AppError } from "../utils/AppError.js"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // App Password
  }
})

export async function sendEmail({ email, token, code }) {
  try {
    if (!email || !token || !code) {
      throw new AppError("Invalid email payload", 400)
    }

    const url = `${process.env.CLIENT_URL}/reset-password?token=${encodeURIComponent(token)}`

    const info = await transporter.sendMail({
      from: `Auth App <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your password",
      html:`
        <h2>Password Reset</h2>
        <p>Your code: <b>${code}</b></p>
        <p><a href="${url}">Reset Password</a></p>
        <p>If you didn’t request this — ignore</p>
      `
    })

    return info

  } catch (err) {
    throw new AppError("Email send failed", 500, {
      techMessage: err.message,
      errorCode: "EMAIL_SEND_FAILED"
    })
  }
}