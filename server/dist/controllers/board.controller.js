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
exports.postBoard = void 0;
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
