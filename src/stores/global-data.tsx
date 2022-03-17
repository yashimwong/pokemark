import axios from "axios";
import React, { useEffect } from "react";
import { PokemonList } from "types/pokemon";

export type GlobaDataType = {
    pokemon_list: PokemonList[];
};

export const GlobalContext = React.createContext<GlobaDataType>({
    pokemon_list: [],
});

type GlobalStatesProps = {
    children: React.ReactNode;
};

const GlobalStates = ({ children }: GlobalStatesProps) => {
    const [pokemon_list, setPokemonList] = React.useState([]);

    const fetchPokemon = async () => {
        const results = await axios.get("https://pokeapi.co/api/v2/pokemon", {
            params: { limit: 151, offset: 0 },
        });
        setPokemonList(results.data.results);
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    return <GlobalContext.Provider value={{ pokemon_list }}>{children}</GlobalContext.Provider>;
};

export default GlobalStates;
