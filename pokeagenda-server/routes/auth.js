const express = require('express');
const router = express.Router();
const { register, login, listarUsuarios, getMe } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/usuarios', listarUsuarios);
router.get('/me', getMe);

module.exports = router;