const pool = require('../db.js');

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
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha]);

        if (rows.length === 0) {
        return res.status(401).json({ error: 'Email ou senha incorretos.' });
        }
        
        const usuario = { ...rows[0] };
        delete usuario.senha;

        res.json({ message: 'Login bem-sucedido', usuario });
    } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Erro no servidor' });
    }
}

module.exports = { register, login };