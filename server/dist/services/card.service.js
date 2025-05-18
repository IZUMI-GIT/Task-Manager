"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCardService = exports.patchCardService = exports.getCardService = exports.createCardService = void 0;
const client_1 = require("../../prisma/prisma/generated/client");
const prisma = new client_1.PrismaClient();
const z = require('zod');
const createCardService = (userId, boardId, listId, task) => __awaiter(void 0, void 0, void 0, function* () {
    const cardSchema = z.object({
        userId: z.number(),
        boardId: z.number(),
        listId: z.number(),
        task: z.string()
    });
    const zodResult = cardSchema.safeParse({ userId, boardId, listId, task });
    if (!zodResult.success) {
        return { error: true, message: "enter correct details" };
    }
    const listData = yield prisma.list.findUnique({
        where: {
            boardId: boardId,
            id: listId
        }
    });
    if (!listData) {
        return { error: true, message: "board and list not found" };
    }
    const cardCount = yield prisma.card.findMany({
        where: {
            listId
        },
        orderBy: {
            position: "desc"
        }
    });
    let newPosition = cardCount.length > 0 ? cardCount.length + 1 : 0;
    try {
        const cardCreated = yield prisma.card.create({
            data: {
                task,
                position: newPosition,
                listId
            }
        });
        return { error: false, message: cardCreated };
    }
    catch (e) {
        return { error: true, message: "List not created " + e.message
        };
    }
});
exports.createCardService = createCardService;
const getCardService = (userId, boardId, listId) => __awaiter(void 0, void 0, void 0, function* () {
    const cardSchema = z.object({
        userId: z.number(),
        boardId: z.number(),
        listId: z.number()
    });
    const schemaResult = cardSchema.safeParse({ userId, boardId, listId });
    if (!schemaResult.success) {
        return { error: false, message: "Validation failed" };
    }
    const listData = yield prisma.list.findUnique({
        where: {
            id: listId,
            boardId
        }
    });
    if (!listData) {
        return { error: false, message: "list doesn't exist" };
    }
    try {
        const cardData = yield prisma.card.findMany({
            where: {
                listId
            }
        });
        return { error: true, message: cardData };
    }
    catch (e) {
        return { error: false, message: "DB internal error " + e.message };
    }
});
exports.getCardService = getCardService;
const patchCardService = (userId, boardId, listId, cardId, task) => __awaiter(void 0, void 0, void 0, function* () {
    const cardPatchSchema = z.object({
        userId: z.number(),
        boardId: z.number(),
        listId: z.number(),
        cardId: z.number(),
        task: z.string()
    });
    const schemaResult = cardPatchSchema.safeParse({
        userId,
        boardId,
        listId,
        cardId,
        task
    });
    if (!schemaResult.success) {
        return { error: true, message: "enter correct fields" };
    }
    const existingList = yield prisma.list.findUnique({
        where: {
            boardId,
            id: listId
        }
    });
    if (!existingList) {
        return { error: true, message: "board not found" };
    }
    else {
        const existingCard = yield prisma.card.findUnique({
            where: {
                id: cardId,
                listId
            }
        });
        if (!existingCard) {
            return { error: true, message: "Card not found" };
        }
        try {
            const cardPatched = yield prisma.card.update({
                data: {
                    task
                },
                where: {
                    id: cardId,
                    listId
                }
            });
            return { error: false, message: "card updated " + cardPatched.task };
        }
        catch (e) {
            return { error: true, message: "DB Internal error " + e.message };
        }
    }
});
exports.patchCardService = patchCardService;
const deleteCardService = (userId, boardId, listId, cardId) => __awaiter(void 0, void 0, void 0, function* () {
    const cardPatchSchema = z.object({
        userId: z.number(),
        boardId: z.number(),
        listId: z.number(),
        cardId: z.number()
    });
    const schemaResult = cardPatchSchema.safeParse({
        userId,
        boardId,
        listId,
        cardId
    });
    if (!schemaResult.success) {
        return { error: true, message: "enter correct fields" };
    }
    const existingList = yield prisma.list.findUnique({
        where: {
            boardId,
            id: listId
        }
    });
    if (!existingList) {
        return { error: true, message: "board and list not found" };
    }
    else {
        const existingCard = yield prisma.card.findUnique({
            where: {
                id: cardId,
                listId
            }
        });
        if (!existingCard) {
            return { error: true, message: "Card not found" };
        }
        try {
            const cardPatched = yield prisma.card.delete({
                where: {
                    id: cardId,
                    listId
                }
            });
            return { error: false, message: "card deleted " + cardPatched };
        }
        catch (e) {
            return { error: true, message: "DB Internal error " + e.message };
        }
    }
});
exports.deleteCardService = deleteCardService;
