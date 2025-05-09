import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/prisma/generated/client";
const jwt = require("jsonwebtoken")
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import { z } from 'zod';
import { config } from "../config";

const jwtSecret = config.jwtSecret;


const setTokenAndCookie = (res : Response, userId : number) => {
    const token = jwt.sign({userId}, jwtSecret);
        res.cookie("token", token, {
            httpOnly : true,
            secure: process.env.NODE_ENV === "production", // ✅ secure in production
            sameSite: "lax", // optional but good for CSRF protection
        });
}

export const postSignup = async (req : Request, res : Response) => {
     
    const { firstName, lastName, userName, password, email }: {
        firstName: string;
        lastName: string;
        userName: string;
        password: string;
        email: string;
      } = req.body; 

    const signUpSchema =  z.object({
        firstName : z.string(),
        lastName : z.string(),
        userName : z.string(),
        password : z.string(),
        email : z.string().email()
    })

    
    const newUserCheck = signUpSchema.safeParse({
        firstName,
        lastName,
        userName,
        password,
        email
    })

    if(!newUserCheck.success){
        return res.status(401).json({
            message :  "Please enter details correctly"
        })
    }else{
        
        const user = await prisma.user.findUnique({
            where : {email}
        })
    
        if(user){
            return res.status(409).json({
                message : "Existing account with this email"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser  = await prisma.user.create({
            data : {
                firstName,
                lastName,
                email,
                userName,
                passwordHash : hashedPassword
            }
        })

        setTokenAndCookie(res, newUser.id);

        return res.status(200).json({
            message: "user registered successfully and logged in",
            user : {
                id : newUser.id,
                userName,
                email
            }
        })
    }    
}

export const postSignin = async (req : Request, res : Response) => {

    const password = req.body.password;
    const email = req.body.email;

    const user = await prisma.user.findUnique({
        where : {email}
    })

    if(user){
        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if(!isMatch){
            return res.status(401).json({
                message : "Credetials are wrong"
            })
        }else{
            setTokenAndCookie(res, user?.id);


            return res.status(200).json({
                message : "User logged in",
                user : {
                    id : user.id,
                    userName : user.email,
                    email
                }
            })
        }
    }else{
        return res.status(401).json({
            message : "User not found"
        })
    }
}

export const postLogout = (req : Request, res : Response) => {
    res.clearCookie("token");
    res.json({
        message : "Logged out"
    })
}