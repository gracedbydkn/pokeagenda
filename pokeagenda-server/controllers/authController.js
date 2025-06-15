const pool = require('../db.js');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Dados obrigatórios faltando' });
    }
  
    try {
        const [rows] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    
        if (rows.length > 0) {
          return res.status(400).json({ error: 'Email já cadastrado' });
        }

        await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha]);
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor' });
    }
}

async function login(req, res) {
    const { email, senha } = req.body;
  
    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    try {
        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
            [email, senha]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Email ou senha incorretos.' });
        }
        
        const usuario = { ...rows[0] };
        delete usuario.senha;

        const token = jwt.sign(
            { id: usuario.id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ message: 'Login bem-sucedido', token });
    } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Erro no servidor' });
    }
}

async function listarUsuarios(req, res) {
    try {
        const [rows] = await pool.query(
            'SELECT id, nome, email FROM usuarios'
        );
        res.json(rows);
    } catch (error) {
        console.error (error)
        res.status(500).json({ error: 'Erro ao listar usuários' })
    }
}

async function getMe(req, res) {
    const id = req.user?.id;

    if (!id) {
        return res.status(400).json({ error: 'Usuário não autenticado' });
    }

    try {
        const [rows] = await pool.query(
            'SELECT id, nome, email FROM usuarios WHERE id = ? ',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error (error)
        res.status(500).json({ error: 'Erro ao buscar usuário' })
    }
}

module.exports = { register, login, listarUsuarios, getMe };