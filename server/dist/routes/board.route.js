"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authmiddleware_1 = __importDefault(require("../middlewares/authmiddleware"));
const board_controller_1 = require("../controllers/board.controller");
const { Router } = require("express");
const router = Router();
router.post("/board", authmiddleware_1.default, board_controller_1.postBoard);
// router.get("/board", userMiddleware, getBoard);
// router.patch("/board/:id", userMiddleware, changeBoardName);
// router.patch("/board/:id", userMiddleware, deleteBoard);
exports.default = router;
