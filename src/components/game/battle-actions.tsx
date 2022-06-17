import TypeBadge from "components/game/type-badge";
import { Move } from "game/types";

const BattleActions = ({ moves, canCatch, canRun, onFight, onCatch, onRun, onSwitch }: { moves: Move[]; canCatch: boolean; canRun: boolean; onFight: (move: Move) => void; onCatch: () => void; onRun: () => void; onSwitch: () => void }) => (
    <div className="grid sm:grid-cols-2 gap-3">
        {moves.map((move) => <button type="button" key={move.id} onClick={() => onFight(move)} className="move-button"><span><strong>{move.name}</strong><small>{move.category} · {move.power} power</small></span><TypeBadge type={move.type} /></button>)}
        <button type="button" onClick={onSwitch} className="battle-option">Switch Pokémon</button>
        {canCatch && <button type="button" onClick={onCatch} className="battle-option">Throw Poké Ball</button>}
        {canRun && <button type="button" onClick={onRun} className="battle-option">Run away</button>}
    </div>
);

export default BattleActions;
