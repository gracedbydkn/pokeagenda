import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { Usuario } from '../types/Usuario';
import { LoginResponse } from '../types/LoginResponse';

interface AuthContextType {
    usuario: Usuario | null;
    handleLogin: (email: string, senha: string) => Promise<void>;
    handleRegister: (nome: string, email: string, senha: string) => Promise<void>;
    handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const carregarUsuario = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await api.get<Usuario>('/auth/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUsuario(response.data);
                } catch {
                    handleLogout();
                }
            }
        };
        carregarUsuario();
    }, []);

    const handleLogin = async (email: string, senha: string) => {
        const response = await api.post<LoginResponse>('/auth/login', { email, senha });
        localStorage.setItem('token', response.data.token);
        const usuarioLogado = await api.get<Usuario>('/auth/me', {
            headers: { Authorization: `Bearer ${response.data.token}` },
        });
        setUsuario(usuarioLogado.data);
    };

    const handleRegister = async (nome: string, email: string, senha: string) => {
        const response = await api.post<LoginResponse>('/auth/register', {
            nome,
            email,
            senha
        });

        localStorage.setItem('token', response.data.token);

        const usuarioCriado = await api.get<Usuario>('/auth/me', {
            headers: { Authorization: `Bearer ${response.data.token}` },
        });

        setUsuario(usuarioCriado.data);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleRegister, handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;