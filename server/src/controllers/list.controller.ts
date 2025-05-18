import { Request, Response } from "express"
import { createListService, getListService, listDelete, listTitleChange } from "../services/list.service"
import { List } from "../../prisma/prisma/generated/client"

type createListResult =
        | { error: true; message: string }
        | { error: false; list: List }

export const createList = async (req : Request, res: Response) => {
    
    const {userId, title} : {
        userId : number,
        title : string
    } = req.body

    const boardId =  Number(req.params.boardId)
    console.log(req.params.boardId)

    const result : createListResult = await createListService(userId, boardId, title);

    if(result.error){
        res.status(400).json({
            message : result.message
        })
    }else{
        res.status(201).json({
            list : result.list
        })
    }
    
}


export const getLists = async (req: Request, res : Response) => {

    const {userId} : {
        userId : number
    } = req.body

    const boardId = Number(req.params.boardId)

    const fetchedLists = await getListService(boardId, userId)

    if(fetchedLists.error){
        res.status(400).json({
            message : fetchedLists.message
        })
    }else{
        res.status(200).json({
            message : fetchedLists.list
        })
    }
}

export const changeListName = async (req : Request, res: Response) => {
    const listId = Number(req.params.listId);
    const boardId = Number(req.params.boardId);

    const {title}:{
        title : string
    } = req.body;

    const changedResult =await listTitleChange(boardId, listId, title);

    if(changedResult.error){
        res.status(400).json({
            message : changedResult.message
        })
    }else{
        res.status(200).json({
            message : changedResult.message
        })
    }
}

export const deleteList = async (req : Request, res : Response) => {
    const listId = Number(req.params.listId);
    const boardId = Number(req.params.boardId);

    const deletedResult = await listDelete(listId, boardId);

    if(deletedResult.error){
        res.status(400).json({
            message : deletedResult.message
        })
    }else{
        res.status(204).json({
            message : deletedResult.message
        })
    }
}