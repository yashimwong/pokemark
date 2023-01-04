import HealthBar from "components/game/health-bar";
import AttackEffect from "components/game/attack-effect";
import SpecimenPortrait from "components/game/specimen-portrait";
import TypeBadge from "components/game/type-badge";
import { getSpecies } from "game/data/species";
import { Pokemon, PokemonType } from "game/types";

const BattlePokemon = ({ pokemon, opposing, attacking, hitType }: { pokemon: Pokemon; opposing?: boolean; attacking?: boolean; hitType?: PokemonType }) => {
    const currentSpecies = getSpecies(pokemon.speciesId);
    return (
        <div className={`battle-pokemon ${opposing ? "battle-pokemon-opposing" : ""} ${attacking ? "battle-pokemon-attacking" : ""} ${hitType ? "battle-pokemon-hit" : ""}`}>
            <SpecimenPortrait specimen={currentSpecies} size="battle" opposing={opposing} />
            {hitType && <AttackEffect type={hitType} />}
            <div className="battle-status">
                <div className="battle-status-code">PM-{currentSpecies.number} / LEVEL {String(pokemon.level).padStart(2, "0")}</div>
                <div className="battle-status-heading"><strong>{pokemon.nickname}</strong><div className="flex gap-1">{currentSpecies.types.map((type) => <TypeBadge key={type} type={type} />)}</div></div>
                <HealthBar current={pokemon.hp} max={pokemon.maxHp} />
            </div>
        </div>
    );
};

export default BattlePokemon;
