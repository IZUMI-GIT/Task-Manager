"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret)
    throw new Error("JWT_SECRET is not found");
function userMiddleware(req, res, next) {
    var _a;
    const token = req.headers.cookie;
    console.log(token);
    const jwtToken = (_a = token === null || token === void 0 ? void 0 : token.split(";").find(c => c.trim().startsWith("token="))) === null || _a === void 0 ? void 0 : _a.split("=")[1];
    try {
        let decoded = jwt.verify(jwtToken, jwtSecret);
        if (!decoded.userId) {
            res.status(403).json({
                message: "You are not authenticated"
            });
        }
        req.body.userId = decoded.userId;
        next();
    }
    catch (e) {
        res.json({
            msg: e
        });
    }
}
exports.default = userMiddleware;
