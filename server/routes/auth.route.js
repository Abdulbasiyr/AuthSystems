
import { Router } from "express";
import { controllerLogin, controllerSignUp } from "../controller/auth.controller";

const router = Router()


router.post('/signup', controllerSignUp)
router.post('/login', controllerLogin)


export default router