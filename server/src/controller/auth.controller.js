import { serviceLogin, serviceSignUp } from "../services/auth.service.js"
import { resCookie } from "../utils/cookie.utils.js"
import { validateLogin, validateSignUp } from "../validation/auth.validation.js"


// controller Sign Up
export async function controllerSignUp(req, res, next) {

  try {

    const validatedData = validateSignUp(req.body)
    const user          = await serviceSignUp(validatedData)
    const {refreshToken, userData} = user
    resCookie(res, refreshToken)
    res.status(201).json(userData)
  } catch(err) {
    next(err)
  }

}


// controller Login
export async function controllerLogin(req, res, next) {

  try {

    const validatedData = validateLogin(req.body)
    const user          = await serviceLogin(validatedData)
    const {refreshToken, userData} = user
    resCookie(res, refreshToken)
    res.status(200).json(userData)
  } catch(err) {
    next(err)
  }

}