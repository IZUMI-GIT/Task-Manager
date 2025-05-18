import { changeListName, createList, deleteList, getLists } from "../controllers/list.controller"
import userMiddleware from "../middlewares/authmiddleware"

const { Router } = require("express")
const router = Router({mergeParams: true})

// router.use(userMiddleware)

router.post("/", createList)

router.get("/", getLists)

router.patch("/:listId", changeListName)

router.delete("/:listId", deleteList)

export default router;