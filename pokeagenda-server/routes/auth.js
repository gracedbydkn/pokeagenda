const express = require('express');
const router = express.Router();
const autenticarJWT = require('../middleware/auth')
const { register, login, listarUsuarios, getMe } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/me', autenticarJWT, getMe);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints de login, registro e perfil do usuário
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Fulano
 *               email:
 *                 type: string
 *                 example: fulano@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados faltando ou email já cadastrado
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: fulano@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login bem-sucedido
 *                 token:
 *                   type: string
 *       400:
 *         description: Dados obrigatórios faltando
 *       401:
 *         description: Email ou senha incorretos
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Usuário não autenticado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuário
 */