const express = require('express');
const router = express.Router();
const { criarAula, listarAulas } = require('../controllers/aulaController');

router.post('/', criarAula);
router.get('/', listarAulas);

module.exports = router;