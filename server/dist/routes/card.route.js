"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_controller_1 = require("../controllers/card.controller");
const authmiddleware_1 = __importDefault(require("../middlewares/authmiddleware"));
const { Router } = require("express");
const router = Router();
router.post("/card", authmiddleware_1.default, card_controller_1.createCard);
router.get("/cards", authmiddleware_1.default, card_controller_1.getCards);
router.patch("/card/:id", authmiddleware_1.default, card_controller_1.patchCard);
router.delete("/card/:id", authmiddleware_1.default, card_controller_1.deleteCard);
exports.default = router;
