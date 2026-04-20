
import { Router } from "express";
import { controllerForgotPassword, controllerLogin, controllerResetPassword, controllerSignUp, controllerVerifyCode } from "../controller/auth.controller.js";

const router = Router()


router.post('/signup', controllerSignUp)
router.post('/login', controllerLogin)

router.post('/forgot-password', controllerForgotPassword)
router.post('/reset-password', controllerResetPassword)


export default router