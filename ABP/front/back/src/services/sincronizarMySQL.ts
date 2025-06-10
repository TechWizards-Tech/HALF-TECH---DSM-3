import { DadoMeteorologico } from '../models/DadoMeteorologico';
import { mysqlConnection } from './mysql';

let emExecucao = false;
let tempoRestante = 600; // 10 minutos em segundos

function iniciarContagemRegressiva() {
  const intervalo = setInterval(() => {
    tempoRestante--;

    // Mostrar no console a cada 60 segundos
    if (tempoRestante % 60 === 0 || tempoRestante <= 10) {
      const minutos = Math.floor(tempoRestante / 60);
      const segundos = tempoRestante % 60;
      console.log(`⏳ Próxima sincronização em: ${minutos}m ${segundos}s`);
    }

    if (tempoRestante <= 0) {
      clearInterval(intervalo);
      tempoRestante = 600; // Reinicia a contagem
      sincronizarDados();
      iniciarContagemRegressiva();
    }
  }, 1000);
}

export async function sincronizarDados() {
  if (emExecucao) return;
  emExecucao = true;
  console.log('⏰ Iniciando sincronização com MySQL...');

  try {
    const [rows] = await mysqlConnection.query('SELECT * FROM Sensor ORDER BY reading_time DESC LIMIT 60');
    const registros = rows as any[];

    for (const dado of registros) {
      await DadoMeteorologico.updateOne(
        { reading_time: dado.reading_time },
        { $set: dado },
        { upsert: true }
      );
    }

    console.log(`✅ ${registros.length} registros sincronizados do MySQL`);
  } catch (err) {
    console.error('❌ Erro ao sincronizar MySQL : ', err);
  } finally {
    emExecucao = false;
  }
}

// Inicia a contagem regressiva ao carregar o módulo
iniciarContagemRegressiva();
