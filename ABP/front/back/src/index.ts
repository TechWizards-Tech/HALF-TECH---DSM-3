import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dadoRouter from './routes/dado';
import authRouter from './routes/auth';
import downloadRouter from './routes/download';
import { sincronizarDados } from './services/sincronizarMySQL';

dotenv.config();

const app = express();

// ✅ Configurar CORS
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
app.use('/api/dados', dadoRouter);
app.use('/api/auth', authRouter);
app.use('/api/download', downloadRouter); // ✅ esta rota agora está no lugar certo

// ✅ Iniciar servidor — por último
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Rodando na porta ${process.env.PORT || 5000}`);
});

// ✅ Executar sincronização
sincronizarDados();
