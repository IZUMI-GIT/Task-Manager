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
exports.deleteList = exports.changeListName = exports.getLists = exports.createList = void 0;
const list_service_1 = require("../services/list.service");
const createList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, title } = req.body;
    const boardId = Number(req.params.boardId);
    console.log(req.params.boardId);
    const result = yield (0, list_service_1.createListService)(userId, boardId, title);
    if (result.error) {
        res.status(400).json({
            message: result.message
        });
    }
    else {
        res.status(201).json({
            list: result.list
        });
    }
});
exports.createList = createList;
const getLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const boardId = Number(req.params.boardId);
    const fetchedLists = yield (0, list_service_1.getListService)(boardId, userId);
    if (fetchedLists.error) {
        res.status(400).json({
            message: fetchedLists.message
        });
    }
    else {
        res.status(200).json({
            message: fetchedLists.list
        });
    }
});
exports.getLists = getLists;
const changeListName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listId = Number(req.params.listId);
    const boardId = Number(req.params.boardId);
    const { title } = req.body;
    const changedResult = yield (0, list_service_1.listTitleChange)(boardId, listId, title);
    if (changedResult.error) {
        res.status(400).json({
            message: changedResult.message
        });
    }
    else {
        res.status(200).json({
            message: changedResult.message
        });
    }
});
exports.changeListName = changeListName;
const deleteList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listId = Number(req.params.listId);
    const boardId = Number(req.params.boardId);
    const deletedResult = yield (0, list_service_1.listDelete)(listId, boardId);
    if (deletedResult.error) {
        res.status(400).json({
            message: deletedResult.message
        });
    }
    else {
        res.status(204).json({
            message: deletedResult.message
        });
    }
});
exports.deleteList = deleteList;
