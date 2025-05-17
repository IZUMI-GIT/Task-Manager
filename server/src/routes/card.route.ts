import { createCard, deleteCard, getCards, patchCard } from "../controllers/card.controller";
import userMiddleware from "../middlewares/authmiddleware";

const { Router } = require("express");
const router = Router();

router.post("/card", userMiddleware,  createCard);

router.get("/cards",userMiddleware, getCards);

router.patch("/card/:id", userMiddleware, patchCard);

router.delete("/card/:id", userMiddleware, deleteCard);

export default router;