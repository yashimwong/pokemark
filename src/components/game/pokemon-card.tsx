import HealthBar from "components/game/health-bar";
import TypeBadge from "components/game/type-badge";
import { species } from "game/data/species";
import { Pokemon } from "game/types";

const PokemonCard = ({ pokemon, active, onClick }: { pokemon: Pokemon; active?: boolean; onClick?: () => void }) => {
    const currentSpecies = species[pokemon.speciesId];
    return (
        <button type="button" onClick={onClick} className={`text-left rounded-2xl border-2 p-3 transition ${active ? "border-indigo-500 bg-indigo-50" : "border-slate-200 bg-white hover:border-indigo-300"}`}>
            <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-3xl" style={{ backgroundColor: `${currentSpecies.color}33` }}>{currentSpecies.sprite}</div>
                <div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><span className="font-bold truncate">{pokemon.nickname}</span><span className="text-sm text-slate-500">Lv. {pokemon.level}</span></div><div className="flex gap-1 mt-1">{currentSpecies.types.map((type) => <TypeBadge key={type} type={type} />)}</div></div>
            </div>
            <div className="mt-3"><HealthBar current={pokemon.hp} max={pokemon.maxHp} compact /></div>
        </button>
    );
};

export default PokemonCard;
