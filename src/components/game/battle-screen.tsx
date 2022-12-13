import { useState } from "react";
import BattleActions from "components/game/battle-actions";
import BattlePokemon from "components/game/battle-pokemon";
import PokemonCard from "components/game/pokemon-card";
import { GameState, Move } from "game/types";
import { FiActivity, FiArrowLeft } from "react-icons/fi";

const BattleScreen = ({ game, onFight, onSwitch, onCatch, onRun }: { game: GameState; onFight: (move: Move) => void; onSwitch: (index: number) => void; onCatch: () => void; onRun: () => void }) => {
    const [switching, setSwitching] = useState(false);
    const battle = game.battle;
    if (!battle) return null;
    const player = game.party[battle.activePlayerIndex];
    const opponent = battle.opponent.pokemon[battle.activeOpponentIndex];
    if (!player || !opponent) return null;
    const opponentName = battle.opponent.kind === "wild" ? "Wild Pokémon" : `${battle.opponent.trainer?.title} ${battle.opponent.trainer?.name}`;

    return (
        <div className="battle-shell">
            <div className="battle-header"><span><FiActivity /> Contact confirmed</span><strong>{opponentName}</strong><span>{battle.opponent.kind === "wild" ? "UNREGISTERED SPECIMEN" : "SANCTIONED DUEL"}</span></div>
            <div className="battle-scene">
                <span className="battle-axis battle-axis-horizontal" />
                <span className="battle-axis battle-axis-vertical" />
                <BattlePokemon pokemon={opponent} opposing />
                <BattlePokemon pokemon={player} />
            </div>
            <div className="battle-console">
                <div className="battle-message"><span>LIVE LOG / 01</span><p>{battle.message}</p></div>
                {switching ? <div className="battle-switcher"><p>Select a healthy field partner.</p><div className="battle-switcher-grid">{game.party.map((pokemon, index) => <PokemonCard key={pokemon.uid} pokemon={pokemon} active={index === battle.activePlayerIndex} onClick={() => { onSwitch(index); setSwitching(false); }} />)}</div><button type="button" onClick={() => setSwitching(false)} className="battle-back"><FiArrowLeft /> Return to commands</button></div> : <BattleActions moves={player.moves} canCatch={battle.opponent.kind === "wild"} canRun={battle.canRun} onFight={onFight} onCatch={onCatch} onRun={onRun} onSwitch={() => setSwitching(true)} />}
            </div>
        </div>
    );
};

export default BattleScreen;
