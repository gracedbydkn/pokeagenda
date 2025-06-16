import React, { useEffect, useState } from "react";
import { useTema } from "../../hooks/useTema";
import { usePokemonAleatorioPorTipo } from "../../hooks/usePokemon";
import './Header.css';

const Header: React.FC<{ nomeAgenda: string }> = ({ nomeAgenda }) => {
    const { tipo, corFundo } = useTema();
    const { pokemons }= usePokemonAleatorioPorTipo(tipo, 20);

    return (
        <div className="header-agenda"
        style={{
            background: `linear-gradient(to bottom, ${corFundo}dd, ${corFundo}00)`,
        }}
        >
            <div className="pokemons-esquerda">
                {pokemons.slice(0, 10).map((p) => (
                    <img key={p.name} src={p.sprite} alt={p.name} className="poke-sprite" />
                ))}
            </div>

            <h1 className="agenda-nome">{nomeAgenda || "Sua PokéAgenda"}</h1>

            <div className="pokemons-direita">
                {pokemons.slice(10).map((p) => (
                    <img key={p.name} src={p.sprite} alt={p.name} className="poke-sprite" />
                ))}
            </div>
        </div>
    );
};

export default Header;