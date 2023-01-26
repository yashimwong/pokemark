import HealthBar from "components/game/health-bar";
import PokemonPortrait from "components/game/pokemon-portrait";
import TypeBadge from "components/game/type-badge";
import { getSpecies } from "game/data/species";
import { Pokemon } from "game/types";

const PokemonCard = ({ pokemon, active, onClick }: { pokemon: Pokemon; active?: boolean; onClick?: () => void }) => {
    const currentSpecies = getSpecies(pokemon.speciesId);
    return (
        <button type="button" onClick={onClick} className={`pokemon-card ${active ? "pokemon-card-active" : ""}`}>
            <div className="pokemon-card-main">
                <PokemonPortrait pokemon={currentSpecies} />
                <div className="pokemon-card-data">
                    <span className="pokemon-card-code">PM-{currentSpecies.number} · LV {String(pokemon.level).padStart(2, "0")}</span>
                    <strong>{pokemon.nickname}</strong>
                    <div className="flex gap-1 mt-1">{currentSpecies.types.map((type) => <TypeBadge key={type} type={type} />)}</div>
                </div>
            </div>
            <HealthBar current={pokemon.hp} max={pokemon.maxHp} compact />
        </button>
    );
};

export default PokemonCard;
