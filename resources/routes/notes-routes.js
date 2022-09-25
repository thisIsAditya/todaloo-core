/**
 * Module Import
 */
import { Router } from "express";
import { Note } from "../models/notes-model.js";
import paginatedResults from "../middlewares/paginatedResults.js";

import {
  addItem,
  updateItem,
  deleteItem,
  getItem,
  getItems,
} from "../controllers/notes-controller.js";

const router = Router();

router.route("/").get(paginatedResults(Note), getItems).post(addItem);
router.route("/:id").get(getItem).patch(updateItem).delete(deleteItem);

export default router;
