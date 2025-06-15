import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
            await handleLogin(email, senha);
            navigate('/agenda');
        } catch (error) {
            alert('Erro no login');
            console.log('Erro no login:', error)
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" />
            <button onClick={onSubmit}>Entrar</button>
        </div>
    );
};

export default LoginPage;