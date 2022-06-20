import { useState } from "react";
import BattleActions from "components/game/battle-actions";
import BattlePokemon from "components/game/battle-pokemon";
import PokemonCard from "components/game/pokemon-card";
import { GameState, Move } from "game/types";

const BattleScreen = ({ game, onFight, onSwitch, onCatch, onRun }: { game: GameState; onFight: (move: Move) => void; onSwitch: (index: number) => void; onCatch: () => void; onRun: () => void }) => {
    const [switching, setSwitching] = useState(false);
    const battle = game.battle;
    if (!battle) return null;
    const player = game.party[battle.activePlayerIndex];
    const opponent = battle.opponent.pokemon[battle.activeOpponentIndex];
    const opponentName = battle.opponent.kind === "wild" ? "Wild Pokémon" : `${battle.opponent.trainer?.title} ${battle.opponent.trainer?.name}`;

    return (
        <div className="battle-scene game-panel overflow-hidden">
            <div className="battle-header"><span>{opponentName}</span><span>{battle.opponent.kind === "wild" ? "A wild encounter" : "Trainer battle"}</span></div>
            <div className="p-5 sm:p-8 min-h-[380px] flex flex-col justify-between gap-8">
                <BattlePokemon pokemon={opponent} opposing />
                <BattlePokemon pokemon={player} />
            </div>
            <div className="battle-dialogue p-5 sm:p-6"><p className="font-bold text-slate-800 mb-4 min-h-[24px]">{battle.message}</p>{switching ? <div><p className="text-sm text-slate-500 mb-3">Choose a Pokémon to send out.</p><div className="grid sm:grid-cols-2 gap-3">{game.party.map((pokemon, index) => <PokemonCard key={pokemon.uid} pokemon={pokemon} active={index === battle.activePlayerIndex} onClick={() => { onSwitch(index); setSwitching(false); }} />)}</div><button type="button" onClick={() => setSwitching(false)} className="text-sm font-bold text-indigo-600 mt-4">Back to battle</button></div> : <BattleActions moves={player.moves} canCatch={battle.opponent.kind === "wild"} canRun={battle.canRun} onFight={onFight} onCatch={onCatch} onRun={onRun} onSwitch={() => setSwitching(true)} />}</div>
        </div>
    );
};

export default BattleScreen;
