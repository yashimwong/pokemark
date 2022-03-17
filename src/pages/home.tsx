import React from "react";
import { PokemonList } from "types/pokemon";
import { GlobalContext, GlobaDataType } from "stores/global-data";

const Home = () => {
    const { pokemon_list }: GlobaDataType = React.useContext(GlobalContext);

    return (
        <div>
            <h1 className="text-2xl">Homepage</h1>
            <select>
                {pokemon_list.map(({ name, url }: PokemonList) => {
                    return (
                        <option key={name} value={url}>
                            {name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default Home;
