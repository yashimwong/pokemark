import classNames from "classnames";
import { PokemonType } from "game/types";

const typeClasses: Record<PokemonType, string> = {
    normal: "bg-stone-400", fire: "bg-red-500", water: "bg-blue-500", grass: "bg-green-600", electric: "bg-yellow-400 text-stone-800", bug: "bg-lime-600", poison: "bg-purple-600", ground: "bg-amber-600", flying: "bg-sky-400", psychic: "bg-pink-500", rock: "bg-stone-600"
};

const TypeBadge = ({ type }: { type: PokemonType }) => <span className={classNames("inline-flex px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold text-white", typeClasses[type])}>{type}</span>;

export default TypeBadge;
