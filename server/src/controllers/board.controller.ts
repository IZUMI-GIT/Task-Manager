import { PrismaClient } from "../../prisma/prisma/generated/client"
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const postBoard = async (req : Request, res : Response) => {

    const {userId, title, lists} : {
        userId :  number,
        title :  string,
        lists? : {title : string}[]
    } = req.body

    try {
        const boardData =  await prisma.board.create({
            data : {
                title,
                userId,
                lists : {
                    create : [
                        {title : "To-Do", position : 0},
                        {title : "On hold", position : 1},
                        {title : "Done", position : 2}
                ],
                }
            },
            include : {lists : true}
        })

        if(!boardData){
            res.status(500).json({
                    "message" : "Board not created"
                })
        }else{
            res.status(200).json({
                "message" : `Board ${boardData.title} is created`,
                "data" : boardData
            })
        }
    } catch(e) {
        res.status(500).json({
            message: "Error creating board",
            error: e
        });
    }

    return;
}


export const getBoard = async (req : Request, res : Response) => {

    const {userId} : {
        userId : number
    } = req.body

    try {
        const boardData = await prisma.board.findMany{
            
        }
    }

    
    return;
}