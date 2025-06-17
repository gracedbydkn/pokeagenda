import { useState } from "react";
import { Aula } from "../types/Aula";

export function useModaisAula() {
    const [aulaSelecionada, setAulaSelecionada] = useState<Aula | null>(null);
    const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
    const [criando, setCriando] = useState(false);
    const [editando, setEditando] = useState(false);

    function abrirModalCriarAula(dia: string, hora:string) {
        setAulaSelecionada({
            id: 0,
            aula_nome: '',
            horario_inicio: `${hora}:00`,
            horario_fim: `${hora}:59`,
            dia_da_semana: dia,
            presencas: []
        });
        setCriando(true);
        setDataSelecionada(dia)
    }

    function abrirModalEditarAula(aula: Aula, data: string) {
        setAulaSelecionada(aula);
        setDataSelecionada(data);
        setEditando(true);
    }

    return {
        aulaSelecionada,
        dataSelecionada,
        criando,
        editando,
        abrirModalCriarAula,
        abrirModalEditarAula,
        fecharModalCriar: () => setCriando(false),
        fecharModalEditar: () => setEditando(false)
    };
}