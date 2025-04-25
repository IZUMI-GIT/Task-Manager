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
exports.deleteBoard = exports.changeBoardName = exports.getBoard = exports.postBoard = void 0;
const client_1 = require("../../prisma/prisma/generated/client");
const prisma = new client_1.PrismaClient();
const postBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, title, lists } = req.body;
    try {
        const boardData = yield prisma.board.create({
            data: {
                title,
                userId,
                lists: {
                    create: [
                        { title: "To-Do", position: 0 },
                        { title: "On hold", position: 1 },
                        { title: "Done", position: 2 }
                    ],
                }
            },
            include: { lists: true }
        });
        if (!boardData) {
            res.status(500).json({
                "message": "Board not created"
            });
        }
        else {
            res.status(200).json({
                "message": `Board ${boardData.title} is created`,
                "data": boardData
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Error creating board",
            error: e
        });
    }
    return;
});
exports.postBoard = postBoard;
const getBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const boardData = yield prisma.board.findMany({
            where: {
                userId: userId
            },
            include: { lists: true }
        });
        const userData = yield prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!boardData) {
            res.status(500).json({
                'message': "data not fetched"
            });
        }
        else {
            res.status(200).json({
                'message': `BoardData fetched for ${userData === null || userData === void 0 ? void 0 : userData.userName}`,
                data: boardData
            });
        }
    }
    catch (e) {
        res.status(500).json({
            'message': "internal error",
            'error': e
        });
    }
    return;
});
exports.getBoard = getBoard;
const changeBoardName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const boardId = Number.parseInt(req.params.id);
    const { userId, title } = req.body;
    try {
        const updateBoardName = yield prisma.board.update({
            where: {
                id: boardId,
                userId
            },
            data: {
                title
            }
        });
        if (!updateBoardName) {
            res.status(500).json({
                "message": "Internal Error"
            });
        }
        else {
            res.status(200).json({
                "message": "Board name updated",
                "boardName": title
            });
        }
    }
    catch (e) {
        res.status(500).json({
            "message": "Updation Failed",
            "error": e
        });
    }
    return;
});
exports.changeBoardName = changeBoardName;
const deleteBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const boardId = Number.parseInt(req.params.id);
    const { userId } = req.body;
    try {
        const boardData = yield prisma.board.delete({
            where: {
                id: boardId,
                userId
            }
        });
        if (!boardData) {
            res.status(403).json({
                "message": "Deletion not worked - bad request",
            });
        }
        else {
            res.status(200).json({
                "message": "Worked",
            });
        }
    }
    catch (e) {
        res.status(500).json({
            "message": "Internal Error",
            "error": e
        });
    }
});
exports.deleteBoard = deleteBoard;
