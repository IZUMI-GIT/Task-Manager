"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogout = exports.postSignin = exports.postSignup = void 0;
const client_1 = require("../../prisma/prisma/generated/client");
const jwt = require("jsonwebtoken");
const prisma = new client_1.PrismaClient();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = require("zod");
const config_1 = require("../config");
const jwtSecret = config_1.config.jwtSecret;
const setTokenAndCookie = (res, userId) => {
    const token = jwt.sign({ userId }, jwtSecret);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ✅ secure in production
        sameSite: "lax", // optional but good for CSRF protection
    });
};
const postSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, userName, password, email } = req.body;
    const signUpSchema = zod_1.z.object({
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
        userName: zod_1.z.string(),
        password: zod_1.z.string().min(8),
        email: zod_1.z.string().email()
    });
    const newUserCheck = signUpSchema.safeParse({
        firstName,
        lastName,
        userName,
        password,
        email
    });
    if (!newUserCheck.success) {
        return res.status(401).json({
            message: "Please enter details correctly"
        });
    }
    else {
        const user = yield prisma.user.findUnique({
            where: { email }
        });
        if (user) {
            return res.status(409).json({
                message: "Existing account with this email"
            });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                userName,
                passwordHash: hashedPassword
            }
        });
        setTokenAndCookie(res, newUser.id);
        return res.status(200).json({
            message: "user registered successfully and logged in",
            user: {
                id: newUser.id,
                userName,
                email
            }
        });
    }
});
exports.postSignup = postSignup;
const postSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Entered here...001");
    const password = req.body.password;
    const email = req.body.email;
    const signinSchema = zod_1.z.object({
        password: zod_1.z.string().min(8),
        email: zod_1.z.string().email()
    });
    const schemaResult = signinSchema.safeParse({ password, email });
    if (!schemaResult.success) {
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }
    const user = yield prisma.user.findUnique({
        where: { email }
    });
    if (user) {
        const isMatch = yield bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({
                message: "Credetials are wrong"
            });
        }
        else {
            setTokenAndCookie(res, user === null || user === void 0 ? void 0 : user.id);
            return res.status(200).json({
                message: "User logged in",
                user: {
                    id: user.id,
                    userName: user.email,
                    email
                }
            });
        }
    }
    else {
        return res.status(401).json({
            message: "User not found"
        });
    }
});
exports.postSignin = postSignin;
const postLogout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "Logged out"
    });
};
exports.postLogout = postLogout;
