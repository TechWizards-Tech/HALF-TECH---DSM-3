import express from "express";
import { getChartData, getAllDados } from "../controllers/DadoController";

const router = express.Router();

router.get("/chart-data", getChartData);

// Nova rota para retornar todos os dados meteorológicos
router.get("/all", getAllDados);

export default router;
