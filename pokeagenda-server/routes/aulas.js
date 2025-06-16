const express = require('express');
const router = express.Router();
const { criarAula, listarAulas, atualizarAula, listarAulasComPresenca, deletarAula } = require('../controllers/aulaController');

router.post('/', criarAula);
router.get('/', listarAulas);
router.put('/:id', atualizarAula);
router.get('/agendas/:agendas_id', listarAulasComPresenca);
router.delete('/:id', deletarAula);

module.exports = router;

/**
 * @swagger
 * /aulas:
 *   post:
 *     tags: [Aulas]
 *     summary: Cria uma nova aula
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [agendas_id, aula_nome, dia_da_semana]
 *             properties:
 *               agendas_id:
 *                 type: integer
 *               aula_nome:
 *                 type: string
 *               dia_da_semana:
 *                 type: string
 *               horario_inicio:
 *                 type: string
 *               horario_fim:
 *                 type: string
 *     responses:
 *       201:
 *         description: Aula criada com sucesso
 *       400:
 *         description: Dados obrigatórios faltando
 */

/**
 * @swagger
 * /aulas:
 *   get:
 *     tags: [Aulas]
 *     summary: Lista aulas por agenda
 *     parameters:
 *       - in: query
 *         name: agendas_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de aulas
 */

/**
 * @swagger
 * /aulas/{id}:
 *   put:
 *     tags: [Aulas]
 *     summary: Atualiza uma aula
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
 *               aula_nome:
 *                 type: string
 *               dia_da_semana:
 *                 type: string
 *               horario_inicio:
 *                 type: string
 *               horario_fim:
 *                 type: string
 *     responses:
 *       200:
 *         description: Aula atualizada
 */

/**
 * @swagger
 * /aulas/agendas/{agendas_id}:
 *   get:
 *     tags: [Aulas]
 *     summary: Lista aulas com presenças de uma agenda
 *     parameters:
 *       - in: path
 *         name: agendas_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aulas com presenças incluídas
 */

/**
 * @swagger
 * /aulas:
 *   delete:
 *     tags: [Aulas]
 *     summary: Deleta uma aula
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aula deletada
 */