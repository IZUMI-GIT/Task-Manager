import { NextFunction, Request, Response } from "express";


function loggerMiddleware (req : Request, res : Response, next : NextFunction){

    console.log("*----Request log-----*");
    console.log(`URL : ${req.originalUrl}`);
    console.log(`Method : ${req.method}`);
    console.log("Body : " , req.body);
    console.log("Params : " , req.params);
    console.log("Query : " , req.query);
    console.log("---close---");
    next();
}

export default loggerMiddleware;