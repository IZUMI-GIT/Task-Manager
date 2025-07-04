import { PrismaClient } from "../../prisma/prisma/generated/client"
import { Request, Response } from "express";
const z = require('zod');

const prisma = new PrismaClient();

export const postBoard = async (req : Request, res : Response) => {

    const {userId, title, lists} : {
        userId :  number,
        title :  string,
        lists? : {title : string}[]
    } = req.body

    const boardSchema = z.object({
        userId : z.number(),
        title : z.string(),
    })

    const schemaResult = boardSchema.safeParse({userId, title})

    if(!schemaResult.success){
        return res.status(400).json({
            message : "Wrong inputs"
        })
    }

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
            res.status(201).json({
                "message" : `Board name : '${boardData.title}' is created successfully`,
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
        const boardData = await prisma.board.findMany({
            where : {
                userId : userId
            },
            include : {lists : true}
        })

        const userData = await prisma.user.findUnique({
            where : {
                id : userId
            }            
        })

        if(!boardData){
            res.status(500).json({
                'message' : "data not fetched"
            })
        }else{
            res. status(200).json({
                'message' : `BoardData fetched for ${userData?.userName}`,
                data : boardData
            })
        }
    }catch(e) {
        res.status(500).json({
            'message' : "internal error",
            'error' :  e
        })
    }
    
    return;
}

export const changeBoardName = async (req : Request, res : Response) => {

    const boardId = Number.parseInt(req.params.id);

    const {userId ,title} : {
        userId : number,
        title : string
    } = req.body

    const boardData = await prisma.board.findFirst({
        where : {
            id : boardId
        }
    })

    if(!boardData){
        return res.status(404).json({
            message : "board not Found"
        })
    }
    
    try{

        const updateBoardName =  await prisma.board.update({
            where : {
                id : boardId,
                userId
            },
            data: {
                title
            }
        })

        if(!updateBoardName){
            res.status(500).json({
                "message" :  "Internal Error"
            })
        }else{
            res.status(200).json({
                "message" : "Board name updated successfully",
                "boardName" : title
            })
        }}
        catch(e) {
            res.status(500).json({
                "message" : "Updation Failed",
                "error" : e
            })
    }

    return;
}


export const deleteBoard = async (req : Request, res : Response) => {

    const boardId = Number.parseInt(req.params.id);
    const {userId} : {
        userId : number
    } = req.body;

    try{
        const boardData = await prisma.board.delete({
            where : {
                id :  boardId,
                userId
            }
        })

        if(!boardData){
            res.status(403).json({
                "message" : "Deletion not worked - bad request",
            })
        }else{
            res.status(204).json({
                "message" : `Board : '${boardData.title}' is deleted successfully`,
            })
        }
    }catch(e) {
        res.status(500).json({
            "message" : "Internal Error",
            "error" : e
        })
    }
}