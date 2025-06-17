import React from "react";
import ModalBase from "../../ModalBase/ModalBase";
import FormularioAula from "../FormularioAula/FormularioAula";

type Props = {
    aberto: boolean;
    fechar: () => void;
    aulaInicial: {
        aulaNome: string;
        horarioInicio: string;
        horarioFim: string;
        diaSemana: string;
    };
    onCriar: (dados: {
        nome: string;
        inicio: string;
        fim: string;
        diaSemana: string;
    }) => void;
};

const ModalCriarAula: React.FC<Props> = ({ aberto, fechar, aulaInicial, onCriar }) => {
    return (
        <ModalBase aberto={aberto} fechar={fechar} titulo="Criar nova aula">
            <FormularioAula
                textoBotao="Criar"
                nomeInicial={aulaInicial?.aulaNome}
                inicioInicial={aulaInicial?.horarioInicio.slice(0, 5)}
                fimInicial={aulaInicial?.horarioFim.slice(0, 5)}
                diaSemanaInicial={aulaInicial.diaSemana}
                onSubmit={(dados) => {
                    onCriar(dados);
                    fechar();
                }}
            />
        </ModalBase>
    );
};

export default ModalCriarAula;
