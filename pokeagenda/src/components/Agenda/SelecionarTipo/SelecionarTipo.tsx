import React from "react";
import { useTema } from "../../../hooks/useTema";
import styles from './SelecionarTipo.module.css';
import '../../../styles/TiposIcon.css'

type Props = {
    tipoSelecionado: string;
    onSelecionar: (tipo: string) => void;
};

const SelecionarTipo: React.FC<Props> = ({ tipoSelecionado, onSelecionar }) => {
    const { tiposDisponiveis } = useTema();

    return (
        <div className={styles.temas}>
            <p>Escolha o tema:</p>
            <p className={`${styles.tipoSelecionado} ${tipoSelecionado}`}>Tipo selecionado: <strong>{tipoSelecionado.charAt(0).toUpperCase() + tipoSelecionado.slice(1)}</strong></p>
            <div className={styles.icones}>
                {tiposDisponiveis.map((tipo) => (
                    <button key={tipo} type="button" className={`${tipo} ${styles.iconeTipo} ${tipoSelecionado === tipo ? styles.selecionado : ''}`} onClick={() => onSelecionar(tipo)}>
                        <img src={`/iconstype/${tipo}.svg`} alt={tipo} /> 
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SelecionarTipo;