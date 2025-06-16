import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import './RegisterForm.css';

const RegisterForm: React.FC = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { handleRegister } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await handleRegister(nome, email, senha);
            navigate('/agenda');
        } catch (error) {
            alert('Erro ao registrar');
            console.error('Erro no registro', error);
        }
    };

    return (
        <form onSubmit={onSubmit} className="register-form">
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
            />
            <button type="submit">Registrar</button>
            <p className="login-hint">
                Já possui uma conta? <a href="/login" className="login-link">Entrar</a>
            </p>
        </form>
    );
};

export default RegisterForm;