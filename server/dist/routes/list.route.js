"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const list_controller_1 = require("../controllers/list.controller");
const authmiddleware_1 = __importDefault(require("../middlewares/authmiddleware"));
const Router = require("express");
const router = Router();
router.post("/:id/list", authmiddleware_1.default, list_controller_1.createList);
router.get("/:id/lists", authmiddleware_1.default, list_controller_1.getLists);
router.patch("/:boardId/list/:listId", authmiddleware_1.default, list_controller_1.changeListName);
router.delete("/:boardId/list/:listId", authmiddleware_1.default, list_controller_1.deleteList);
exports.default = router;
