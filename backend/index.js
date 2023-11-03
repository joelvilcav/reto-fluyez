import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDb from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';

const app = express();
app.use(express.json());
dotenv.config();
connectToDb();
app.use(cors());

//Routing
app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
