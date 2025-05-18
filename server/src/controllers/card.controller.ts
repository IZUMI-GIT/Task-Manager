import { Request, Response,  } from "express";
import { createCardService, deleteCardService, getCardService, patchCardService } from "../services/card.service";

export const createCard  = async (req : Request, res : Response) => {

    const {userId, task} : {
        userId : number,
        task : string
    } = req.body;

    const boardId : number = Number(req.params.boardId);
    const listId : number = Number(req.params.listId)

    const result = await createCardService(userId, boardId, listId, task);

    if(result.error){
        return res.status(400).json({
            message : result.message
        })
    }else{
        return res.status(201).json({
            message : result.message
        })
    }
}


export const getCards = async (req : Request, res :  Response) => {

    const {userId} :{
        userId : number
    } = req.body;

    const boardId : number = Number(req.params.boardId);
    const listId : number = Number(req.params.listId);


    const result = await getCardService(userId, boardId, listId);

    if(result.error){
        return res.status(400).json({
            message : result.message
        })
    }else{
        return res.status(200).json({
            message : result.message
        })
    }
}


export const patchCard = async (req : Request, res : Response) => {

    const {userId, task} : {
        userId : number,
        task : string
    } = req.body

    const boardId : number = Number(req.params.boardId);
    const listId : number = Number(req.params.listId);
    const cardId : number = Number(req.params.id);

    const result = await patchCardService(userId, boardId, listId, cardId, task)

    if(result.error){
        return res.status(400).json({
            message : result.message
        })
    }else{
        return res.status(200).json({
            message : result.message
        })
    }
}

export const deleteCard = async ( req : Request, res : Response) => {

    const {userId} : {
        userId : number
    } = req.body

    const boardId : number = Number(req.params.boardId);
    const listId : number = Number(req.params.listId);
    const cardId : number = Number(req.params.id);

    const result = await deleteCardService(userId, boardId, listId, cardId)

    if(result.error){
        return res.status(400).json({
            message : result.message
        })
    }else{
        return res.status(204).json({
            message : result.message
        })
    }

}