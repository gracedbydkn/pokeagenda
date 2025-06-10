const express = require('express');
const router = express.Router();
const { criarAgenda, listarAgendas } = require('../controllers/agendaController');

router.post('/agendas', criarAgenda);
router.get('/agendas', listarAgendas);

module.exports = router;