import classNames from "classnames";
import { PokemonSpecies } from "game/types";
import { CSSProperties } from "react";

const PokemonPortrait = ({ pokemon, size = "card", opposing }: { pokemon: PokemonSpecies; size?: "card" | "starter" | "battle"; opposing?: boolean }) => (
    <div className={classNames("pokemon-portrait", `pokemon-portrait-${size}`, opposing && "pokemon-portrait-opposing")} style={{ "--pokemon-color": pokemon.color } as CSSProperties}>
        <span className="pokemon-index">Nº {pokemon.number}</span>
        <img src={pokemon.artwork} alt={pokemon.name} draggable={false} />
    </div>
);

export default PokemonPortrait;
