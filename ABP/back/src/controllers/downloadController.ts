// src/controllers/downloadController.ts
import { Request, Response } from 'express';
import { DadoMeteorologico } from '../models/DadoMeteorologico';
import { Parser } from 'json2csv';

export const downloadCSV = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const dados = await DadoMeteorologico.find().lean();

    if (!dados.length) {
      return res.status(404).json({ message: 'Nenhum dado encontrado.' });
    }

    const parser = new Parser();
    const csv = parser.parse(dados);

    res.header('Content-Type', 'text/csv');
    res.attachment('dados_meteorologicos.csv');
    return res.send(csv);
  } catch (error) {
    console.error('Erro ao gerar CSV:', error);
    return res.status(500).json({ message: 'Erro ao gerar CSV.' });
  }
};
