import React, { useEffect, useState } from 'react';
import Calendar from '../components/Calendar/Calendar';
import Header from '../components/Header/Header';
import MenuLateral from '../components/MenuLateral/MenuLateral';
import ModalCriarAgenda from '../components/Agenda/ModalCriarAgenda';
import ModalEditarAgenda from '../components/Agenda/ModalEditarAgenda/ModalEditarAgenda';
import ModalCriarAula from '../components/Aula/ModalCriarAula/ModalCriarAula';
import ModalEditarAula from '../components/Aula/ModalEditarAula/ModalEditarAula';
import ModalMensagem from '../components/ModalMensagem/ModalMensagem';
import './Dashboard.css';

import { useAgendas } from '../hooks/useAgendas';
import { useAulas } from '../hooks/useAulas';
import { useTema } from '../hooks/useTema';
import { useModalCriarAgenda, useModalEditarAgenda } from '../hooks/useModaisAgenda';
import { useAuth } from '../hooks/useAuth';
import { useModaisAula } from '../hooks/useModaisAula';

const Dashboard: React.FC = () => {
    const { usuario, handleLogout } = useAuth();
    const { agendas, criarAgenda, editarAgenda, excluirAgenda } =  useAgendas(usuario?.id);
    const [agendaSelecionada, setAgendaSelecionada] = useState<number | null>(null);
    const { aulas, criarAula, editarAula, excluirAula } = useAulas(agendaSelecionada);
    const [nomeAgenda, setNomeAgenda] = useState<string>('');
    const [MensagemFeedback, setMensagemFeedback] = useState<null | { texto: string; tipo: 'sucesso' | 'erro' }>(null);
    const { atualizarTema, wallpaper, corFundo } = useTema();

    const {
        aulaSelecionada,
        dataSelecionada,
        criando,
        editando,
        abrirModalCriarAula,
        abrirModalEditarAula,
        fecharModalCriar,
        fecharModalEditar
    } = useModaisAula();

    const {
        aberto: criandoAgenda,
        abrirModalAgenda: abrirModalCriarAgenda,
        fecharModalAgenda: fecharModalCriarAgenda
    } = useModalCriarAgenda();

    const {
        aberto: editandoAgenda,
        agenda: agendaParaEditar,
        abrirModalAgenda: abrirModalEditarAgenda,
        fecharModalAgenda: fecharModalEditarAgenda
    } = useModalEditarAgenda();
    
    const handleCriarAgenda = async (novaAgenda: { nome: string; tipo: string, presencaMinima: number }) => {
        await criarAgenda({ nome: novaAgenda.nome, tema: novaAgenda.tipo, presencaMinima: novaAgenda.presencaMinima });
    };
    
    useEffect(() => {
        const agenda = agendas.find(a => a.id === agendaSelecionada);
        if (agenda?.tema) {
            atualizarTema(agenda.tema.toLowerCase());
            setNomeAgenda(agenda.nome);
        }
    }, [agendaSelecionada, agendas]);

    return (
        <>
            <div className="dashboard-wallpaper" 
                style={{
                    backgroundImage: `url(${wallpaper})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: corFundo
                }}
            >
                <Header nomeAgenda={nomeAgenda} />
                <div className="dashboard-layout">
                    <MenuLateral agendas={agendas} agendaSelecionada={agendaSelecionada} selecionar={setAgendaSelecionada} onAbrirModal={abrirModalCriarAgenda} onEditarAgenda={abrirModalEditarAgenda} nomeUsuario={usuario?.nome} onLogout={handleLogout}/>
                    <main className="dashboard-conteudo">
                        <div className='calendar-wrapper'>
                            {agendaSelecionada && <Calendar 
                                aulas={aulas}
                                agendaSelecionada={agendaSelecionada}
                                abrirModalCriarAula={abrirModalCriarAula}   
                                abrirModalEditarAula={(aula, data) => abrirModalEditarAula(aula, data)}  
                            />}
                        </div>
                    </main>
                </div>
            </div>
            <ModalCriarAgenda aberto={criandoAgenda} fechar={fecharModalCriarAgenda} onCriar={handleCriarAgenda} />
            {agendaParaEditar && (
                <ModalEditarAgenda aberto={editandoAgenda} fechar={fecharModalEditarAgenda} agenda={agendaParaEditar} onSalvar={editarAgenda} onExcluir={excluirAgenda} />
            )}
            {criando && aulaSelecionada && (
                <ModalCriarAula
                    aberto={criando}
                    fechar={fecharModalCriar}
                    aulaInicial={{
                        aulaNome: aulaSelecionada.aula_nome,
                        horarioInicio: aulaSelecionada.horario_inicio,
                        horarioFim: aulaSelecionada.horario_fim,
                        diaSemana: aulaSelecionada.dia_da_semana
                    }}
                    onCriar={async (novaAula) => {
                        try {
                            await criarAula(novaAula);
                            setMensagemFeedback({ texto: 'Aula criada com sucesso', tipo: 'sucesso' })
                            fecharModalCriar();
                        } catch (error) {
                            setMensagemFeedback({ texto: 'Erro ao criar aula', tipo: 'erro' })
                            console.log('Erro:', error)
                        }
                        }}
                />
            )}

            {editando && aulaSelecionada && dataSelecionada && (
                <ModalEditarAula
                    aberto={editando}
                    fechar={fecharModalEditar}
                    aula={aulaSelecionada}
                    dataSelecionada={dataSelecionada}
                    onSalvar={async (aulaEditada) => {
                        await editarAula(aulaEditada);
                        fecharModalEditar();
                    }}
                    onExcluir={async (id) => {
                        await excluirAula(id);
                        fecharModalEditar()
                    }}
                />
            )}
            {MensagemFeedback && (
                <ModalMensagem
                    mensagem={MensagemFeedback.texto}
                    tipo={MensagemFeedback.tipo}
                    onClose={() => setMensagemFeedback(null)}
                />
            )}
        </>
    );
};

export default Dashboard;