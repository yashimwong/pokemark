import MovementControls from "components/game/movement-controls";
import OverworldMap from "components/game/overworld-map";
import PokemonCard from "components/game/pokemon-card";
import WorldLegend from "components/game/world-legend";
import { GameState } from "game/types";
import { FiArrowUpRight, FiCrosshair, FiMapPin } from "react-icons/fi";

const OverworldScreen = ({ game, onMove, onOpenPokedex }: { game: GameState; onMove: (dx: number, dy: number) => void; onOpenPokedex: () => void }) => (
    <div className="overworld-layout">
        <section className="overworld-primary">
            <header className="overworld-header">
                <div><p className="eyebrow"><FiMapPin /> Route 01 · Meadow Town</p><h1>Meadow Town</h1><p>Welcome back, Trainer {game.trainerName}!</p></div>
                <div className="overworld-telemetry"><div><span>POSITION</span><strong>{String(game.playerPosition.x).padStart(2, "0")} : {String(game.playerPosition.y).padStart(2, "0")}</strong></div><div><span>CREDITS</span><strong>₽ {game.money}</strong></div><div><span>INSIGNIA</span><strong>{String(game.badges.length).padStart(2, "0")}</strong></div></div>
            </header>
            <div className="map-toolbar"><span><FiCrosshair /> Explore the region</span><span>MAP / 16 × 12</span></div>
            <OverworldMap game={game} onMove={onMove} />
            <div className="map-footer"><WorldLegend /><MovementControls onMove={onMove} /></div>
        </section>
        <aside className="overworld-sidebar">
            <div className="sidebar-heading"><div><p className="eyebrow">Pokémon team</p><h2>Your party</h2></div><button type="button" onClick={onOpenPokedex} aria-label="Open Pokédex"><FiArrowUpRight /></button></div>
            <div className="party-list">{game.party.map((pokemon, index) => <PokemonCard key={pokemon.uid} pokemon={pokemon} active={index === 0} />)}</div>
            <div className="field-note"><span>TRAINER TIP!</span><p>Walk through tall grass to meet wild Pokémon. Weaken them before throwing a Poké Ball.</p></div>
            <div className="survey-progress"><div><span>ADVENTURE</span><strong>{Math.min(92, 24 + game.defeatedTrainers.length * 18 + game.badges.length * 14)}%</strong></div><i><b style={{ width: `${Math.min(92, 24 + game.defeatedTrainers.length * 18 + game.badges.length * 14)}%` }} /></i></div>
        </aside>
    </div>
);

export default OverworldScreen;
