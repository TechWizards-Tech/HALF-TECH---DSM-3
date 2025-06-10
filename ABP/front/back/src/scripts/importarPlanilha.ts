import mongoose from 'mongoose';
import * as XLSX from 'xlsx';
import dotenv from 'dotenv';
import path from 'path';
import DadoMeteorologico from '../models/DadoMeteorologico';

function excelDateToJSDate(serial: number): Date {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
  
    const fractional_day = serial - Math.floor(serial) + 0.0000001;
    let total_seconds = Math.floor(86400 * fractional_day);
  
    const seconds = total_seconds % 60;
    total_seconds -= seconds;
  
    const hours = Math.floor(total_seconds / (60 * 60));
    const minutes = Math.floor((total_seconds - hours * 3600) / 60);
  
    date_info.setHours(hours);
    date_info.setMinutes(minutes);
    date_info.setSeconds(seconds);
  
    return date_info;
  }
  

dotenv.config();

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => console.error('❌ Erro ao conectar:', err));

// Caminho da planilha
const caminhoArquivo = path.resolve(__dirname, '../../../Desafio 3DSM - Dados meteorológicos.xlsx');

// Carrega a planilha
const workbook = XLSX.readFile(caminhoArquivo);

// Define a aba que será importada
const nomeAba = 'Colina_092024';
const aba = workbook.Sheets[nomeAba];
const dados: any[] = XLSX.utils.sheet_to_json(aba);

(async () => {
  for (const linha of dados) {
    console.log(linha);
    // Junta Date + Time para criar o campo dataHora
    const dataCompleta = excelDateToJSDate(linha['Date'] + linha['Time']);


    const doc = new DadoMeteorologico({
      estacao: nomeAba,
      dataHora: dataCompleta,
      temperatura: linha['Temp_C'],
      umidade: linha['Hum_%'],
      pressao: linha['Press_Bar'],
      velocidadeVento: linha['WindSpeed_Inst '],
      direcaoVento: linha['WindDir_Inst '],
        
    });

    try {
      await doc.save();
    } catch (err: any) {
        console.error('❌ Erro ao salvar registro:', err.message);
      }
      
  }

  console.log('✅ Importação concluída com sucesso!');
  mongoose.disconnect();
})();

