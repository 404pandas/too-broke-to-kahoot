import { Router } from "express";
import { createXlsx } from "../../controllers/xlsx-controller.ts";
const router = Router();
router.use("/xlsx", createXlsx);
export default router;
