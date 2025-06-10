import { Router } from 'express';
import { DadoMeteorologico } from '../models/DadoMeteorologico';

const router = Router();

// RF02: Listar histórico de dados meteorológicos
router.get('/', async (req, res) => {
  try {
    const dados = await DadoMeteorologico.find().sort({ reading_time: -1 });
  
    res.json(dados);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar dados' });
  }
});


export default router;