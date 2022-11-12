import MainContainer from "components/layout/container";
import PokemonCard from "components/game/pokemon-card";
import { useGame } from "game/context";
import { FiArchive, FiLayers, FiPlus } from "react-icons/fi";

const Roster = () => {
    const { game } = useGame();
    return (
        <MainContainer className="game-main">
            <div className="roster-shell">
                <header className="roster-header">
                    <div><p className="eyebrow">Specimen registry</p><h1>Field roster</h1><p>Review the condition and classification of assigned specimens.</p></div>
                    <div className="roster-summary"><div><FiLayers /><span>ACTIVE UNIT</span><strong>{game.party.length} / 6</strong></div><div><FiArchive /><span>ARCHIVE</span><strong>{game.storage.length}</strong></div></div>
                </header>
                <div className="roster-section-heading"><div><span>01</span><div><h2>Active field unit</h2><p>Primary specimen deploys first during contact.</p></div></div><span>{game.party.length} ENTRIES</span></div>
                {!game.party.length ? <div className="roster-empty"><FiPlus /><strong>No specimens assigned</strong><p>Initialize an expedition and complete specimen intake.</p></div> : <div className="roster-grid">{game.party.map((pokemon, index) => <PokemonCard key={pokemon.uid} pokemon={pokemon} active={index === 0} />)}</div>}
                {game.storage.length > 0 && <section className="roster-archive"><div className="roster-section-heading"><div><span>02</span><div><h2>Research archive</h2><p>Specimens outside the active rotation.</p></div></div><span>{game.storage.length} ENTRIES</span></div><div className="roster-grid">{game.storage.map((pokemon) => <PokemonCard key={pokemon.uid} pokemon={pokemon} />)}</div></section>}
            </div>
        </MainContainer>
    );
};

export default Roster;
