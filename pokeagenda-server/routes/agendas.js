const express = require('express');
const router = express.Router();
const { criarAgenda, listarAgendas, atualizarAgenda, deletarAgenda } = require('../controllers/agendaController');

router.post('/', criarAgenda);
router.get('/usuarios/:usuarios_id', listarAgendas);
router.put('/:id', atualizarAgenda);
router.delete('/:id', deletarAgenda);

module.exports = router;