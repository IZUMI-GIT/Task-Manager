"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const authmiddleware_1 = __importDefault(require("../middlewares/authmiddleware"));
const { Router } = require("express");
const router = Router();
router.post("/signup", auth_controller_1.postSignup);
router.post("/signin", auth_controller_1.postSignin);
router.post("/logout", authmiddleware_1.default, auth_controller_1.postLogout);
exports.default = router;
