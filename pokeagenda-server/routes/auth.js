const express = require('express');
const router = express.Router();
const autenticarJWT = require('../middleware/auth')
const { register, login, listarUsuarios, getMe } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/usuarios', listarUsuarios);
router.get('/me', autenticarJWT, getMe);

module.exports = router;