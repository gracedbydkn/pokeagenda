export interface Presenca {
    id?: number;
    dia_aula: string;
    presenca: number
}

export interface Aula {
    id: number;
    aula_nome: string;
    dia_da_semana: string;
    horario_inicio: string;
    horario_fim: string;
    presencas: Presenca[];
    agendas_id?: number;
}