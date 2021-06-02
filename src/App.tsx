import React, { useState } from "react";
import axios from "axios";
import Navigation from "./components/Navigation";
import PokemonDetails from "./PokemonDetails";

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: Sprite;
  stats: Array<Stats>;
  types: Array<Types>;
};

type Sprite = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

type Stats = {
  base_stat: number;
  effort: number;
  stat: Stat;
};

type Stat = {
  name: string;
  url: string;
};

export type Types = {
  slot: number;
  type: Type;
};

export type Type = {
  name: string;
  url: string;
};

const App = () => {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPokemon(name);
  };

  const fetchPokemon = (name: string) => {
    axios
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}/`)
      .then((response) => {
        const { id, name, height, weight, sprites, stats, types }: Pokemon =
          response.data;

        setPokemon({
          id: id,
          name: name,
          height: height,
          weight: weight,
          sprites: sprites,
          stats: stats,
          types: types,
        });

        console.log(pokemon);
      });
  };

  return (
    <>
      <Navigation version="0.01" />
      <div className="flex flex-col items-center">
        <form
          className="flex flex-col shadow-lg w-4/12 mt-4 py-12 px-8 rounded-lg"
          onSubmit={handleSubmit}
        >
          <h1>Enter Pokemon Name:</h1>
          <input
            className="bg-gray-100 py-2 px-2 mt-2"
            placeholder="test"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex flex-row justify-end">
            <button
              type="submit"
              className="rounded bg-gradient-to-r from-green-400 to-blue-500 text-gray-50 py-1 px-4 mt-4 hover:from-pink-500 hover:to-yellow-500"
            >
              Search
            </button>
          </div>
        </form>
        <PokemonDetails data={pokemon} />
      </div>
    </>
  );
};

export default App;
