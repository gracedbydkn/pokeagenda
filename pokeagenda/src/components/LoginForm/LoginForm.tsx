import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import './LoginForm.css'
import ModalMensagem from "../ModalMensagem/ModalMensagem";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [tipo, setTipo] = useState<'sucesso' | 'erro' | null>(null);
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await handleLogin(email, senha);
            setMensagem('Login bem-sucedido');
            setTipo('sucesso');
            navigate('/agenda')
        } catch (error) {
            setMensagem('Email ou senha inválidos');
            setTipo('erro');
            console.log('Erro no login:', error)
        }
    };



    return (
        <>
        <form onSubmit={onSubmit} className="login-form">
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
            <button type="submit">Entrar</button>

            <p className="registro-hint">
                Não possui uma conta?{' '}
                <Link to="/register" className="registro-link">Registre-se</Link>
            </p>
        </form>
        {tipo && (
            <ModalMensagem
                mensagem={mensagem}
                tipo={tipo}
                onClose={() => setTipo(null)}
            />
        )}
        </>
    );
};

export default LoginForm;
    