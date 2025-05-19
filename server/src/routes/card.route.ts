import { createCard, deleteCard, getCards, patchCardCheckList, patchCardTitle } from "../controllers/card.controller";

const { Router } = require("express");
const router = Router({mergeParams : true});

router.post("/", createCard);

router.get("/", getCards);

router.patch("/:id", patchCardTitle);
router.patch("/:id", patchCardCheckList)

router.delete("/:id", deleteCard);

export default router;