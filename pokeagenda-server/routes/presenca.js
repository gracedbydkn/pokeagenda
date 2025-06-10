const express = require('express');
const router = express.Router();
const { registrarPresenca, listarPresencas, calcularPresenca } = require('../controllers/presencaController');

router.post('/presenca', registrarPresenca);
router.get('/presenca', listarPresencas);
router.get('/presenca/calcular/:aulaId', calcularPresenca);

module.exports = router;