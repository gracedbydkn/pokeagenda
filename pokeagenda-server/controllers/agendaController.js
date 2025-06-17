const pool = require('../db');

async function criarAgenda(req, res) {
    const { usuarios_id, nome, porc_presenca_minima, tema } = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'Nome da agenda é obrigatório' });
    }

    try {
        await pool.query(
            'INSERT INTO agendas (usuarios_id, nome, porc_presenca_minima, tema) VALUES (?, ?, ?, ?)',
            [usuarios_id, nome, porc_presenca_minima || 75.00, tema]
        );
        res.status(201).json({ message: 'Agenda criada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar agenda' });
    }
}

async function listarAgendas(req, res) {
    const { usuarios_id } = req.params;

    if (!usuarios_id) {
        return res.status(400).json({ error: 'O parâmetro usuarios_id é obrigatório' });
    }
    
    try {
        const [rows] = await pool.query(
            'SELECT * FROM agendas WHERE usuarios_id = ?',
            [usuarios_id]
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar agendas' });
    }
}

async function atualizarAgenda(req, res) {
    const { id } = req.params;
    const { nome, tema, porc_presenca_minima } = req.body;
    const usuarioId = req.user?.id;

    if (!nome) {
        return res.status(400).json({ error: 'Nome da agenda é obrigatório' });
    }

    try {
        const [agendas] = await pool.query('SELECT usuarios_id FROM agendas WHERE id = ?', [id]);

        if (!agendas.length) {
            return res.status(404).json({ error: 'Agenda não encontrada' });
        }

        if (agendas[0].usuarios_id !== usuarioId) {
            return res.status(403).json({ error: 'Você não tem permissão para editar esta agenda' });
        }
        
        await pool.query(
            'UPDATE agendas SET nome = ?, porc_presenca_minima = ?, tema = ? WHERE id = ?',
            [nome, porc_presenca_minima || 75.00, tema || null, id]
        );

        res.json({ message: 'Agenda atualizada com sucesso' });
    } catch (error) {
        console.error (error);
        res.status(500).json({ error: 'Erro ao atualizar agenda' });
    }
}

async function deletarAgenda(req, res) {
    const { id } = req.params;
    const usuarioId = req.user?.id;

    try {
        const [agendas] = await pool.query(
            'SELECT usuarios_id FROM agendas WHERE id = ?',
            [id]
        );
        
        if (!agendas.length) {
            return res.status(404).json({ error: 'Agenda não encontrada' });
        }

        if (agendas[0].usuarios_id !== usuarioId) {
            return res.status(403).json({ error: 'Você não tem permissão para excluir esta agenda' });
        }

        await pool.query(
            'DELETE FROM agendas WHERE id = ?',
            [id]
        );

        res.json({ message: 'Agenda excluída com sucesso' });
    } catch (error) {
        console.error (error);
        res.status(500).json({ error: 'Erro ao excluir agenda' });
    }
}

module.exports = { criarAgenda, listarAgendas, atualizarAgenda, deletarAgenda };
