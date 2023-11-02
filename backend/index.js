import express from 'express';
import dotenv from 'dotenv';
import connectToDb from './config/db.js';

const app = express();
dotenv.config();
connectToDb();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
