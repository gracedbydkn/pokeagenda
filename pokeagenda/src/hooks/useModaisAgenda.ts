import { useState } from "react";
import { Agenda } from "../types/Agenda";

export function useModalCriarAgenda() {
    const [aberto, setAberto] = useState(false);
    return {
        aberto,
        abrirModalAgenda: () => setAberto(true),
        fecharModalAgenda: () => setAberto(false)
    };
}

export function useModalEditarAgenda() {
    const [modalAgendaAberto, setModalAgendaAberto] = useState(false);
    const [agendaSelecionada, setAgendaSelecionada] = useState<Agenda | null>(null);

    function abrirModalAgenda(agenda: Agenda) {
        setAgendaSelecionada(agenda);
        setModalAgendaAberto(true)
    }

    function fecharModalAgenda() {
        setModalAgendaAberto(false)
    }

    return { 
        aberto: modalAgendaAberto,
        agenda: agendaSelecionada,
        abrirModalAgenda,
        fecharModalAgenda
    };
}