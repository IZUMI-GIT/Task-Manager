import { createCard, deleteCard, getCards, patchCard } from "../controllers/card.controller";
import userMiddleware from "../middlewares/authmiddleware";

const { Router } = require("express");
const router = Router({mergeParams : true});

// router.use(userMiddleware)

router.post("/", createCard);

router.get("/", getCards);

router.patch("/:id", patchCard);

router.delete("/:id", deleteCard);

export default router;