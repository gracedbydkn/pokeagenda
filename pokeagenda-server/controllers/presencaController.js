const pool = require('../db');

async function registrarPresenca(req, res) {
    const { aulas_id, dia_aula, presenca } = req.body;
    
    if (!aulas_id || !dia_aula || typeof presenca !== 'number') {
        return res.status(400).json({ error: 'Dados obrigatórios faltando'});
    }

    try {
        await pool.query(
            'INSERT INTO presenca (aulas_id, dia_aula, presenca) VALUES (?, ?, ?)',
            [aulas_id, dia_aula, presenca]
        );
        res.status(201).json({ message: 'Presença registrada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar presença' });
    }
}

async function listarPresencas(req, res) {
    const { aulas_id } = req.params;

    if (!aulas_id) {
        return res.status(400).json({ error: 'Dados obrigatórios faltando' })
    }

    try {
        const [rows] = await pool.query(
            'SELECT * FROM presenca WHERE aulas_id = ? ORDER BY dia_aula DESC',
            [aulas_id]
        );
        res.json(rows);
    } catch (error) {
        console.error (error);
        res.status(500).json({ error: 'Erro ao listar presenças' });
    }
}

async function calcularPresenca(req, res) {
    const { aulaId } = req.params;

    try {
        const [rows] = await pool.query(
            'SELECT COUNT(*) AS total, SUM(presenca) AS presentes FROM presenca WHERE aulas_id = ?',
            [aulaId]
        );
        
        const { total, presentes } = rows[0];
        const percentual = total > 0 ? ((presentes / total) * 100).toFixed(2) : 0;
        
        res.json({ total, presentes, percentual: Number(percentual) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao calcular presença' });
    }
}

async function atualizarPresenca(req, res) {
    const { id } = req.params;
    const { presenca } = req.body;

    if (typeof presenca !== 'boolean') {
        return res.status(400).json({ error: 'Dados obrigatórios inválidos' });
    }
    
    try {
        await pool.query(
            'UPDATE presenca SET presenca = ? WHERE id = ?',
            [presenca, id]
        );
        res.json({ message: 'Presença atualizada com sucesso' });
    } catch (error) {
        console.error (error);
        res.status(500).json({ error: 'Erro ao atualizar presença' });
    }
}

module.exports = { registrarPresenca, listarPresencas, calcularPresenca, atualizarPresenca };