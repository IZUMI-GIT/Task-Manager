import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken")
import { JwtPayload } from "jsonwebtoken";
import { config } from "../config"

let jwtSecret = config.jwtSecret;

function authMiddleware(req :Request , res : Response, next : NextFunction) {
    const jwtToken = req.cookies.token;
    console.log(jwtToken)

    try{
        let decoded =  jwt.verify(jwtToken, jwtSecret) as JwtPayload;

        if(!decoded.userId){
            res.status(403).json({
                message : "You are not authenticated"
        })
        }
        req.body.userId = decoded.userId;
        next();
    }catch(e){
        res.status(401).json({
            msg : e 
        })
    }
}

export default authMiddleware;