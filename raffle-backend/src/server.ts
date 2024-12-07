// src/server.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import raffleRoutes from './routes/raffleRoutes';
import paymentRoutes from './routes/paymentRoutes';
<<<<<<< HEAD
=======
import oracleRoutes from './routes/oracleRoutes'
>>>>>>> bfe3af209cd28ee6c4dbcd6dc448865f0a398e6d
import path from 'path';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/raffles', raffleRoutes);
app.use('/api/payments', paymentRoutes);
<<<<<<< HEAD
=======
app.use('/api/oracle', oracleRoutes);
>>>>>>> bfe3af209cd28ee6c4dbcd6dc448865f0a398e6d

// Rota para webhooks (Mercado Pago)
app.post('/api/webhook', paymentRoutes);

// Middleware para servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'public/')));

// Inicie o servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
<<<<<<< HEAD
});
=======
});



>>>>>>> bfe3af209cd28ee6c4dbcd6dc448865f0a398e6d
