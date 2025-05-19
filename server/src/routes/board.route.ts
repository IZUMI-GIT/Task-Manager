import { changeBoardName, deleteBoard, getBoard, postBoard } from "../controllers/board.controller";
import authMiddleware from "../middlewares/authmiddleware";
import loggerMiddleware from "../middlewares/usermiddleware";

const { Router } = require("express")
const router = Router();

router.use(authMiddleware)
router.use(loggerMiddleware);

router.post("/", postBoard);

router.get("/", getBoard);

router.patch("/:id", changeBoardName);

router.delete("/:id", deleteBoard);

export default router;