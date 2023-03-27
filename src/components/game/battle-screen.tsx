import { useEffect, useRef, useState } from "react";
import BattleActions from "components/game/battle-actions";
import BattlePokemon from "components/game/battle-pokemon";
import PokemonCard from "components/game/pokemon-card";
import { GameState, Move, PokemonType } from "game/types";
import { FiActivity, FiArrowLeft } from "react-icons/fi";

const BattleScreen = ({ game, onFight, onSwitch, onCatch, onRun }: { game: GameState; onFight: (move: Move) => void; onSwitch: (index: number) => void; onCatch: () => void; onRun: () => void }) => {
    const [switching, setSwitching] = useState(false);
    const [attack, setAttack] = useState<{ type: PokemonType; move: string } | null>(null);
    const [catching, setCatching] = useState(false);
    const [trainerIntro, setTrainerIntro] = useState(game.battle?.opponent.kind === "trainer");
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
    const actionLocked = useRef(false);
    useEffect(() => {
        if (trainerIntro) {
            actionLocked.current = true;
            timers.current.push(setTimeout(() => {
                actionLocked.current = false;
                setTrainerIntro(false);
            }, 1450));
        }
        return () => timers.current.forEach(clearTimeout);
    }, []);

    const battle = game.battle;
    if (!battle) return null;
    const player = game.party[battle.activePlayerIndex];
    const opponent = battle.opponent.pokemon[battle.activeOpponentIndex];
    if (!player || !opponent) return null;
    const opponentName = battle.opponent.kind === "wild" ? "Wild Pokémon" : `${battle.opponent.trainer?.title} ${battle.opponent.trainer?.name}`;
    const fight = (move: Move) => {
        if (actionLocked.current) return;
        actionLocked.current = true;
        setAttack({ type: move.type, move: move.name });
        timers.current.push(setTimeout(() => onFight(move), 260));
        timers.current.push(setTimeout(() => {
            actionLocked.current = false;
            setAttack(null);
        }, 620));
    };
    const attemptCatch = () => {
        if (actionLocked.current) return;
        actionLocked.current = true;
        setCatching(true);
        timers.current.push(setTimeout(onCatch, 1100));
        timers.current.push(setTimeout(() => {
            actionLocked.current = false;
            setCatching(false);
        }, 1450));
    };
    const interactionLocked = Boolean(attack || catching || trainerIntro);

    return (
        <div className={`battle-shell battle-shell-${battle.opponent.kind}`}>
            <div className="battle-header"><span><FiActivity /> Battle!</span><strong>{opponentName}</strong><span>{battle.opponent.kind === "wild" ? "WILD ENCOUNTER" : "TRAINER BATTLE"}</span></div>
            <div className="battle-scene">
                <span className="battle-axis battle-axis-horizontal" />
                <span className="battle-axis battle-axis-vertical" />
                <BattlePokemon pokemon={opponent} opposing catching={catching} hitType={attack?.type} />
                <BattlePokemon pokemon={player} attacking={Boolean(attack)} />
                {attack && <div className="battle-move-callout" aria-live="polite">{player.nickname} used<br /><strong>{attack.move}!</strong></div>}
                {catching && <div className="catch-sequence" aria-live="polite"><i className="catch-ball" /><span className="catch-flash" /><strong>Capture!</strong></div>}
                {trainerIntro && <div className="trainer-challenge" aria-live="polite"><div className="trainer-challenge-card"><span>Trainer challenge</span><img src="/sprites/trainer.svg" alt="" /><strong>{battle.opponent.trainer?.title}<br />{battle.opponent.trainer?.name}</strong><small>{battle.opponent.pokemon.length} Pokémon ready</small></div><b>VS</b></div>}
            </div>
            <div className="battle-console">
                <div className="battle-message"><span>BATTLE TEXT</span><p>{battle.message}</p></div>
                {switching ? <div className="battle-switcher"><p>Choose a Pokémon.</p><div className="battle-switcher-grid">{game.party.map((pokemon, index) => <PokemonCard key={pokemon.uid} pokemon={pokemon} active={index === battle.activePlayerIndex} onClick={() => { onSwitch(index); setSwitching(false); }} />)}</div><button type="button" onClick={() => setSwitching(false)} className="battle-back"><FiArrowLeft /> Back</button></div> : <BattleActions moves={player.moves} canCatch={battle.opponent.kind === "wild"} canRun={battle.canRun} pokeballs={game.pokeballs} disabled={interactionLocked} onFight={fight} onCatch={attemptCatch} onRun={onRun} onSwitch={() => setSwitching(true)} />}
            </div>
        </div>
    );
};

export default BattleScreen;
