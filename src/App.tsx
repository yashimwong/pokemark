import React, { useState } from "react";
import axios from "axios";
import Navigation from "./components/Navigation";
import Details from "./components/pokemon/Details";
import Search from "./components/pokemon/Search";
import Loading from "./components/Loading";
import { Pokemon } from "./types/pokemon";

const App = () => {
  const [name, setName] = useState("");
  const [is_loading, setLoading] = useState(false);
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

        setTimeout(() => {
          setLoading(false);
        }, 500);
      });

    setLoading(true);
  };

  return (
    <>
      <Navigation version="0.01" />
      <div className="flex flex-col items-center">
        <Search handleSubmit={handleSubmit} setName={setName} name={name} />
        {is_loading ? <Loading /> : <Details data={pokemon} />}
      </div>
    </>
  );
};

export default App;
