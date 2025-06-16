import { useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemon";

export const usePokemonAleatorioPorTipo = (tipo: string, quantidade: number = 1) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
        if (!tipo) return;

        const fetchPokemon = async () => {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
                const data = await res.json();
                
                const lista = data.pokemon as { pokemon: { name: string; url: string }}[];
                if (!lista.length) return;
                const aleatorios = new Set<string>();
                const urls: string[] = [];

                while (aleatorios.size < Math.min(quantidade, lista.length)) {
                    const escolhido = lista[Math.floor(Math.random() * lista.length)].pokemon;
                    if (!aleatorios.has(escolhido.name)) {
                        aleatorios.add(escolhido.name);
                        urls.push(escolhido.url);
                    }
                }

                const pokeRes = await Promise.all(
                    urls.map((url) => fetch(url).then((res) => res.json()))
                );

                const formatados = pokeRes.map((poke) => ({
                    name: poke.name,
                    sprite: poke.sprites.front_default,
                }));

                setPokemons(formatados);
            } catch (error) {
                console.error('Errp ao buscar pokémon aleatório', error);
                setPokemons([]);
            }
        };

        fetchPokemon();
    }, [tipo, quantidade]);

    return { pokemons };
}