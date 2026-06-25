import { Router } from "express";
import * as MovieController from "../controllers/movie.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", MovieController.listar);
router.get("/:id", MovieController.buscar);
router.post("/", requireAuth, MovieController.criar);
router.put("/:id", requireAuth, MovieController.atualizar);
router.delete("/:id", requireAuth, MovieController.deletar);

export default router;