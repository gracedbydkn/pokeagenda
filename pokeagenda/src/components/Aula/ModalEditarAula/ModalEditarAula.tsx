import React from 'react';
import ModalBase from '../../ModalBase/ModalBase';
import FormularioAula from '../FormularioAula/FormularioAula';
import { Aula } from '../../../types/Aula';
import { usePresencas } from '../../../hooks/usePresencas';
import { atualizarPresenca } from '../../../utils/presenca';
import './ModalEditarAula.css'

type Props = {
    aberto: boolean;
    fechar: () => void;
    aula: Aula;
    dataSelecionada: string;
    onSalvar: (dados: Aula) => void;
    onExcluir: (id: number) => void;
};

const ModalEditarAula: React.FC<Props> = ({ aberto, fechar, aula, onSalvar, onExcluir, dataSelecionada }) => {
    const { salvarPresenca, editarPresenca } = usePresencas();

    const presencaDoDia = aula.presencas.find(
        (p) => new Date(p.dia_aula).toISOString().split('T')[0] === dataSelecionada
    );
    const presencaInicial = presencaDoDia?.presenca === 1;
    const handlePresencaChange = async (checked: boolean) => {
        const dataFormatada = new Date(dataSelecionada).toISOString().split('T')[0];
        
        const novaPresenca = checked ? 1 : 0;
        console.log('Data selecionada:', dataFormatada)

        if (presencaDoDia && presencaDoDia.id) {
            await editarPresenca(presencaDoDia.id, novaPresenca);
        } else {
            await salvarPresenca(aula.id, dataFormatada, novaPresenca);
        }

        const novasPresencas = atualizarPresenca(aula.presencas, dataSelecionada, novaPresenca);
        onSalvar({ ...aula, presencas: novasPresencas });
        fechar();
    };
    return (
        <ModalBase aberto={aberto} fechar={fechar} titulo="Editar aula">
            <FormularioAula
                textoBotao="Salvar"
                nomeInicial={aula.aula_nome}
                inicioInicial={aula.horario_inicio.slice(0, 5)}
                fimInicial={aula.horario_fim.slice(0, 5)}
                diaSemanaInicial={aula.dia_da_semana}
                bloquearHorario
                onSubmit={(dados) => {
                onSalvar({
                    ...aula,
                    aula_nome: dados.nome,
                    horario_inicio: dados.inicio,
                    horario_fim: dados.fim,
                    dia_da_semana: String(dados.diaSemana)
                });
                fechar();
                }}
            />

            <div className='presenca-checkbox'>
                <label>
                    <input  
                        type='checkbox'
                        checked={presencaInicial}
                        onChange={(e) => handlePresencaChange(e.target.checked)}
                    />
                    Marcar presença para <strong>{dataSelecionada}</strong>
                </label>
            </div>

            <div style={{ marginTop: '16px', padding: '0 16px' }}>
                <button className='botao-excluir'
                    onClick={() => {
                        // eslint-disable-next-line no-restricted-globals
                        if (confirm('Tem certeza que deseja excluir esta aula?')) {
                            onExcluir(aula.id);
                            fechar();
                        }
                    }}
                >
            Excluir aula
            </button>
        </div>
        </ModalBase>
    );
};

export default ModalEditarAula;