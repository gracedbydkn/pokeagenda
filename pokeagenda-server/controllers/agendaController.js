const pool = require('../db');

async function criarAgenda(req, res) {
    const { usuarios_id, nome, porc_presenca_minima } = req.body;

    if (!usuarios_id || !nome) {
        return res.status(400).json({ error: 'Usuário e nome da agenda são obrigatórios'});
    }

    try {
        await pool.query(
            'INSERT INTO agendas (usuarios_id, nome, porc_presenca_minima) VALUES (?, ?, ?)',
            [usuarios_id, nome, porc_presenca_minima || 75.00]
        );
        res.status(201).json({ message: 'Agenda criada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar agenda' });
    }
}

async function listarAgendas(req, res) {
    const { usuarios_id } = req.query;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM agendas WHERE usuarios_id = ?',
            [usuarios_id]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar agendas' });
    }
}

module.exports = { criarAgenda, listarAgendas };
