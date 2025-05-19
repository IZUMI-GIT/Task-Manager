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
exports.deleteCard = exports.patchCardCheckList = exports.patchCardTitle = exports.getCards = exports.createCard = void 0;
const card_service_1 = require("../services/card.service");
const createCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, task } = req.body;
    const boardId = Number(req.params.boardId);
    const listId = Number(req.params.listId);
    const result = yield (0, card_service_1.createCardService)(userId, boardId, listId, task);
    if (result.error) {
        return res.status(400).json({
            message: result.message
        });
    }
    else {
        return res.status(201).json({
            message: result.message
        });
    }
});
exports.createCard = createCard;
const getCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const boardId = Number(req.params.boardId);
    const listId = Number(req.params.listId);
    const result = yield (0, card_service_1.getCardService)(userId, boardId, listId);
    if (result.error) {
        return res.status(400).json({
            message: result.message
        });
    }
    else {
        return res.status(200).json({
            message: result.message
        });
    }
});
exports.getCards = getCards;
const patchCardTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, task } = req.body;
    const boardId = Number(req.params.boardId);
    const listId = Number(req.params.listId);
    const cardId = Number(req.params.id);
    const result = yield (0, card_service_1.patchCardService)(userId, boardId, listId, cardId, task);
    if (result.error) {
        return res.status(400).json({
            message: result.message
        });
    }
    else {
        return res.status(200).json({
            message: result.message
        });
    }
});
exports.patchCardTitle = patchCardTitle;
const patchCardCheckList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const boardId = Number(req.params.boardId);
    const listId = Number(req.params.listId);
    const cardId = Number(req.params.id);
    const result = yield (0, card_service_1.checklistCardService)(boardId, listId, cardId);
    if (result.error) {
        return res.status(400).json({
            message: result.message
        });
    }
    else {
        return res.status(200).json({
            message: result.message
        });
    }
});
exports.patchCardCheckList = patchCardCheckList;
const deleteCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const boardId = Number(req.params.boardId);
    const listId = Number(req.params.listId);
    const cardId = Number(req.params.id);
    const result = yield (0, card_service_1.deleteCardService)(userId, boardId, listId, cardId);
    if (result.error) {
        return res.status(400).json({
            message: result.message
        });
    }
    else {
        return res.status(204).json({
            message: result.message
        });
    }
});
exports.deleteCard = deleteCard;
