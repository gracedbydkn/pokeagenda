import React, { useState } from "react";
import styles from './FormularioAgenda.module.css';
import SelecionarTipo from "../SelecionarTipo/SelecionarTipo";

type Props = {
    onSalvar: (dados: { nome: string; tipo: string; presencaMinima: number }) => void;
    nomeInicial?: string;
    tipoInicial?: string;
    presencaInicial?: number;
    textoBotao?: string
};

const FormularioAgenda: React.FC<Props> =  ({
    onSalvar,
    nomeInicial = '',
    tipoInicial = 'fairy',
    presencaInicial = 75,
    textoBotao = 'Criar'
}) => {
    const [nome, setNome] = useState(nomeInicial);
    const [tipo, setTipo] = useState(tipoInicial);
    const [presenca, setPresenca] = useState(presencaInicial);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSalvar({ nome, tipo, presencaMinima: presenca });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formulario}>
            <label>Nome da agenda:</label>
            <input type="text" value={nome} autoComplete="off" onChange={(e) => setNome(e.target.value)} required />

            <label>Presença mínima (%):
            <input type="number" min={0} max={100} step={1} value={presenca} onChange={(e) => setPresenca(Number(e.target.value))} />
            <small className={styles.aviso}>0% = não calcular presença</small>
            </label>
            <SelecionarTipo tipoSelecionado={tipo} onSelecionar={setTipo} />
            <div className={styles.botoes}>
                <button type="submit" className={styles.botaoCriar}>{textoBotao}</button>
            </div>
        </form>
    );
};

export default FormularioAgenda;