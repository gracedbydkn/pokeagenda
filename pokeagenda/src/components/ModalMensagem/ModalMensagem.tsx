import React from "react";
import './ModalMensagem.css';

interface ModalMensagemProps {
    mensagem: string;
    tipo: 'sucesso' | 'erro';
    onClose: () => void;
}

const ModalMensagem: React.FC<ModalMensagemProps> = ({ mensagem, tipo, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-content ${tipo}`} onClick={e => e.stopPropagation()}>
                <p>{mensagem}</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default ModalMensagem;   