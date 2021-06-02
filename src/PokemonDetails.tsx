import { Pokemon } from "./App";

type PokemonDetailsProps = {
  data?: Pokemon;
};

const PokemonDetails = ({ data: pokemon }: PokemonDetailsProps) => {
  if (!pokemon) return <></>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row shadow-lg mt-4 w-max py-12 px-8 rounded-lg">
        <div className="flex flex-col">
          <p>Name: {pokemon.name}</p>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name + " default sprite"}
          />
          <p>Height: {pokemon.height * 0.1}m</p>
          <p>Weight: {pokemon.weight * 0.1}kg</p>
        </div>
        <div className="flex flex-col">
          {pokemon.stats.map((stat) => {
            return (
              <p key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
