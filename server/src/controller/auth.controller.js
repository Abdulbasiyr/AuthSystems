

import { serviceForgotPassword, serviceLogin, serviceResetPassword, serviceSignUp, serviceVerifyCode } from "../services/auth.service.js"
import { catchAsync } from "../utils/catchAsync.js"
import { resCookie } from "../utils/cookie.utils.js"
import { validateCode, validateEmail, validateLogin, validateSignUp } from "../validation/auth.validation.js"
import { emailQueue } from "../workers/email.queue.js"



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

  const parsedEmail = validateEmail(req.body)
  const dataService = await serviceForgotPassword(parsedEmail.email)
  if(!dataService) return res.status(200).json({ message: 'The confirmation code has been sent to your email address' })


  return res.status(200).json({ message: 'The confirmation code has been sent to your email address' })

}) 


// verify code controller
export const controllerVerifyCode = catchAsync(async (req, res) => {

  const parsedData = validateCode(req.body)
  const result     = await serviceVerifyCode(parsedData.code)

})

// reset password 
export const controllerResetPassword = catchAsync(async (req, res) => {

  const parsedEmail = validateEmail(req.body)
  const result      = serviceResetPassword(parsedEmail.email)

})