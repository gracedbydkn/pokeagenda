import React from "react";
import ModalBase from "../ModalBase/ModalBase";
import FormularioAgenda from "./FormularioAgenda/FormularioAgenda";

type Props = {
    aberto: boolean;
    fechar: () => void;
    onCriar: (dados: { nome: string; tipo: string; presencaMinima: number }) => void;
}

const ModalCriarAgenda: React.FC<Props> = ({ aberto, fechar, onCriar }) => {
    return (
        <ModalBase aberto={aberto} fechar={fechar} titulo="Criar nova agenda">
            <FormularioAgenda onSalvar={(dados) => {
                onCriar(dados); 
                fechar();
            }}/>    
        </ModalBase>
    );
};

export default ModalCriarAgenda;