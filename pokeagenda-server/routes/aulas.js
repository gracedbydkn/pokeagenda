const express = require('express');
const router = express.Router();
const { criarAula, listarAulas, atualizarAula, listarAulasComPresenca, deletarAula } = require('../controllers/aulaController');

router.post('/', criarAula);
router.get('/', listarAulas);
router.put('/:id', atualizarAula);
router.get('/agendas/:agendas_id', listarAulasComPresenca);
router.delete('/', deletarAula);

module.exports = router;