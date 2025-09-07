import express from "express";
import { createColony, getAllColonies, getColonyById, updateColony, deleteColony } from "../controllers/colony.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createColony);
router.route("/get").get(getAllColonies);
router.route("/get/:id").get(getColonyById);
router.route("/update/:id").put(isAuthenticated, updateColony);
router.route("/delete/:id").delete(isAuthenticated, deleteColony);

export default router;