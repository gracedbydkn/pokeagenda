import { useEffect, useState } from 'react';
import api from '../services/api';
import { Agenda } from '../types/Agenda';

export  function useAgendas(usuarioId: number | undefined) {
    const [agendas, setAgendas] = useState<Agenda[]>([]);

    useEffect(() => {
        const fetchAgendas = async () => {
            if (!usuarioId) return;
            try {
                const response = await api.get<Agenda[]>(`/agendas/usuarios/${usuarioId}`);
                setAgendas(response.data);
            } catch (error) {
                console.error('Erro ao carregar agendas:', error);
            }
        };  

        fetchAgendas();
    }, [usuarioId]);

    const criarAgenda = async (nova: { nome: string; tema: string; presencaMinima: number}) => {
        if (!usuarioId) return;
        console.log(usuarioId)
        try {
            const response = await api.post<Agenda>('/agendas', {
                nome: nova.nome,
                tema: nova.tema,
                porc_presenca_minima: nova.presencaMinima,
                usuarios_id: usuarioId
            });

            const agendaCriada = response.data;
            setAgendas((prev) => [...prev, agendaCriada]);
        } catch (error) {
            console.error('Erro ao criar agenda:', error)
        }
    };

    const editarAgenda = async (atualizada: Agenda) => {
        try {
            const response = await api.put<Agenda>(`/agendas/${atualizada.id}`, {
                nome: atualizada.nome,
                porc_presenca_minima: atualizada.porc_presenca_minima,
                tema: atualizada.tema
            });
            const agendaEditada = response.data;
            setAgendas((prev) =>
                prev.map((a) => (a.id === agendaEditada.id ? { ...a, ...agendaEditada } : a))
            );
        } catch (error) {
            console.error('Erro ao editar agenda:', error);
        }
    };

    const excluirAgenda = async (id: number) => {
        try {
            await api.delete(`/agendas/${id}`);
            setAgendas((prev) => prev.filter((agenda) => agenda.id !== id));
        } catch (error) {
            console.error('Erro ao excluir agenda:', error);
        }
    };

    return { agendas, criarAgenda, editarAgenda, excluirAgenda };
}