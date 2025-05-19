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
exports.listDelete = exports.listTitleChange = exports.getListService = exports.createListService = void 0;
const zod_1 = require("zod");
const client_1 = require("../../prisma/prisma/generated/client");
const prisma = new client_1.PrismaClient();
const createListService = (userId, boardId, title) => __awaiter(void 0, void 0, void 0, function* () {
    const listSchema = zod_1.z.object({
        userId: zod_1.z.number(),
        boardId: zod_1.z.number(),
        title: zod_1.z.string().min(3)
    });
    const schemaResult = listSchema.safeParse({ userId, boardId, title });
    if (!schemaResult.success) {
        return { error: true, message: "enter correct fields" };
    }
    const existingBoard = yield prisma.board.findUnique({
        where: {
            id: boardId
        }
    });
    if (!existingBoard) {
        return { error: true, message: "board not found" };
    }
    const listcount = yield prisma.list.findMany({
        where: {
            boardId
        },
        orderBy: { position: "desc" },
    });
    const newPosition = listcount.length > 0 ? listcount[0].position + 1 : 0;
    try {
        const listcreated = yield prisma.list.create({
            data: {
                title,
                boardId,
                position: newPosition
            }
        });
        return { error: false, list: listcreated };
    }
    catch (e) {
        return { error: true, message: "Database Error" + e.message };
    }
});
exports.createListService = createListService;
const getListService = (boardId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const listSchema = zod_1.z.object({
        userId: zod_1.z.number(),
        boardId: zod_1.z.number(),
    });
    const schemaResult = listSchema.safeParse({ userId, boardId });
    if (!schemaResult.success) {
        return { error: true, message: "Validation failed" };
    }
    const boardData = yield prisma.board.findUnique({
        where: {
            id: boardId,
            userId,
        }
    });
    if (!boardData) {
        return { error: true, message: "board doesn't exist" };
    }
    try {
        const listsData = yield prisma.list.findMany({
            where: {
                boardId
            }
        });
        return { error: false, list: listsData };
    }
    catch (e) {
        return { error: true, message: "DB error" + e.message };
    }
});
exports.getListService = getListService;
const listTitleChange = (boardId, listId, title) => __awaiter(void 0, void 0, void 0, function* () {
    const listData = yield prisma.list.findUnique({
        where: {
            boardId,
            id: listId
        }
    });
    if (!listData) {
        return { error: true, message: "List not found" };
    }
    try {
        const changingListTitle = yield prisma.list.update({
            data: {
                title
            },
            where: {
                id: listId,
                boardId
            }
        });
        return { error: false, message: "list title changed to " + changingListTitle.title };
    }
    catch (e) {
        return { error: true, message: "Internal error" + e.message };
    }
});
exports.listTitleChange = listTitleChange;
const listDelete = (listId, boardId) => __awaiter(void 0, void 0, void 0, function* () {
    const listData = yield prisma.list.findUnique({
        where: {
            boardId,
            id: listId
        }
    });
    if (!listData) {
        return { error: true, message: "List not found" };
    }
    try {
        const letsDelete = yield prisma.list.delete({
            where: {
                boardId,
                id: listId
            }
        });
        return { error: false, message: " list deleted" };
    }
    catch (e) {
        return { error: true, message: "Internal error" + e.message };
    }
});
exports.listDelete = listDelete;
