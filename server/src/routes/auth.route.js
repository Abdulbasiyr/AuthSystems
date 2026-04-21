
import { Router } from "express";
import { controllerForgotPassword, controllerGetProfile, controllerLogin, controllerResetPassword, controllerSignUp } from "../controller/auth.controller.js";

const router = Router()


router.post('/signup', controllerSignUp)
router.post('/login', controllerLogin)

router.post('/forgot-password', controllerForgotPassword)
router.post('/reset-password', controllerResetPassword)

router.get('/profile', controllerGetProfile)

export default router