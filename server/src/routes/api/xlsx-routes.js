import express from "express";
import { createXlsx } from "../../controllers/xlsx-controller.ts";
const router = express.Router();
// POST /create-xlsx - Create an XLSX file
router.post("/create-xlsx", createXlsx);
