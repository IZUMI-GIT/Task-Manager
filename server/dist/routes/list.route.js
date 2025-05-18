"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_controller_1 = require("../controllers/list.controller");
const { Router } = require("express");
const router = Router({ mergeParams: true });
// router.use(userMiddleware)
router.post("/", list_controller_1.createList);
router.get("/", list_controller_1.getLists);
router.patch("/:listId", list_controller_1.changeListName);
router.delete("/:listId", list_controller_1.deleteList);
exports.default = router;
