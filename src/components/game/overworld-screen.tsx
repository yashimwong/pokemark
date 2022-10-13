import MovementControls from "components/game/movement-controls";
import OverworldMap from "components/game/overworld-map";
import PokemonCard from "components/game/pokemon-card";
import WorldLegend from "components/game/world-legend";
import { GameState } from "game/types";
import { FiArrowUpRight, FiCrosshair, FiMapPin } from "react-icons/fi";

const OverworldScreen = ({ game, onMove, onOpenRoster }: { game: GameState; onMove: (dx: number, dy: number) => void; onOpenRoster: () => void }) => (
    <div className="overworld-layout">
        <section className="overworld-primary">
            <header className="overworld-header">
                <div><p className="eyebrow"><FiMapPin /> Sector 01 · Meadow basin</p><h1>Field survey</h1><p>Welcome back, Agent {game.trainerName}.</p></div>
                <div className="overworld-telemetry"><div><span>POSITION</span><strong>{String(game.playerPosition.x).padStart(2, "0")} : {String(game.playerPosition.y).padStart(2, "0")}</strong></div><div><span>CREDITS</span><strong>₽ {game.money}</strong></div><div><span>INSIGNIA</span><strong>{String(game.badges.length).padStart(2, "0")}</strong></div></div>
            </header>
            <div className="map-toolbar"><span><FiCrosshair /> Live topographic feed</span><span>GRID / 16 × 12</span></div>
            <OverworldMap game={game} onMove={onMove} />
            <div className="map-footer"><WorldLegend /><MovementControls onMove={onMove} /></div>
        </section>
        <aside className="overworld-sidebar">
            <div className="sidebar-heading"><div><p className="eyebrow">Active unit</p><h2>Field party</h2></div><button type="button" onClick={onOpenRoster} aria-label="Open full specimen roster"><FiArrowUpRight /></button></div>
            <div className="party-list">{game.party.map((pokemon, index) => <PokemonCard key={pokemon.uid} pokemon={pokemon} active={index === 0} />)}</div>
            <div className="field-note"><span>FIELD NOTE / 08</span><p>Dense habitat begins beyond the marked trail. Encounters remain unpredictable.</p></div>
            <div className="survey-progress"><div><span>REGION SURVEY</span><strong>{Math.min(92, 24 + game.defeatedTrainers.length * 18 + game.badges.length * 14)}%</strong></div><i><b style={{ width: `${Math.min(92, 24 + game.defeatedTrainers.length * 18 + game.badges.length * 14)}%` }} /></i></div>
        </aside>
    </div>
);

export default OverworldScreen;
