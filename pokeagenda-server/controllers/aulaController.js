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

async function atualizarAula(req, res) {
    const { id } = req.params;
    const { aula_nome, dia_da_semana, horario_inicio, horario_fim } = req.body;

    try {
        await pool.query(
            'UPDATE aulas SET aula_nome = ?, dia_da_semana = ?, horario_inicio = ?, horario_fim = ? WHERE id = ?',
            [aula_nome, dia_da_semana, horario_inicio, horario_fim, id]
        );
        res.json({ message: 'Aula atualizada com sucesso' });
    } catch (error) {
        console.error (error);
        res.status(500).json({ error: 'Erro ao atualizar aula' });
    }
}

async function listarAulasComPresenca(req, res) {
    const { agendas_id } = req.params;

    try {
        const [aulas] = await pool.query(
            'SELECT * FROM aulas WHERE agendas_id = ?',
            [agendas_id]
        );

        const result = [];

        for (const aula of aulas) {
            const [presencas] = await pool.query(
                'SELECT * FROM presenca WHERE aulas_id = ?',
                [aula.id]
            );

            result.push({
            ...aula,
            presencas
            });
        }
        res.json(result);
    } catch (error) {
        console.error (error);
        res.status(500).json({ error: 'Erro ao listar aulas com presenças' });
    }
}

async function deletarAula(req, res) {
    const { id } = req.params;

    try { 
        const [result] = await pool.query(
            'DELETE FROM aulas WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Aula não encontrada'});
        }

        res.json({ message: 'Aula excluída com sucesso' });
    } catch (error) {
        console.error (error);
        res.status(500).json({ error: 'Erro ao excluir aula' });
    }
}

module.exports = { criarAula, listarAulas, atualizarAula, listarAulasComPresenca, deletarAula };