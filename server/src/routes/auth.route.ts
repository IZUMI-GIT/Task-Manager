import { postLogout, postSignin, postSignup } from "../controllers/auth.controller";

const { Router } = require("express")

const router = Router();

router.post("/signup", postSignup)

router.get("/signin", postSignin)

router.post("/logout", postLogout)

export default router;