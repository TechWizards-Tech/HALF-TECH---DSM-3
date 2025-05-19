// RF02: Modelagem dos dados meteorológicos
import mongoose from 'mongoose';

const dadoMeteorologicoSchema = new mongoose.Schema({
  estacao: { type: String, required: true },
  dataHora: { type: Date, required: true },
  temperatura: { type: Number, required: true },
  umidade: { type: Number, required: true },
  velocidadeVento: { type: Number, required: true },
  direcaoVento: { type: String, required: true },
  pressao: { type: Number, required: true }
});



export default mongoose.model('DadoMeteorologico', dadoMeteorologicoSchema);


/*models/DadoMeteorologico.ts – Define o modelo dos dados meteorológicos*/