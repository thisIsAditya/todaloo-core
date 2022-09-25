import { Router } from "express";

import NotesRouter from "./notes-routes.js";

const router = Router();

router.use("/notes", NotesRouter);

export default router;
