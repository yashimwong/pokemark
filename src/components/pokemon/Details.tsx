import Elements from "./Elements";
import { Pokemon } from "../../types/pokemon";

type DetailsProps = {
  data?: Pokemon;
};

const Details = ({ data: pokemon }: DetailsProps) => {
  if (!pokemon) return <></>;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center shadow-lg my-4 lg:py-12 lg:px-10 rounded-lg lg:w-max w-11/12">
        <div className="flex flex-row mt-6 lg:mt-0">
          <h1 className="text-4xl font-semibold uppercase mr-2">
            {pokemon.name}
          </h1>
          <Elements data={pokemon.types} />
        </div>
        <div className="flex lg:flex-row flex-col mt-6">
          <div className="flex flex-col lg:w-1/2 w-full">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name + " default sprite"}
            />
            <div className="flex flex-row items-center flex-nowrap mb-1">
              <div className="border-none bg-gray-700 text-gray-50 text-sm rounded py-1 lg:w-14 w-1/2 text-center mr-2">
                Height
              </div>
              {pokemon.height * 0.1}m
            </div>
            <div className="flex flex-row items-center flex-nowrap">
              <div className="border-none bg-gray-700 text-gray-50 text-sm rounded py-1 lg:w-14 w-1/2 text-center mr-2">
                Weight
              </div>
              {pokemon.weight * 0.1}
              kg
            </div>
          </div>
          <div className="flex flex-col lg:w-1/2 w-full lg:my-0 my-4">
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

export default Details;
