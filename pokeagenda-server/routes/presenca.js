const express = require('express');
const router = express.Router();
const { registrarPresenca, listarPresencas, calcularPresenca, atualizarPresenca } = require('../controllers/presencaController');

router.post('/', registrarPresenca);
router.get('/aula/:aulaId', listarPresencas);
router.get('/calcular/:aulaId', calcularPresenca);
router.put('/:id', atualizarPresenca);

module.exports = router;

/**
 * @swagger
 * /presencas:
 *   post:
 *     tags: [Presenças]
 *     summary: Registra uma presença
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [aulas_id, dia_aula, presenca]
 *             properties:
 *               aulas_id:
 *                 type: integer
 *               dia_aula:
 *                 type: string
 *               presenca:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Presença registrada
 */

/**
 * @swagger
 * /presencas:
 *   get:
 *     tags: [Presenças]
 *     summary: Lista presenças por aula
 *     parameters:
 *       - in: query
 *         name: aulas_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de presenças
 */

/**
 * @swagger
 * /presencas/calcular/{aulaId}:
 *   get:
 *     tags: [Presenças]
 *     summary: Calcula percentual de presença
 *     parameters:
 *       - in: path
 *         name: aulaId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resultado do cálculo
 */

/**
 * @swagger
 * /presencas/{id}:
 *   put:
 *     tags: [Presenças]
 *     summary: Atualiza uma presença
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               presenca:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Presença atualizada
 */
