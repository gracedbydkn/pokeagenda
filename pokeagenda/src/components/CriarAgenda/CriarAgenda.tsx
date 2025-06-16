import React from "react";
import { TiposLista } from "../TiposLista/TiposLista";

export default function CriarAgenda() {
    const tipos = [
        'dark',
        'Dragon',
        'electric',
        'fairy',
        'fire',
        'ghost',
        'grass',
        'ground',
        'ice',
        'normal',
        'poisson',
        'water'
    ];

    return (
        <div>
            <h2>Escolha o tipo para sua agenda temática</h2>
            <TiposLista tipos={tipos} />
        </div>
    );
}