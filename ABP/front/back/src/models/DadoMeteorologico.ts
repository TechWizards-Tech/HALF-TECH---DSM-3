import mongoose from 'mongoose';

const DadoSchema = new mongoose.Schema({
  temp: Number,
  hum: Number,
  cab_temp: Number,
  bat_volts: Number,
  uv_level: Number,
  bar: Number,
  wind_peak: Number,
  wind_rt: Number,
  wind_avg: Number,
  wind_dir_rt: Number,
  wind_dir_avg: Number,
  reading_time: { type: String, required: true, unique: true },
}, { timestamps: true });


// ✅ Garante índice único no campo reading_time
DadoSchema.index({ reading_time: 1 }, { unique: true });

// ✅ Executa script de remoção de duplicados apenas uma vez
async function removerDuplicados() {
  const model = mongoose.models.DadoMeteorologico;
  if (!model) return;

  console.log("🔍 Verificando duplicatas em 'reading_time'...");

  const duplicados = await model.aggregate([
    {
      $group: {
        _id: "$reading_time",
        count: { $sum: 1 },
        ids: { $push: "$_id" }
      }
    },
    {
      $match: {
        count: { $gt: 1 }
      }
    }
  ]);

  for (const grupo of duplicados) {
    // Mantém o primeiro, remove os restantes
    const [manter, ...remover] = grupo.ids;
    await model.deleteMany({ _id: { $in: remover } });
    console.log(`🧹 Removidos ${remover.length} duplicados com reading_time ${grupo._id}`);
  }

  console.log("✅ Limpeza de duplicatas concluída.");
}

removerDuplicados().catch(console.error);

export const DadoMeteorologico = mongoose.model('DadoMeteorologico', DadoSchema);
