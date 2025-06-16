import React, { useEffect, useState } from 'react';
import Calendar from '../components/Calendar/Calendar';
import Header from '../components/Header/Header';
import { useAgendas } from '../hooks/useAgendas';
import { useAulas } from '../hooks/useAulas';
import { useUsuario } from '../hooks/useUsuario';
import { useTema } from '../hooks/useTema';
import './Dashboard.css';


const Dashboard: React.FC = () => {
    const usuario = useUsuario();
    const agendas =  useAgendas(usuario?.id);
    const [agendaSelecionada, setAgendaSelecionada] = useState<number | null>(null);
    const aulas = useAulas(agendaSelecionada);
    
    const { atualizarTema, wallpaper, corFundo } = useTema();
    const [nomeAgenda, setNomeAgenda] = useState<string>('');

    useEffect(() => {
        const agenda = agendas.find(a => a.id === agendaSelecionada);
        if (agenda?.tema) {
            atualizarTema(agenda.tema.toLowerCase());
            setNomeAgenda(agenda.nome);
        }
    }, [agendaSelecionada, agendas]);

    return (
        <div className="dashboard-wallpaper" 
            style={{
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: corFundo
            }}
        >
            <Header nomeAgenda={nomeAgenda} />
            <main className="dashboard-conteudo">
                <div className="dashboard-topo">
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
                </div>
                {agendaSelecionada && <Calendar aulas={aulas} />}
            </main>
        </div>
    );
};

export default Dashboard;