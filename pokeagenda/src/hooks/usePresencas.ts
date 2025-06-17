import api from "../services/api";

export function usePresencas() {
    const salvarPresenca = async (
        aulaId: number,
        dia: string,
        valor: number
    ) => {
        try {
            await api.post('/presenca', {
                aulas_id: aulaId,
                dia_aula: `${dia}`,
                presenca: valor
            });
        } catch (error) {
            console.error('Erro ao registrar presença:', error)
        }
    };

    const editarPresenca = async (
        presencaId: number,
        novoValor: number
    ) => {
        try {
            await api.put(`/presenca/${presencaId}`, {
                presenca: novoValor
            });
        }catch (error) {
            console.error('Erro ao editar presença:', error);
        }
    };

    return { salvarPresenca, editarPresenca }
}