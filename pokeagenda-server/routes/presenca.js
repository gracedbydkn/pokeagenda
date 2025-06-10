const express = require('express');
const router = express.Router();
const { registrarPresenca, listarPresencas, calcularPresenca } = require('../controllers/presencaController');

router.post('/', registrarPresenca);
router.get('/', listarPresencas);
router.get('/calcular/:aulaId', calcularPresenca);

module.exports = router;