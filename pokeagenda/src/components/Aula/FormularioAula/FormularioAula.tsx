import React, { useState } from "react";
import styles from './FormularioAula.module.css'

type Props = {
    onSubmit: (dados: { nome: string; inicio: string; fim: string; diaSemana: string }) => void;
    nomeInicial?: string;
    inicioInicial?: string;
    fimInicial?: string;
    diaSemanaInicial?: string;
    textoBotao?: string
    bloquearHorario?: boolean
};

const FormularioAula: React.FC<Props> = ({
    onSubmit,
    nomeInicial = '',
    inicioInicial = '08:00',
    fimInicial = '09:00',
    diaSemanaInicial = '',
    textoBotao = 'Criar',
    bloquearHorario = false
}) => {
    const [nome, setNome] = useState(nomeInicial);
    const [inicio, setInicio] = useState(inicioInicial);
    const [fim, setFim] = useState(fimInicial);
    const [diaSemana, setDiaSemana] =useState(diaSemanaInicial);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const diaSemanaNomes = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
        onSubmit({
            nome,
            inicio: `${inicio}:00`,
            fim: `${fim}:00`,
            diaSemana: diaSemanaNomes[Number(diaSemana)],
        });
    };

    return (
        <form className={styles.formulario} onSubmit={handleSubmit}>
            <label>Nome da aula:</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} required />

            <label>Dia da semana:</label>
            <select value={diaSemana} onChange={(e) => setDiaSemana(e.target.value)}>
                <option value={0}>Domingo</option>
                <option value={1}>Segunda-feira</option>
                <option value={2}>Terça-feira</option>
                <option value={3}>Quarta-feira</option>
                <option value={4}>Quinta-feira</option>
                <option value={5}>Sexta-feira</option>
                <option value={6}>Sábado</option>
            </select>

            <label>Horário de início:</label>
            <input type="time" value={inicio} onChange={(e) => setInicio(e.target.value)} required readOnly={bloquearHorario}/>

            <label>Horário de término:</label>
            <input type="time" value={fim} onChange={(e) => setFim(e.target.value)} required readOnly={bloquearHorario}/>

            <button type="submit">{textoBotao}</button>
        </form>
    );
};

export default FormularioAula;