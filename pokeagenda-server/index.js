require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');

server.use(cors({ origin: 'http://localhost:3000' }));

const authRoutes = require('./routes/auth');
const agendaRoutes = require('./routes/agendas');
const aulaRoutes = require('./routes/aulas');
const presencaRoutes = require('./routes/presenca');
const PORT = 6006;

server.use(express.json());

server.use('/auth', authRoutes);
server.use('/agendas', agendaRoutes);
server.use('/aulas', aulaRoutes);
server.use('/presenca', presencaRoutes);

server.get('/', (req, res) => {
  res.send('Server está funcionando!');
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});