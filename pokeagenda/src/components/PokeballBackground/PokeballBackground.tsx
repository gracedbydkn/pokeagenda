import React from 'react';
import './PokeballBackground.css'

const PokeballBackground: React.FC = () => (
    <>
        <div className="pokebola-linha" />
        <div className='pokeagenda-title'>PokéAgenda</div>
        <div className="fechadura-central">
            <img src="/logo-pokeagenda.svg" alt="Logo" className="botao-logo" />
        </div>
    </>
);

export default PokeballBackground;