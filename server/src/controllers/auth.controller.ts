import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/prisma/generated/client";
const jwt = require("jsonwebtoken")
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { z } from 'zod';

dotenv.config(); // This reads your .env file

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error("JWT_SECRET is not defined");

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

    const user = await prisma.user.findUnique({
        where : {email}
    })

    if(user){
        return res.status(404).json({
            message : "Existing account with this email"
        })
    }
    const newUserCheck = signUpSchema.safeParse({
        firstName,
        lastName,
        userName,
        password,
        email
    })

    if(!newUserCheck.success){
        return res.status(404).json({
            message :  "Please enter details correctly"
        })
    }else{
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

        const token = jwt.sign({userId : newUser.id}, jwtSecret);
        res.cookie("token", token, {
            httpOnly : true,
            secure: process.env.NODE_ENV === "production", // ✅ secure in production
            sameSite: "lax", // optional but good for CSRF protection
        });

        return res.status(200).json({
            message: "user registered successfully and logged in"
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
            return res.status(404).json({
                message : "Credetials are wrong"
            })
        }else{
            const token = jwt.sign({userId : user?.id},jwtSecret);
            res.cookie("token", token, {
                httpOnly : true,
                secure: process.env.NODE_ENV === "production", // ✅ secure in production
                sameSite: "lax", // optional but good for CSRF protection
            })

            return res.status(200).json({
                message : "User logged in"
            })
        }
    }else{
        return res.status(404).json({
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