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
                console.log('Erro ao carregar agendas:', error);
            }
        };  

        fetchAgendas();
    }, [usuarioId]);

    return agendas;
}