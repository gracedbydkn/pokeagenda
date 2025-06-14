const express = require('express');
const router = express.Router();
const { registrarPresenca, listarPresencas, calcularPresenca, atualizarPresenca } = require('../controllers/presencaController');

router.post('/', registrarPresenca);
router.get('/', listarPresencas);
router.get('/calcular/:aulaId', calcularPresenca);
router.put('/:id', atualizarPresenca);

module.exports = router;