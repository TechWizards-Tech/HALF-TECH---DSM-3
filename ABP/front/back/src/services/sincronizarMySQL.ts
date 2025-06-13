import { DadoMeteorologico } from '../models/DadoMeteorologico';
import { mysqlConnection } from './mysql';

let emExecucao = false;
let tempoRestante = 600; // 10 minutos em segundos

function iniciarContagemRegressiva() {
  const intervalo = setInterval(() => {
    tempoRestante--;

    if (tempoRestante % 60 === 0 || tempoRestante <= 10) {
      const minutos = Math.floor(tempoRestante / 60);
      const segundos = tempoRestante % 60;
      console.log(`⏳ Próxima sincronização em: ${minutos}m ${segundos}s`);
    }

    if (tempoRestante <= 0) {
      clearInterval(intervalo);
      tempoRestante = 600;
      sincronizarDados();
      iniciarContagemRegressiva();
    }
  }, 1000);
}

async function limparColecaoDadoMeteorologico() {
  try {
    const result = await DadoMeteorologico.deleteMany({});
    console.log(`🧹 Coleção limpa com sucesso. ${result.deletedCount} documentos removidos.`);
  } catch (err) {
    console.error('❌ Erro ao limpar a coleção:', err);
  }
}

async function removerDuplicados() {
  try {
    const duplicados = await DadoMeteorologico.aggregate([
      {
        $group: {
          _id: "$reading_time",
          count: { $sum: 1 },
          ids: { $push: "$_id" },
        },
      },
      { $match: { count: { $gt: 1 } } },
    ]);

    for (const grupo of duplicados) {
      const [manter, ...remover] = grupo.ids;
      await DadoMeteorologico.deleteMany({ _id: { $in: remover } });
      console.log(`🧹 Removidos ${remover.length} duplicados com reading_time: ${grupo._id}`);
    }

    if (duplicados.length === 0) {
      console.log("✅ Nenhum duplicado encontrado.");
    }
  } catch (err) {
    console.error("❌ Erro ao remover duplicados:", err);
  }
}

export async function sincronizarDados() {
  if (emExecucao) return;
  emExecucao = true;
  console.log('⏰ Iniciando sincronização com MySQL...');

  try {
    const [rows] = await mysqlConnection.query('SELECT * FROM Sensor ORDER BY reading_time DESC LIMIT 60');
    const registros = rows as any[];

    await limparColecaoDadoMeteorologico(); // ou comente aqui se quiser manter histórico
    for (const dado of registros) {
      await DadoMeteorologico.updateOne(
        { reading_time: dado.reading_time },
        { $set: dado },
        { upsert: true }
      );
    }

    console.log(`✅ ${registros.length} registros sincronizados do MySQL`);

    // ✅ Remover duplicados após sincronização
    await removerDuplicados();

  } catch (err) {
    console.error('❌ Erro ao sincronizar MySQL : ', err);
  } finally {
    emExecucao = false;
  }
}

iniciarContagemRegressiva();
