import { PokemonType } from "game/types";

const TypeBadge = ({ type }: { type: PokemonType }) => <span className={`type-badge type-${type}`}><i />{type}</span>;

export default TypeBadge;
