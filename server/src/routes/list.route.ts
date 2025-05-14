import { changeListName, createList, deleteList, getLists } from "../controllers/list.controller"
import userMiddleware from "../middlewares/authmiddleware"

const Router = require("express")
const router = Router()

router.post("/list",userMiddleware, createList)

router.get("/:id/lists", userMiddleware, getLists)

router.patch("/:boardId/list/:listId", userMiddleware, changeListName)

router.delete("/:boardId/list/:listId", userMiddleware, deleteList)

export default router;