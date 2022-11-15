import MainContainer from "components/layout/container";
import { useGame } from "game/context";
import { FiAward, FiBookOpen, FiMap, FiUser } from "react-icons/fi";

const Settings = () => {
    const { game } = useGame();
    return (
        <MainContainer className="game-main">
            <div className="log-shell">
                <header className="log-header"><div><p className="eyebrow">Persistent field record</p><h1>Expedition log</h1><p>Operational notes, credentials, and earned distinctions.</p></div><span>JOURNAL / {game.trainerName ? game.trainerName.toUpperCase() : "UNASSIGNED"}</span></header>
                <div className="log-grid">
                    <section className="log-panel"><div className="log-panel-heading"><FiMap /><div><span>PROTOCOL 01</span><h2>Field procedure</h2></div></div><ol className="protocol-list"><li><span>01</span><p>Navigate using directional keys, WASD, or the field controls.</p></li><li><span>02</span><p>Survey dense habitat to identify unregistered specimens.</p></li><li><span>03</span><p>Complete sanctioned duels to earn funds and insignia.</p></li><li><span>04</span><p>Return to medical stations to stabilize your active unit.</p></li></ol></section>
                    <section className="log-panel log-panel-dark"><div className="log-panel-heading"><FiUser /><div><span>IDENTITY</span><h2>Agent record</h2></div></div><dl className="agent-record"><div><dt>Call sign</dt><dd>{game.trainerName || "Not registered"}</dd></div><div><dt>Field credits</dt><dd>₽ {game.money}</dd></div><div><dt>Contacts cleared</dt><dd>{game.defeatedTrainers.length}</dd></div><div><dt>Registry volume</dt><dd>{game.party.length + game.storage.length}</dd></div></dl></section>
                    <section className="log-panel log-panel-wide"><div className="log-panel-heading"><FiAward /><div><span>DISTINCTIONS</span><h2>Regional insignia</h2></div></div><div className="badge-registry">{game.badges.length ? game.badges.map((badge) => <div key={badge} className="badge-entry"><FiAward /><span><strong>{badge}</strong><small>MEADOW LEAGUE / VERIFIED</small></span></div>) : <div className="badge-empty"><FiBookOpen /><span><strong>No distinctions recorded</strong><small>Clear Ace Trainer Luna to qualify for regional review.</small></span></div>}</div></section>
                </div>
            </div>
        </MainContainer>
    );
};

export default Settings;
