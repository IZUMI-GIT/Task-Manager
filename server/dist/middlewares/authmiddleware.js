"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
let jwtSecret = config_1.config.jwtSecret;
function userMiddleware(req, res, next) {
    const jwtToken = req.cookies.token;
    console.log(jwtToken);
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
        res.status(401).json({
            msg: e
        });
    }
}
exports.default = userMiddleware;
