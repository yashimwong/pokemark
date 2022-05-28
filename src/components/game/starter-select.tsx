import TypeBadge from "components/game/type-badge";
import { species } from "game/data/species";

const starterIds = ["sproutle", "cindercub", "bubblit"];

const StarterSelect = ({ trainerName, onSelect }: { trainerName: string; onSelect: (speciesId: string) => void }) => (
    <div className="game-panel max-w-4xl mx-auto px-6 py-10 text-center">
        <p className="text-indigo-600 font-bold text-sm">Professor Oakwood</p>
        <h1 className="text-3xl font-black text-slate-900 mt-2">Choose your first partner, {trainerName}!</h1>
        <p className="text-slate-600 mt-3">Each one has a different strength. Your journey starts with the choice you make today.</p>
        <div className="grid md:grid-cols-3 gap-5 mt-8">
            {starterIds.map((id) => {
                const starter = species[id];
                return <button type="button" key={id} onClick={() => onSelect(id)} className="rounded-2xl border-2 border-slate-200 p-6 bg-white hover:border-indigo-500 hover:-translate-y-1 transition text-center"><div className="text-6xl mb-4">{starter.sprite}</div><h2 className="font-black text-xl">{starter.name}</h2><div className="flex justify-center gap-1 mt-2">{starter.types.map((type) => <TypeBadge key={type} type={type} />)}</div><p className="text-sm text-slate-500 mt-4">HP {starter.baseHp} · ATK {starter.attack} · DEF {starter.defense}</p><span className="inline-flex mt-5 font-bold text-indigo-600">Choose {starter.name}</span></button>;
            })}
        </div>
    </div>
);

export default StarterSelect;
