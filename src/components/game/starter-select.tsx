import SpecimenPortrait from "components/game/specimen-portrait";
import TypeBadge from "components/game/type-badge";
import { getSpecies } from "game/data/species";
import { FiArrowUpRight } from "react-icons/fi";

const starterIds = ["bulbasaur", "charmander", "squirtle"];

const StarterSelect = ({ trainerName, onSelect }: { trainerName: string; onSelect: (speciesId: string) => void }) => (
    <div className="starter-shell">
        <header className="starter-header">
            <div><p className="eyebrow">Oakwood research annex</p><h1>Select a field partner.</h1></div>
            <div className="starter-brief"><span>ASSIGNEE / {trainerName.toUpperCase()}</span><span>CLEARANCE / PROVISIONAL</span></div>
        </header>
        <p className="starter-lede">Three specimens have completed behavioral screening. Review their field data before making a permanent assignment.</p>
        <div className="starter-grid">
            {starterIds.map((id) => {
                const starter = getSpecies(id);
                return <button type="button" key={id} onClick={() => onSelect(id)} className="starter-card">
                    <SpecimenPortrait specimen={starter} size="starter" />
                    <div className="starter-card-heading"><div><span className="starter-number">SPECIMEN {starter.number}</span><h2>{starter.name}</h2></div><div className="flex gap-1">{starter.types.map((type) => <TypeBadge key={type} type={type} />)}</div></div>
                    <dl className="starter-stats"><div><dt>Vitality</dt><dd>{starter.baseHp}</dd></div><div><dt>Force</dt><dd>{starter.attack}</dd></div><div><dt>Guard</dt><dd>{starter.defense}</dd></div></dl>
                    <span className="starter-select">Assign partner <FiArrowUpRight /></span>
                </button>;
            })}
        </div>
        <footer className="starter-footer"><span>01 / SPECIMEN INTAKE</span><span>Selection cannot be amended in the field</span></footer>
    </div>
);

export default StarterSelect;
