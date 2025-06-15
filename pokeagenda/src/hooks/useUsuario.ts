import { useEffect, useState } from "react";
import api from "../services/api";
import { Usuario } from "../types/Usuario";

export function useUsuario() {
    const [usuario, setUsuario] =  useState<Usuario | null>(null);
    
    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await api.get<Usuario>('/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUsuario(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuário', error);
            }
        };
        fetchUsuario();
    }, []);
    
    return usuario;
}