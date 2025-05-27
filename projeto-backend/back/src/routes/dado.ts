import express from "express";
import { getChartData } from "../controllers/DadoController";

const router = express.Router();

router.get("/chart-data", getChartData);

export default router;
