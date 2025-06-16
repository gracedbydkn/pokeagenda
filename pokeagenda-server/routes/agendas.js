const express = require('express');
const router = express.Router();
const { criarAgenda, listarAgendas, atualizarAgenda, deletarAgenda } = require('../controllers/agendaController');

router.post('/', criarAgenda);
router.get('/usuarios/:usuarios_id', listarAgendas);
router.put('/:id', atualizarAgenda);
router.delete('/:id', deletarAgenda);

module.exports = router;

/**
 * @swagger
 * tags:
 *   - name: Agendas
 *     description: Gerenciamento de agendas
 *   - name: Aulas
 *     description: Gerenciamento de aulas
 *   - name: Presenças
 *     description: Registro e consulta de presenças
 */

/**
 * @swagger
 * /agendas:
 *   post:
 *     tags: [Agendas]
 *     summary: Cria uma nova agenda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [usuarios_id, nome]
 *             properties:
 *               usuarios_id:
 *                 type: integer
 *               nome:
 *                 type: string
 *               porc_presenca_minima:
 *                 type: number
 *               tema:
 *                 type: string
 *     responses:
 *       201:
 *         description: Agenda criada com sucesso
 *       400:
 *         description: Nome da agenda é obrigatório
 */

/**
 * @swagger
 * /agendas/usuarios/{usuarios_id}:
 *   get:
 *     tags: [Agendas]
 *     summary: Lista as agendas de um usuário
 *     parameters:
 *       - in: path
 *         name: usuarios_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de agendas
 *       400:
 *         description: ID do usuário obrigatório
 */

/**
 * @swagger
 * /agendas/{id}:
 *   put:
 *     tags: [Agendas]
 *     summary: Atualiza uma agenda existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome]
 *             properties:
 *               nome:
 *                 type: string
 *               porc_presenca_minima:
 *                 type: number
 *               tema:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agenda atualizada com sucesso
 *       400:
 *         description: Nome obrigatório ou agenda não encontrada
 */

/**
 * @swagger
 * /agendas/{id}:
 *   delete:
 *     tags: [Agendas]
 *     summary: Deleta uma agenda
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Agenda deletada com sucesso
 *       404:
 *         description: Agenda não encontrada
 */