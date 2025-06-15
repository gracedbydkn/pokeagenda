import { useEffect, useState } from 'react';
import api from '../services/api';
import { Aula } from '../types/Aula';

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
    
    return aulas;
}