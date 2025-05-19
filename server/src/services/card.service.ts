import { PrismaClient } from "../../prisma/prisma/generated/client";
const prisma = new PrismaClient()

const z = require('zod');

export const createCardService = async (userId : number, boardId : number, listId : number, task : string) =>{

    const cardSchema = z.object({
        userId : z.number(),
        boardId : z.number(),
        listId : z.number(),
        task : z.string()
    })

    const zodResult = cardSchema.safeParse({userId, boardId, listId, task})

    if(!zodResult.success){
        return {error : true, message : "enter correct details"}
    }

    const listData = await prisma.list.findUnique({
        where : {
            boardId : boardId,
            id : listId
        }
    })

    if(!listData){
        return {error : true, message : "board and list not found"}
    }

    const cardCount = await prisma.card.findMany({
        where : {
            listId
        },
        orderBy : {
            position : "desc"
        }
    })

    let newPosition = cardCount.length > 0 ? cardCount[0].position + 1 : 0;

    try{
        const cardCreated = await prisma.card.create({
            data : {
                task,
                position : newPosition,
                listId
            }
        })

        return {error : false, message : cardCreated}
    }catch(e){
        return {error : true, message : "List not created " +  (e as Error).message
        }
    }
}

export const getCardService = async (userId : number, boardId : number, listId : number) => {

    const cardSchema = z.object({
        userId : z.number(),
        boardId : z.number(),
        listId : z.number()
    })

    const schemaResult = cardSchema.safeParse({userId, boardId, listId})

    if(!schemaResult.success) { 
        return {error : false, message : "Validation failed"}
    }

    const listData = await prisma.list.findUnique({
        where : {
            id : listId,
            boardId
        }
    })

    if(!listData){
        return {error : false, message : "list doesn't exist"}
    }

    try {
        const cardData = await prisma.card.findMany({
            where : {
                listId
            }
        })

        return {error : true, message : cardData}
    }catch(e){
        return {error : false, message : "DB internal error " + (e as Error).message}
    }
}

export const patchCardService = async (userId : number, boardId : number, listId : number, cardId : number, task : string) => {

    const cardPatchSchema = z.object({
        userId : z.number(),
        boardId : z.number(),
        listId : z.number(),
        cardId : z.number(),
        task : z.string()
    })

    const schemaResult = cardPatchSchema.safeParse({
        userId,
        boardId,
        listId,
        cardId,
        task
    })

    if(!schemaResult.success){
        return {error : true, message : "enter correct fields"}
    }

    const existingList = await prisma.list.findUnique({
        where : {
            boardId,
            id : listId
        }
    })

    if(!existingList){
        return {error : true, message : "board not found"}
    }else{
        const existingCard = await prisma.card.findUnique({
            where : {
                id : cardId,
                listId
            }
        })

        if(!existingCard){
            return {error : true, message : "Card not found"}
        }

        try {
            const cardPatched = await prisma.card.update({
                data : {
                    task
                },
                where : {
                    id : cardId,
                    listId
                }
            })

            return {error : false , message : "card updated " + cardPatched.task }
        }catch (e){
            return {error : true, message : "DB Internal error " + (e as Error).message}
        }
    }
}

export const checklistCardService = async (boardId : number, listId : number, cardId : number) => {

    const cardcheckSchema = z.object({
        boardId :  z.number(),
        listId : z.object(),
        cardId : z.object()
    })

    const schemaResult = cardcheckSchema.safeParse({boardId, listId, cardId})

    if(!schemaResult){
        return {error : true, message : "enter valid details"}
    }const existingList = await prisma.list.findUnique({
        where : {
            boardId,
            id : listId
        }
    })

    if(!existingList){
        return {error : true, message : "board not found"}
    }else{
        const existingCard = await prisma.card.findUnique({
            where : {
                id : cardId,
                listId
            }
        })

        if(!existingCard){
            return {error : true, message : "Card not found"}
        }

        try {
            const cardPatched = await prisma.card.update({
                data : {
                    checklists : true
                },
                where : {
                    id : cardId,
                    listId
                }
            })

            return {error : false , message : "card updated " + cardPatched.task }
        }catch (e){
            return {error : true, message : "DB Internal error " + (e as Error).message}
        }
    }
}


export const deleteCardService = async (userId : number, boardId : number, listId : number, cardId : number) => {

    const cardPatchSchema = z.object({
        userId : z.number(),
        boardId : z.number(),
        listId : z.number(),
        cardId : z.number()
    })

    const schemaResult = cardPatchSchema.safeParse({
        userId,
        boardId,
        listId,
        cardId
    })

    if(!schemaResult.success){
        return {error : true, message : "enter correct fields"}
    }

    const existingList = await prisma.list.findUnique({
        where : {
            boardId,
            id : listId
        }
    })

    if(!existingList){
        return {error : true, message : "board and list not found"}
    }else{
        const existingCard = await prisma.card.findUnique({
            where : {
                id : cardId,
                listId
            }
        })

        if(!existingCard){
            return {error : true, message : "Card not found"}
        }

        try {
            const cardPatched = await prisma.card.delete({
                where : {
                    id : cardId,
                    listId
                }
            })

            return {error : false , message : "card deleted " + cardPatched }
        }catch (e){
            return {error : true, message : "DB Internal error " + (e as Error).message}
        }
    }
}