import HealthBar from "components/game/health-bar";
import TypeBadge from "components/game/type-badge";
import { species } from "game/data/species";
import { Pokemon } from "game/types";

const BattlePokemon = ({ pokemon, opposing }: { pokemon: Pokemon; opposing?: boolean }) => {
    const currentSpecies = species[pokemon.speciesId];
    return (
        <div className={`flex items-end gap-3 ${opposing ? "flex-row-reverse" : ""}`}>
            <div className="battle-sprite" style={{ backgroundColor: `${currentSpecies.color}33` }}>{currentSpecies.sprite}</div>
            <div className="battle-status"><div className="flex items-center gap-2"><strong>{pokemon.nickname}</strong><span className="text-xs text-slate-500">Lv. {pokemon.level}</span></div><div className="flex gap-1 mt-1">{currentSpecies.types.map((type) => <TypeBadge key={type} type={type} />)}</div><div className="mt-3"><HealthBar current={pokemon.hp} max={pokemon.maxHp} /></div></div>
        </div>
    );
};

export default BattlePokemon;
