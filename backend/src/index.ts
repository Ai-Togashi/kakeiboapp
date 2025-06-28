import express from 'express';
import cors from 'cors';
import transactionRoutes from './routes/transactionRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

app.use('/transactions', transactionRoutes);

app.use(errorHandler);

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



