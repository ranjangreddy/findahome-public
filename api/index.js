import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import requireAuth from './middleware/requireAuth.js';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);

app.get('/ping', (req, res) => res.send('pong'));

// Protected example route
app.get('/api/protected', requireAuth, (req, res) => {
  res.json({ message: 'You are authenticated!', user: req.user });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
