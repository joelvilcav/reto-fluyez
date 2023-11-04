import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import connectToDb from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';

const app = express();
app.use(express.json());
dotenv.config();
connectToDb();
app.use(cors());

//Routing
app.use('/api/movies', movieRoutes);

//Login
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;

  if (email === 'luis@fluyez.com' && password === '123') {
    const token = jwt.sign({ email }, 'secret-key', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Wrong Credentials' });
  }
});

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(403);
  jwt.verify(token, 'secret-key', (err, user) => {
    if (err) return res.sendStatus(404);
    req.user = user;
    next();
  });
}

app.post('/api/login', verifyToken, (req, res) => {
  res.send('You are Authorized!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
