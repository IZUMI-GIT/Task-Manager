import userMiddleware from "../middlewares/authmiddleware";
import { changeBoardName, getBoard, postBoard } from "../controllers/board.controller";

const { Router } = require("express")
const router = Router();

router.post("/board", userMiddleware, postBoard);

router.get("/board", userMiddleware, getBoard);

router.patch("/board/:id", userMiddleware, changeBoardName);

// router.patch("/board/:id", userMiddleware, deleteBoard);


export default router;