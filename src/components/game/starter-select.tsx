import PokemonPortrait from "components/game/pokemon-portrait";
import TypeBadge from "components/game/type-badge";
import { getSpecies } from "game/data/species";
import { FiArrowUpRight } from "react-icons/fi";

const starterIds = ["bulbasaur", "charmander", "squirtle"];

const StarterSelect = ({ trainerName, onSelect }: { trainerName: string; onSelect: (speciesId: string) => void }) => (
    <div className="starter-shell">
        <header className="starter-header">
            <div><p className="eyebrow">Professor Oakwood's Lab</p><h1>Choose your Pokémon!</h1></div>
            <div className="starter-brief"><span>TRAINER / {trainerName.toUpperCase()}</span><span>PARTY / 0 OF 6</span></div>
        </header>
        <p className="starter-lede">Professor Oakwood has three Pokémon waiting. Choose the partner who will take the first step with you.</p>
        <div className="starter-grid">
            {starterIds.map((id) => {
                const starter = getSpecies(id);
                return <button type="button" key={id} onClick={() => onSelect(id)} className="starter-card">
                    <PokemonPortrait pokemon={starter} size="starter" />
                    <div className="starter-card-heading"><div><span className="starter-number">POKÉDEX NO. {starter.number}</span><h2>{starter.name}</h2></div><div className="flex gap-1">{starter.types.map((type) => <TypeBadge key={type} type={type} />)}</div></div>
                    <dl className="starter-stats"><div><dt>HP</dt><dd>{starter.baseHp}</dd></div><div><dt>Attack</dt><dd>{starter.attack}</dd></div><div><dt>Defense</dt><dd>{starter.defense}</dd></div></dl>
                    <span className="starter-select">I choose you! <FiArrowUpRight /></span>
                </button>;
            })}
        </div>
        <footer className="starter-footer"><span>01 / CHOOSE A PARTNER</span><span>A big adventure is about to begin!</span></footer>
    </div>
);

export default StarterSelect;
