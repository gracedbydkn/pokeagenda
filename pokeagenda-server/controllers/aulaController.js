const pool = require('../db');

async function criarAula(req, res) {
    const { agendas_id, aula_nome, dia_da_semana, horario_inicio, horario_fim } = req.body;

    if (!agendas_id || !aula_nome || !dia_da_semana) {
        return res.status(400).json({ error: 'Dados obrigatórios faltando' });
    }

    try {
        await pool.query(
            'INSERT INTO  aulas (agendas_id, aula_nome, dia_da_semana, horario_inicio, horario_fim) VALUES (?, ?, ?, ?, ?)',
            [agendas_id, aula_nome, dia_da_semana, horario_inicio, horario_fim]
        );
        res.status(201).json({ message: 'Aula criada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar aula' });
    }
}

async function listarAulas(req, res) {
    const { agendas_id } = req.query;

    if (!agendas_id) {
        return res.status(400).json({ error: 'Dados obrigatórios faltando' })
    }

    try {
        const [rows] = await pool.query(
            'SELECT * FROM aulas WHERE agendas_id = ?',
            [agendas_id]
        );
        res.json(rows);
    } catch (error) {
        console.error (error);
        res.status(500).json({ error: 'Erro ao listar aulas' });
    }
}

module.exports = { criarAula, listarAulas };