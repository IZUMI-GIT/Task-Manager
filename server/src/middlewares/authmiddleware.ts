import { Request, Response, NextFunction } from "express";

function userMiddleware(req :Request , res : Response, next : NextFunction) {
    const token = req.headers.cookie;

}