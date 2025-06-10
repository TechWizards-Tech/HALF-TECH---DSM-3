
// import mongoose from 'mongoose';

// const dadoMeteorologicoSchema = new mongoose.Schema({
//   estacao: { type: String, required: true },
//   dataHora: { type: Date, required: true },
//   temperatura: { type: Number, required: true },
//   umidade: { type: Number, required: true },
//   velocidadeVento: { type: Number, required: true },
//   direcaoVento: { type: String, required: true },
//   pressao: { type: Number, required: true }
// });

// export default mongoose.model('DadoMeteorologico', dadoMeteorologicoSchema);


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

export const DadoMeteorologico = mongoose.model('DadoMeteorologico', DadoSchema);