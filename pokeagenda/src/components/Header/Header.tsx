import React, { useEffect, useState } from "react";
import { useTema } from "../../hooks/useTema";
import { usePokemonAleatorioPorTipo } from "../../hooks/usePokemon";
import './Header.css';

const Header: React.FC<{ nomeAgenda: string }> = ({ nomeAgenda }) => {
    const { tipo, corFundo } = useTema();
    const { pokemons }= usePokemonAleatorioPorTipo(tipo, 20);
    const [maxSprites, setMaxSprites] = useState(4);
    
    useEffect(() => {
        const atualizarSprites = () => {
            const largura = window.innerWidth;

            if (largura < 480) setMaxSprites(0);
            else if (largura < 600) setMaxSprites(1);
            else if (largura < 768) setMaxSprites(3);
            else if (largura < 980) setMaxSprites(5);
            else if (largura < 1180) setMaxSprites(6);
            else if (largura < 1380) setMaxSprites(7);
            else if (largura < 1580) setMaxSprites(8);
            else if (largura < 1780) setMaxSprites(9);
            else setMaxSprites(10);
        };

        atualizarSprites();
        window.addEventListener('resize', atualizarSprites);
        return () => window.removeEventListener('resize', atualizarSprites);
    }, []);

    return (
        <div className="header-agenda"
        style={{
            background: `linear-gradient(to bottom, ${corFundo}dd, ${corFundo}00)`,
        }}
        >
            <div className="pokemons-esquerda">
                {pokemons.slice(0, maxSprites).map((p) => (
                    <img key={p.name} src={p.sprite} alt={p.name} className="poke-sprite" />
                ))}
            </div>

            <h1 className="agenda-nome">{nomeAgenda || "Sua PokéAgenda"}</h1>

            <div className="pokemons-direita">
                {pokemons.slice(maxSprites, maxSprites * 2).map((p) => (
                    <img key={p.name} src={p.sprite} alt={p.name} className="poke-sprite" />
                ))}
            </div>
        </div>
    );
};

export default Header;