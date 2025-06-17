import React, { ReactNode } from "react";
import styles from './ModalBase.module.css'

interface ModalBaseProps {
    aberto: boolean;
    fechar: () => void;
    titulo?: string;
    children: ReactNode;
}

const ModalBase: React.FC<ModalBaseProps> = ({ aberto, fechar, titulo, children }) => {
    if (!aberto) return null;

    return (
        <div className={styles["modal-overlay"]} onClick={fechar}>
            <div className={styles['modal-conteudo']} onClick={(e) => e.stopPropagation()}>
                {titulo && <h2 className={styles['modal-titulo']}>{titulo}</h2>}
                <div className={styles['modal-corpo']}>{children}</div>
                <button className={styles['modal-fechar']} onClick={fechar}>✕</button>
            </div>
        </div>
    );
};

export default ModalBase;