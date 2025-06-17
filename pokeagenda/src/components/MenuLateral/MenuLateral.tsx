import React, { useState, useRef, useEffect } from "react";
import './MenuLateral.css';
import '../../styles/TiposIcon.css';
import './Submenu.css';
import { useTema } from "../../hooks/useTema";
import { useClickFora } from "../../hooks/useClickFora";
import { Agenda } from "../../types/Agenda";

type MenuLateralProps = {
    agendas: Agenda[];
    agendaSelecionada: number | null;
    selecionar: (id:number) => void;
    onAbrirModal: () => void;
    onEditarAgenda: (agenda: Agenda) => void;
    nomeUsuario?: string;
    onLogout: () => void;
};

const MenuLateral: React.FC<MenuLateralProps> = ({ agendas, agendaSelecionada, selecionar, onAbrirModal, onEditarAgenda, nomeUsuario, onLogout }) => {
    const { corFundo } = useTema();
    const [submenuCriarAberto, setSubmenuCriarAberto] = useState(false);
    const [submenuEditarAberto, setSubmenuEditarAberto] = useState(false);
    const [submenuPerfilAberto, setSubmenuPerfilAberto] = useState(false);
    const submenuCriarRef = useRef<HTMLDivElement>(null);
    const submenuEditarRef = useRef<HTMLDivElement>(null);
    const submenuPerfilRef = useRef<HTMLDivElement>(null);
    useClickFora(submenuCriarRef, () => setSubmenuCriarAberto(false));
    useClickFora(submenuEditarRef, () => setSubmenuEditarAberto(false));
    useClickFora(submenuPerfilRef, () => setSubmenuPerfilAberto(false));

    return (
        <aside className="menu-lateral" style={{
            backgroundColor: `${corFundo}CC`,
            borderRadius: `12px `   
        }}>
            <div className="scroll-wrapper">
                <div className="lista-agendas">
                    {agendas.map((agenda) => (
                    <div key={agenda.id} className="icone-wrapper">
                        <div
                        className={`icone-tipo ${agenda.tema} ${agendaSelecionada === agenda.id ? 'ativo' : ''}`}
                        onClick={() => selecionar(agenda.id)}
                        >
                        <img src={`iconstype/${agenda.tema}.svg`} alt={agenda.tema} title={agenda.nome} />
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <div className="menu-botoes">
                <div className="submenu-container" ref={submenuEditarRef}>
                    <button className="botao-icone" onClick={() => setSubmenuEditarAberto((prev) => !prev)}>
                        <img src="/icons/edit.svg" alt="Editar" title="Editar" />
                    </button>
                    <div className={`submenu ${submenuEditarAberto ? 'aberto' : ''}`}>
                        <button onClick={() => {
                            const agendaAtual = agendas.find(a => a.id === agendaSelecionada);
                            if (agendaAtual) {
                                onEditarAgenda({
                                    id: agendaAtual.id,
                                    nome: agendaAtual.nome,
                                    tema: agendaAtual.tema,
                                    porc_presenca_minima: agendaAtual.porc_presenca_minima
                                });
                                setSubmenuEditarAberto(false);
                            }
                        }}>Editar Agenda</button>
                    </div>
                </div>
                <div className="submenu-container" ref={submenuCriarRef}>
                    <button className="botao-icone" onClick={() => setSubmenuCriarAberto((prev) => !prev)}>
                        <img src="/icons/plus.svg" alt="Adicionar" title="Adicionar"/>
                    </button>
                    <div className={`submenu ${submenuCriarAberto ? 'aberto' : ''}`}>
                        <button onClick={onAbrirModal}>Criar Agenda</button>
                    </div>
                </div>
                <div className="submenu-container" ref={submenuPerfilRef} style={{position: 'relative' }}>
                    <button className="botao-icone" onClick={() => setSubmenuPerfilAberto(prev => !prev)}>
                        <img src="/icons/user.svg" alt="Perfil" title="Perfil"/>
                    </button>
                    <div className={`submenu submenu-perfil ${submenuPerfilAberto ? 'aberto' : ''}`}>
                        <div className="submenu-usuario">
                            Olá, <strong>{nomeUsuario}</strong>
                        </div>
                        <button className="botao-sair" onClick={onLogout}>Sair</button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default MenuLateral;