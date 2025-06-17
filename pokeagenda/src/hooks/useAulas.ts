import { useEffect, useState } from 'react';
import api from '../services/api';
import { Aula } from '../types/Aula';

type NovaAula = {
    nome: string;
    inicio: string;
    fim: string;
    diaSemana: string;
};

export function useAulas(agendaId: number | null) {
    const [aulas, setAulas] = useState<Aula[]>([]);
    
    useEffect(() => {
        const fetchAulas = async () => {
            if (!agendaId) return
            try {
                const response = await api.get<Aula[]>(`/aulas/agendas/${agendaId}`);
                setAulas(response.data);
            } catch (error) {
                console.error('Erro ao carregar aulas:', error);
            }
        };

        fetchAulas();
    }, [agendaId]);
    
    const criarAula = async (dados: NovaAula) => {
        if (!agendaId) return;
        try {
            const response = await api.post<Aula>(`/aulas`, {
                aula_nome: dados.nome,
                horario_inicio: dados.inicio,
                horario_fim: dados.fim,
                dia_da_semana: dados.diaSemana,
                agendas_id: agendaId
            });

            console.log( dados.nome, dados.inicio, dados.fim, dados.diaSemana, agendaId)
            setAulas((prev) =>  [...prev, response.data]);
        } catch (error) {
            console.error('Erro ao criar aula:', error);
        }
    };

    const editarAula = async (aulaAtualizada: Aula) => {
        try {
            await api.put(`/aulas/${aulaAtualizada.id}`, {
                aula_nome: aulaAtualizada.aula_nome,
                horario_inicio: aulaAtualizada.horario_inicio,
                horario_fim: aulaAtualizada.horario_fim,
                dia_da_semana: aulaAtualizada.dia_da_semana
            });

            setAulas((prev) =>
            prev.map((a) => (a.id === aulaAtualizada.id ? aulaAtualizada : a))
            );
        } catch (error) {
            console.error('Erro ao editar aula:', error);
        }
    }

    const excluirAula = async (id: number) => {
        try {
            await api.delete(`/aulas/${id}`);
            setAulas((prev) => prev.filter((a) => a.id !== id))
        } catch (error) {
            console.error('Erro ao excluir aula:', error);
        }
    };

    return { aulas, criarAula, editarAula, excluirAula };
}