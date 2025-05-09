import {z} from "zod"
import { List, PrismaClient } from "../../prisma/prisma/generated/client"
import { error } from "console";

const prisma = new PrismaClient()

export const createListService  = async (userId : number, boardId : number, title : string) : Promise<
| { error: true; message: string }
| { error: false; list: List }
> => {

    const listSchema = z.object({
        userId : z.number(),
        boardId : z.number(),
        title : z.string().min(3)
    })

    const schemaResult = listSchema.safeParse({userId, boardId, title})

    if(!schemaResult.success) {
        return {error : true, message : "Validation failed"}
    }

    const existingBoard =  await prisma.board.findUnique({
        where : {
            id : boardId
        }
    })

    if(!existingBoard){
        return {error : true, message : "board not found"}
    }

    const listcount = await prisma.list.findMany({
        where : {
            boardId
        },
        orderBy : { position : "desc"},
    })

    const newPosition =  listcount.length > 0 ? listcount[0].position + 1 : 0;

    try {
        const listcreated = await prisma.list.create({
            data : {
                title,
                boardId,
                position : newPosition
            }
        })
    
        return { error: false, list : listcreated}    
    }catch(e){
        return { error : true, message : "Database Error" + (e as Error).message}
    }
    
}


export const getListService = async (boardId : number, userId : number) =>{

    const listSchema = z.object({
        userId : z.number(),
        boardId : z.number(),
    })

    const schemaResult = listSchema.safeParse({userId, boardId})

    if(!schemaResult.success){
        return {error : false, message : "Validation failed"}
    }

    const boardData = await prisma.board.findUnique({
        where: {
            id : boardId,
            userId,
        }
    })

    if(!boardData){
        return {error : false, message : "board doesn't exist"}
    }

    try{
        const listsData = await prisma.list.findMany({
            where: {
                boardId
            }
        })
    
        return {error : true, list : listsData}

    }catch(e){
        return {error : false, message : "DB error" + (e as Error).message}
    }
}


export const listTitleChange = async (boardId : number, listId: number, title: string) =>{

    const listData = await prisma.list.findUnique({
        where: {
            boardId,
            id : listId
        }
    })

    if(!listData){
        return {error : false, message : "List not found"}
    }

    try{    
        const changingListTitle = await prisma.list.update({
            data: {
                title
            },
            where : {
                id: listId,
                boardId
            }
        })

        return {error : true, message : "list title changed " + changingListTitle}

    }catch(e){
        return {error : false, message : "Internal error" + (e as Error).message}
    }

}

export const listDelete = async (listId : number, boardId : number) => {

    const listData = await prisma.list.findUnique({
        where : {
            boardId,
            id : listId
        }
    })

    if(!listData){
        return {error : false, message : "List not found"}
    }

    try{
        const letsDelete = await prisma.list.delete({
            where : {
                boardId,
                id : listId
            }
        })

        return {error : true, message : "List deleted" + letsDelete};

    }catch(e){
        return {error : false, message : "Internal error" + (e as Error).message}
    }
}