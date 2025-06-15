import React, { useState } from 'react';
import Calendar from '../components/Calendar/Calendar';
import { useAgendas } from '../hooks/useAgendas';
import { useAulas } from '../hooks/useAulas';
import { useUsuario } from '../hooks/useUsuario';

const AgendaPage: React.FC = () => {
    const usuario = useUsuario();
    const agendas =  useAgendas(usuario?.id);
    const [agendaSelecionada, setAgendaSelecionada] = useState<number | null>(null);
    const aulas = useAulas(agendaSelecionada);
    
    return (
        <div>
            <h2>Minha Agenda</h2>
                <label>
                    Selecione uma agenda:
                    <select onChange={(e) => setAgendaSelecionada(Number(e.target.value))} defaultValue="">
                        <option value="" disabled>
                            Escolha uma agenda
                        </option>
                        {agendas.map((agenda) => (
                            <option key={agenda.id} value={agenda.id}>
                                {agenda.nome}
                            </option>
                        ))}
                    </select>
                </label>
            {agendaSelecionada && <Calendar aulas={aulas} />}
        </div>
    );
};

export default AgendaPage;