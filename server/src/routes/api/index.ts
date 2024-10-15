import { Router } from "express";
import { createXlsx } from "../../controllers/xlsx-controller.js";

const router = Router();

router.post("/xlsx", createXlsx);

export default router;
