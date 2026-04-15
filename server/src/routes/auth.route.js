
import { Router } from "express";
import { controllerLogin, controllerSignUp } from "../controller/auth.controller.js";

const router = Router()


router.post('/signup', controllerSignUp)
router.post('/login', controllerLogin)
router.post('/forgot-password', )
router.post('/reset-password', )


export default router