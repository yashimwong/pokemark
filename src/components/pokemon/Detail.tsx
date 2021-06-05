import Elements from "./Elements";
import { Pokemon } from "../../types/pokemon";

type PokemonDetailsProps = {
  data?: Pokemon;
};

const PokemonDetails = ({ data: pokemon }: PokemonDetailsProps) => {
  if (!pokemon) return <></>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row shadow-lg mt-4 w-max py-12 px-8 rounded-lg">
        <div className="flex flex-col w-1/2">
          <p>Name: {pokemon.name}</p>
          <p>
            Element: <Elements data={pokemon.types} />
          </p>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name + " default sprite"}
          />
          <p>Height: {pokemon.height * 0.1}m</p>
          <p>Weight: {pokemon.weight * 0.1}kg</p>
        </div>
        <div className="flex flex-col w-1/2">
          <h1>Stats</h1>
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
