import Elements from "./Elements";
import { Pokemon } from "../../types/pokemon";

type PokemonDetailsProps = {
  data?: Pokemon;
};

const PokemonDetails = ({ data: pokemon }: PokemonDetailsProps) => {
  if (!pokemon) return <></>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col shadow-lg mt-4 w-max py-12 px-10 rounded-lg">
        <div className="flex flex-row">
          <h1 className="text-4xl font-semibold uppercase mr-2">
            {pokemon.name}
          </h1>
          <Elements data={pokemon.types} />
        </div>
        <div className="flex flex-row mt-6">
          <div className="flex flex-col w-1/2">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name + " default sprite"}
            />
            <div className="flex flex-row items-center flex-nowrap mb-1">
              <div className="border-none bg-gray-700 text-gray-50 text-sm rounded py-1 w-14 text-center mr-2">
                Height
              </div>
              {pokemon.height * 0.1}m
            </div>
            <div className="flex flex-row items-center flex-nowrap">
              <div className="border-none bg-gray-700 text-gray-50 text-sm rounded py-1 w-14 text-center mr-2">
                Weight
              </div>
              {pokemon.weight * 0.1}
              kg
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <h2 className="text-2xl font-semibold capitalize mb-2">
              Basic Status
            </h2>
            {pokemon.stats.map((stat) => {
              return (
                <div
                  className="flex flex-row flex-nowrap mb-1.5"
                  key={stat.stat.name}
                >
                  <div className="bg-gray-200 capitalize w-52 text-center mr-1.5 border-none rounded p-1">
                    {stat.stat.name}
                  </div>
                  <div className="flex flex-row flex-nowrap items-center  justify-center w-14 bg-yellow-100 border-none rounded">
                    {stat.base_stat}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
