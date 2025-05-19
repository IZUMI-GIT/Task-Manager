import { changeListName, createList, deleteList, getLists } from "../controllers/list.controller"

const { Router } = require("express")
const router = Router({mergeParams: true})

router.post("/", createList)

router.get("/", getLists)

router.patch("/:listId", changeListName)

router.delete("/:listId", deleteList)

export default router;