import { Router } from "express";
import {
  getChartData,
  getAllDados,
  getLatestReading,
  getChartDataLast12Hours,
  getChartDataLast3Days,
} from "../controllers/DadoController";

const router = Router();

router.get("/chart-data", getChartData);

// Nova rota para retornar todos os dados meteorológicos
router.get("/all", getAllDados);


// Rota para dados do gráfico (últimos 12 registros)
router.get("/chart", getChartData);

// Rota para dados do gráfico das últimas 12 horas (média por hora)
router.get("/chart/12h", getChartDataLast12Hours);

// Rota para dados do gráfico dos últimos 3 dias (média por hora)
router.get("/chart/3d", getChartDataLast3Days);

// Rota para todos os dados (formato de tabela)
router.get("/all", getAllDados);

// Rota para os últimos 50 dados formatados
router.get("/latest", getLatestReading);

export default router;
