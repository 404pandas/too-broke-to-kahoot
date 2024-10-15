import express from "express";
import { createXlsx } from "../../controllers/xlsx-controller";

const router = express.Router();

// POST /create-xlsx - Create an XLSX file
router.post("/create-xlsx", createXlsx);
