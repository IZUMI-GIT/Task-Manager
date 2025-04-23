import { postLogout, postSignin, postSignup } from "../controllers/auth.controller";
import userMiddleware from "../middlewares/authmiddleware";

const { Router } = require("express")

const router = Router();

router.post("/signup", postSignup)

router.post("/signin", postSignin)

router.post("/logout",userMiddleware, postLogout)

export default router;