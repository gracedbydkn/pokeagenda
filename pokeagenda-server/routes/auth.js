const express = require('express');
const router = express.Router();
const { register, login, listarUsuarios } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/usuarios', listarUsuarios);

module.exports = router;