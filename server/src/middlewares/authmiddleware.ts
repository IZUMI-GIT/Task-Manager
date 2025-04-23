import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken")
import dotenv from "dotenv"
import { JwtPayload } from "jsonwebtoken";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if(!jwtSecret) throw new Error("JWT_SECRET is not found")

function userMiddleware(req :Request , res : Response, next : NextFunction) {
    const token = req.headers.cookie;
    console.log(token)

    const jwtToken = token?.split(";").find(c => c.trim().startsWith("token="))?.split("=")[1]

    try{
        console.log("Hello")
        let decoded =  jwt.verify(jwtToken, jwtSecret) as JwtPayload;
        console.log(decoded)

        if(!decoded.userId){
            res.status(403).json({
                message : "You are not authenticated"
        })
        }

        req.body.userId = decoded.userId;
        next();
    }catch(e){
        res.json({
            msg : e 
        })
    }
}

export default userMiddleware;