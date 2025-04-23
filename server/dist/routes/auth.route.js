"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const { Router } = require("express");
const router = Router();
router.post("/signup", auth_controller_1.postSignup);
router.get("/signin", auth_controller_1.postSignin);
router.post("/logout", auth_controller_1.postLogout);
exports.default = router;
