

import { serviceForgotPassword, serviceLogin, serviceSignUp } from "../services/auth.service.js"
import { catchAsync } from "../utils/catchAsync.js"
import { resCookie } from "../utils/cookie.utils.js"
import { validateEmail, validateLogin, validateSignUp } from "../validation/auth.validation.js"
import { sendEmail } from '../utils/sendEmailCode.js'


// controller Sign Up
export const controllerSignUp = catchAsync(async (req, res) => {

  const validatedData = validateSignUp(req.body)
  const user          = await serviceSignUp(validatedData)
  console.log(user)
  const {refreshToken, userData} = user
  resCookie(res, refreshToken)
  res.status(201).json(userData)

})


// controller Login
export const controllerLogin = catchAsync(async (req, res) => {

  const validatedData = validateLogin(req.body)
  const result        = await serviceLogin(validatedData)
  const {refreshToken, userData} = result
  resCookie(res, refreshToken)
  res.status(200).json(userData)

})



// { Forgot & Reset Passwords logic }

// forgot password controller
export const controllerForgotPassword = catchAsync(async (req, res) => {

  const validatedEmail = validateEmail(req.body)
  const data           = await serviceForgotPassword(validatedEmail.email)
  if(!data) return res.status(200).json({ message: 'The confirmation code has been sent to your email address' })

  const info = await sendEmail({email: validatedEmail.email, token: data.token, code: data.code})
  return res.status(200).json({ message: 'The confirmation code has been sent to your email address' })

}) 



// reset password 
export const controllerResetPassword = catchAsync(async (req, res) => {

  

})