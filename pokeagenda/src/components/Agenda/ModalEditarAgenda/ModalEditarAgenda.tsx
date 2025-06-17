import React from "react";
import ModalBase from "../../ModalBase/ModalBase";
import FormularioAgenda from "../FormularioAgenda/FormularioAgenda";
import { Agenda } from "../../../types/Agenda";
import styles from './ModalEditarAgenda.module.css'

type Props = {
    aberto: boolean;
    fechar: () => void;
    agenda: Agenda;
    onSalvar: (dados: Agenda) => void;
    onExcluir: (id: number) => void
}

const ModalEditarAgenda: React.FC<Props> = ({ aberto, fechar, agenda, onSalvar, onExcluir }) => {
    return (
        <ModalBase aberto={aberto} fechar={fechar} titulo="Editar agenda">
            <FormularioAgenda
                nomeInicial={agenda.nome}
                tipoInicial={agenda.tema}
                presencaInicial={agenda.porc_presenca_minima}
                onSalvar={(dados) => {
                    onSalvar({ ...agenda, ...dados });
                    fechar()
                }}
                textoBotao="Salvar"
            />
            <div className={styles.botoesRodape}>
                <button className={styles.botaoExcluir} onClick={() => {
                    // eslint-disable-next-line no-restricted-globals
                    if (confirm('Tem certeza que deseja excluir essa agenda?')) {
                        onExcluir(agenda.id);
                        fechar();
                    }
                }}>
                    Excluir agenda
                </button>
            </div>
        </ModalBase>
    );
};

export default ModalEditarAgenda;