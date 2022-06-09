import MovementControls from "components/game/movement-controls";
import OverworldMap from "components/game/overworld-map";
import PokemonCard from "components/game/pokemon-card";
import { GameState } from "game/types";

const OverworldScreen = ({ game, onMove, onOpenRoster }: { game: GameState; onMove: (dx: number, dy: number) => void; onOpenRoster: () => void }) => (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_270px] gap-6 items-start">
        <section className="game-panel p-4 sm:p-6">
            <div className="flex flex-wrap items-center gap-3 mb-5"><div><p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Meadow Town</p><h1 className="text-2xl font-black">Explore, {game.trainerName}</h1></div><div className="ml-auto text-right"><p className="font-bold text-amber-600">◉ {game.money}</p><p className="text-xs text-slate-500">{game.badges.length} badge{game.badges.length === 1 ? "" : "s"}</p></div></div>
            <OverworldMap game={game} onMove={onMove} />
            <p className="mt-4 text-center text-sm text-slate-500">Use arrow keys, WASD, or the controls to move. Walk in tall grass to find Pokémon.</p>
            <MovementControls onMove={onMove} />
        </section>
        <aside className="game-panel p-5">
            <div className="flex items-center justify-between"><h2 className="font-black text-lg">Your Party</h2><button type="button" onClick={onOpenRoster} className="text-sm font-bold text-indigo-600">View roster</button></div>
            <div className="grid gap-3 mt-4">{game.party.map((pokemon, index) => <PokemonCard key={pokemon.uid} pokemon={pokemon} active={index === 0} />)}</div>
            <div className="rounded-xl bg-indigo-50 p-4 mt-5 text-sm text-indigo-900"><p className="font-bold">Town guide</p><p className="mt-1">✚ heals your team. ● marks trainers looking for a battle.</p></div>
        </aside>
    </div>
);

export default OverworldScreen;
