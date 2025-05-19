"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const board_controller_1 = require("../controllers/board.controller");
const authmiddleware_1 = __importDefault(require("../middlewares/authmiddleware"));
const usermiddleware_1 = __importDefault(require("../middlewares/usermiddleware"));
const { Router } = require("express");
const router = Router();
router.use(authmiddleware_1.default);
router.use(usermiddleware_1.default);
router.post("/", board_controller_1.postBoard);
router.get("/", board_controller_1.getBoard);
router.patch("/:id", board_controller_1.changeBoardName);
router.delete("/:id", board_controller_1.deleteBoard);
exports.default = router;
