import { useEffect, useRef, useState } from "react";
import BattleActions from "components/game/battle-actions";
import BattlePokemon from "components/game/battle-pokemon";
import PokemonCard from "components/game/pokemon-card";
import { GameState, Move, PokemonType } from "game/types";
import { FiActivity, FiArrowLeft } from "react-icons/fi";

const BattleScreen = ({ game, onFight, onSwitch, onCatch, onRun }: { game: GameState; onFight: (move: Move) => void; onSwitch: (index: number) => void; onCatch: () => void; onRun: () => void }) => {
    const [switching, setSwitching] = useState(false);
    const [attack, setAttack] = useState<{ type: PokemonType; move: string } | null>(null);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
    const attackLocked = useRef(false);
    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    const battle = game.battle;
    if (!battle) return null;
    const player = game.party[battle.activePlayerIndex];
    const opponent = battle.opponent.pokemon[battle.activeOpponentIndex];
    if (!player || !opponent) return null;
    const opponentName = battle.opponent.kind === "wild" ? "Wild Pokémon" : `${battle.opponent.trainer?.title} ${battle.opponent.trainer?.name}`;
    const fight = (move: Move) => {
        if (attackLocked.current) return;
        attackLocked.current = true;
        setAttack({ type: move.type, move: move.name });
        timers.current.push(setTimeout(() => onFight(move), 260));
        timers.current.push(setTimeout(() => {
            attackLocked.current = false;
            setAttack(null);
        }, 620));
    };

    return (
        <div className="battle-shell">
            <div className="battle-header"><span><FiActivity /> Battle!</span><strong>{opponentName}</strong><span>{battle.opponent.kind === "wild" ? "WILD ENCOUNTER" : "TRAINER BATTLE"}</span></div>
            <div className="battle-scene">
                <span className="battle-axis battle-axis-horizontal" />
                <span className="battle-axis battle-axis-vertical" />
                <BattlePokemon pokemon={opponent} opposing hitType={attack?.type} />
                <BattlePokemon pokemon={player} attacking={Boolean(attack)} />
                {attack && <div className="battle-move-callout" aria-live="polite">{player.nickname} used<br /><strong>{attack.move}!</strong></div>}
            </div>
            <div className="battle-console">
                <div className="battle-message"><span>BATTLE TEXT</span><p>{battle.message}</p></div>
                {switching ? <div className="battle-switcher"><p>Choose a Pokémon.</p><div className="battle-switcher-grid">{game.party.map((pokemon, index) => <PokemonCard key={pokemon.uid} pokemon={pokemon} active={index === battle.activePlayerIndex} onClick={() => { onSwitch(index); setSwitching(false); }} />)}</div><button type="button" onClick={() => setSwitching(false)} className="battle-back"><FiArrowLeft /> Back</button></div> : <BattleActions moves={player.moves} canCatch={battle.opponent.kind === "wild"} canRun={battle.canRun} disabled={Boolean(attack)} onFight={fight} onCatch={onCatch} onRun={onRun} onSwitch={() => setSwitching(true)} />}
            </div>
        </div>
    );
};

export default BattleScreen;
