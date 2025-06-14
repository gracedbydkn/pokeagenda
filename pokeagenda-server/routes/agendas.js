const express = require('express');
const router = express.Router();
const { criarAgenda, listarAgendas, atualizarAgenda } = require('../controllers/agendaController');

router.post('/', criarAgenda);
router.get('/', listarAgendas);
router.put('/:id', atualizarAgenda);

module.exports = router;