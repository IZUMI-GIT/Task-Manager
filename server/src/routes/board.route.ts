import userMiddleware from "../middlewares/authmiddleware";
import { changeBoardName, deleteBoard, getBoard, postBoard } from "../controllers/board.controller";

const { Router } = require("express")
const router = Router();

router.use(userMiddleware)

router.post("/", postBoard);

router.get("/", getBoard);

router.patch("/:id", changeBoardName);

router.delete("/:id", deleteBoard);

export default router;