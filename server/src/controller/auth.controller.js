

import { serviceForgotPassword, serviceLogin, serviceResetPassword, serviceSignUp } from "../services/auth.service.js"
import { AppError } from "../utils/app.error.js"
import { catchAsync } from "../utils/catchAsync.js"
import { resCookie } from "../utils/cookie.utils.js"
import { validateEmail, validateLogin, validatePassword, validateSignUp } from "../validation/auth.validation.js"



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
  if(!dataService) return res.status(200).json({})

  return res.status(200).json({})

}) 


// reset password 
export const controllerResetPassword = catchAsync(async (req, res) => {

  const token           = req.query?.token
  const { newPassword } = req.body 

  const password = validatePassword({password: newPassword})
  await serviceResetPassword({token, password}) 

  return res.sendStatus(204)

})