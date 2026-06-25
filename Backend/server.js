import express from 'express';
import 'dotenv/config';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './src/lib/auth.js';
import { prisma } from './src/lib/prisma.js';
import cors from "cors";
import { requireAuth } from './src/middleware/auth.js';
import movieRoutes from './src/routes/movieRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', toNodeHandler(auth));
app.use('/api/movies', movieRoutes);

app.get('/', (req, res) => {
  res.send('Servidor Back-end de Filmes Rodando!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.get("/api/me", requireAuth, (req, res) => {
  res.json({
    message: "Bem-vindo ao seu perfil!",
    user: req.user,
  });
});

app.post('/api/user/username', async (req, res) => {
  const { userId, username } = req.body;

  if (!userId || !username) {
    return res.status(400).json({ error: 'userId e username são obrigatórios.' });
  }

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { username },
    });
    res.json({ success: true, username: updated.username });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Username já está em uso.' });
    }
    console.error('Erro ao salvar username:', err);
    res.status(500).json({ error: 'Erro interno ao salvar username.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Auth disponível em http://localhost:${PORT}/api/auth`);
});