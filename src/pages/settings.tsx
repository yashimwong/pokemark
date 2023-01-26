import MainContainer from "components/layout/container";
import { useGame } from "game/context";
import { FiAward, FiBookOpen, FiMap, FiUser } from "react-icons/fi";

const Settings = () => {
    const { game } = useGame();
    return (
        <MainContainer className="game-main">
            <div className="log-shell">
                <header className="log-header"><div><p className="eyebrow">Player data</p><h1>Trainer Card</h1><p>Your adventure, party, and League progress.</p></div><span>ID / {game.trainerName ? game.trainerName.toUpperCase() : "NEW TRAINER"}</span></header>
                <div className="log-grid">
                    <section className="log-panel"><div className="log-panel-heading"><FiMap /><div><span>HOW TO PLAY</span><h2>Trainer tips</h2></div></div><ol className="protocol-list"><li><span>01</span><p>Move with the arrow keys, WASD, or the on-screen D-pad.</p></li><li><span>02</span><p>Walk through tall grass to find wild Pokémon.</p></li><li><span>03</span><p>Battle Trainers to earn Poké and League badges.</p></li><li><span>04</span><p>Visit the Poké Center to fully heal your party.</p></li></ol></section>
                    <section className="log-panel log-panel-dark"><div className="log-panel-heading"><FiUser /><div><span>TRAINER ID</span><h2>Player record</h2></div></div><dl className="agent-record"><div><dt>Name</dt><dd>{game.trainerName || "New Trainer"}</dd></div><div><dt>Poké</dt><dd>₽ {game.money}</dd></div><div><dt>Wins</dt><dd>{game.defeatedTrainers.length}</dd></div><div><dt>Pokémon</dt><dd>{game.party.length + game.storage.length}</dd></div></dl></section>
                    <section className="log-panel log-panel-wide"><div className="log-panel-heading"><FiAward /><div><span>POKÉMON LEAGUE</span><h2>Badge case</h2></div></div><div className="badge-registry">{game.badges.length ? game.badges.map((badge) => <div key={badge} className="badge-entry"><FiAward /><span><strong>{badge}</strong><small>MEADOW LEAGUE / EARNED</small></span></div>) : <div className="badge-empty"><FiBookOpen /><span><strong>No badges yet</strong><small>Defeat Ace Trainer Luna to earn the Meadow Badge.</small></span></div>}</div></section>
                </div>
            </div>
        </MainContainer>
    );
};

export default Settings;
