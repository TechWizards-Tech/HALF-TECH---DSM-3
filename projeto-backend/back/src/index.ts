import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dadoRouter from './routes/dado'; // ✅ usar apenas este
import authRouter from './routes/auth';
import { sincronizarDados } from './services/sincronizarMySQL';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// ✅ Usando body-parser explicitamente
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('✅ MongoDB conectado!'))
  .catch((err) => console.error('❌ Erro MongoDB:', err));

// ✅ Rotas
app.use('/api/dados', dadoRouter); // ✅ usar rota correta
app.use('/api/auth', authRouter);

// ✅ Iniciar servidor
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Rodando na porta ${process.env.PORT || 5000}`);
});

// ✅ Executar sincronização
sincronizarDados();
