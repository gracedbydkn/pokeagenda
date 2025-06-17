import { Aula } from "../types/Aula";

export function atualizarPresenca(
    presencas: Aula["presencas"],
    data: string,
    novaPresenca: number
) {
    const dataFormatada = new Date(data).toISOString().split('T')[0];

    const presencaExistente = presencas.find(
        (p) => new Date(p.dia_aula).toISOString().split('T')[0] === dataFormatada
    );

    if (presencaExistente) {
        return presencas.map((p) => 
            new Date(p.dia_aula).toISOString().split('T')[0] === dataFormatada ? { ...p, presenca: novaPresenca } : p
        );
    }

    return [
        ...presencas,
        {
            dia_aula: `${dataFormatada}T00:00:00.000Z`,
            presenca: novaPresenca
        }
    ];
}
