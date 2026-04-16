
import crypto from 'crypto'

import { serviceForgotPassword, serviceLogin, serviceSignUp } from "../services/auth.service.js"
import { catchAsync } from "../utils/catchAsync.js"
import { resCookie } from "../utils/cookie.utils.js"
import { validateEmail, validateLogin, validateSignUp } from "../validation/auth.validation.js"


// controller Sign Up
export const controllerSignUp = catchAsync(async (req, res) => {

  const validatedData = validateSignUp(req.body)
  const user          = await serviceSignUp(validatedData)
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

// forgot password
export const controllerForgotPassword = catchAsync(async (req, res) => {

  const validatedEmail = validateEmail(req.body)
  const result         = await serviceForgotPassword(validatedEmail)


}) 



// reset password 
export const controllerResetPassword = catchAsync(async (req, res) => {

  

})