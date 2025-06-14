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

async function atualizarAgenda(req, res) {
    const { id } = req.params;
    const { nome, porc_presenca_minima } = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'Nome da agenda é obrigatório' });
    }

    try {
        const [result] = await pool.query(
            'UPDATE agendas SET nome = ?, porc_presenca_minima = ? WHERE id = ?',
            [nome, porc_presenca_minima || 75.00, id]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: 'Agenda não encontrada' });
        }

        res.json({ message: 'Agenda atualizada com sucesso' });
    } catch (error) {
        console.error (error);
        res.status(500).json({ error: 'Erro ao atualizar agenda' });
    }
}

async function deletarAgenda(req, res) {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            'DELETE FROM agendas WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Agenda não encontrada' });
        }

        res.json({ message: 'Agenda excluída com sucesso' });
    } catch (error) {
        console.error (error);
        res.status(500).json({ error: 'Erro ao excluir agenda' });
    }
}

module.exports = { criarAgenda, listarAgendas, atualizarAgenda, deletarAgenda };
