const express = require('express');
const router = express.Router();
const { criarAgenda, listarAgendas } = require('../controllers/agendaController');

router.post('/', criarAgenda);
router.get('/', listarAgendas);

module.exports = router;