const express = require('express');
const router = express.Router();
const { criarAula, listarAulas } = require('../controllers/aulaController');

router.post('/agendas', criarAula);
router.get('/agendas', listarAulas);

module.exports = router;