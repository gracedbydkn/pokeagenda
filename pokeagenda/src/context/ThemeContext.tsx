import React, { createContext, useState } from "react";

type TemaInfo = {
    tipo: string;
    wallpaper: string;
    corFundo: string;
};

type ThemeContextType = TemaInfo & {
    atualizarTema: (tipo: string) => void
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tema, setTema] = useState<TemaInfo>({
        tipo: 'ice',
        wallpaper: '/wallpapers/ice.jpg',
        corFundo: '#6ac5e4'
    });

    const atualizarTema = (tipo: string) => {
        if (tipo == tema.tipo) return;

        setTema({
            tipo,
            wallpaper: `/wallpapers/${tipo}.jpg`,
            corFundo: coresPorTipo[tipo] || '#6ac5e4'
        });
    };

    return (
        <ThemeContext.Provider value={{ ...tema, atualizarTema }}>
            {children}
        </ThemeContext.Provider>
    );
};

const coresPorTipo: Record<string, string> = {
    fire: '#c04237',
    water: '#d6efff',
    grass: '#c04237',
    electric: '#fdf6c4',
    ghost: '#511d80',
    ground: '#ebdfa6',
    poison: '#553897',
    dragon: '#434ba7',
    dark: '#603b6e',
    ice: '#6ac5e4',
    fairy: '#eacca3'
};

export default ThemeContext;