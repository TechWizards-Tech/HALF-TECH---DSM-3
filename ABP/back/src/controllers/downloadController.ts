import { Request, Response } from 'express';
import { DadoMeteorologico } from '../models/DadoMeteorologico';
import { Parser } from 'json2csv';

function formatDate(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
         `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export const downloadCSV = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const dados = await DadoMeteorologico.find().lean();

    if (!dados.length) {
      return res.status(404).json({ message: 'Nenhum dado encontrado.' });
    }

    const fields = [
      'reading_time',
      'temp',
      'hum',
      'cab_temp',
      'bat_volts',
      'uv_level',
      'bar',
      'wind_peak',
      'wind_rt',
      'wind_avg',
      'wind_dir_rt',
      'wind_dir_avg'
    ];

    const dadosFiltrados = dados.map(dado => {
      const obj: any = {};
      fields.forEach(field => {
        if (field === 'reading_time') {
          obj[field] = formatDate(new Date((dado as any)[field]));
        } else {
          obj[field] = (dado as any)[field];
        }
      });
      return obj;
    });

    // Ajuste aqui: delimitador para ponto e vírgula
    const parser = new Parser({ fields, delimiter: ';' });
    const csv = parser.parse(dadosFiltrados);

    const bom = '\uFEFF'; // BOM UTF-8 para Excel
    const csvComBOM = bom + csv;

    res.header('Content-Type', 'text/csv; charset=utf-8');
    res.attachment('dados_meteorologicos.csv');
    return res.send(csvComBOM);
  } catch (error) {
    console.error('Erro ao gerar CSV:', error);
    return res.status(500).json({ message: 'Erro ao gerar CSV.' });
  }
};
