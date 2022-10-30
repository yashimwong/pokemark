import HealthBar from "components/game/health-bar";
import SpecimenPortrait from "components/game/specimen-portrait";
import TypeBadge from "components/game/type-badge";
import { species } from "game/data/species";
import { Pokemon } from "game/types";

const BattlePokemon = ({ pokemon, opposing }: { pokemon: Pokemon; opposing?: boolean }) => {
    const currentSpecies = species[pokemon.speciesId];
    return (
        <div className={`battle-pokemon ${opposing ? "battle-pokemon-opposing" : ""}`}>
            <SpecimenPortrait specimen={currentSpecies} size="battle" opposing={opposing} />
            <div className="battle-status">
                <div className="battle-status-code">PM-{currentSpecies.number} / LEVEL {String(pokemon.level).padStart(2, "0")}</div>
                <div className="battle-status-heading"><strong>{pokemon.nickname}</strong><div className="flex gap-1">{currentSpecies.types.map((type) => <TypeBadge key={type} type={type} />)}</div></div>
                <HealthBar current={pokemon.hp} max={pokemon.maxHp} />
            </div>
        </div>
    );
};

export default BattlePokemon;
