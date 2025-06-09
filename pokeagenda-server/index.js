const express = require('express');
const server = express();
const PORT = 6006;

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Server está funcionando!');
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});