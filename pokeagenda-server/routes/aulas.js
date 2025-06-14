const express = require('express');
const router = express.Router();
const { criarAula, listarAulas, atualizarAula } = require('../controllers/aulaController');

router.post('/', criarAula);
router.get('/', listarAulas);
router.put('/:id', atualizarAula);

module.exports = router;