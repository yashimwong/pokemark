import axios from "axios";
import React, { useEffect } from "react";

export type GlobaDataType = {
    pokemon_list?: [string];
    fetchPokemon?: () => void;
};

export const GlobalContext = React.createContext({});

type GlobalStatesProps = {
    children: React.ReactNode;
};

const GlobalStates = ({ children }: GlobalStatesProps) => {
    const [pokemon_list, setPokemonList] = React.useState([]);

    const fetchPokemon = async () => {
        const data = await axios.get("https://pokeapi.co/api/v2/pokemon", {
            params: { limit: 151, offset: 0 },
        });
        console.log(data);
    };

    useEffect(() => {}, []);

    return <GlobalContext.Provider value={{ pokemon_list, fetchPokemon }}>{children}</GlobalContext.Provider>;
};

export default GlobalStates;
