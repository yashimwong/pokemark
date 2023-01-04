import TypeBadge from "components/game/type-badge";
import { Move } from "game/types";
import { FiArrowUpRight, FiCornerUpLeft, FiDisc, FiRepeat } from "react-icons/fi";

const BattleActions = ({ moves, canCatch, canRun, disabled, onFight, onCatch, onRun, onSwitch }: { moves: Move[]; canCatch: boolean; canRun: boolean; disabled?: boolean; onFight: (move: Move) => void; onCatch: () => void; onRun: () => void; onSwitch: () => void }) => (
    <div className="battle-actions">
        <div className="move-grid">
            {moves.map((move, index) => <button type="button" key={move.id} onClick={() => onFight(move)} className="move-button" disabled={disabled}><span className="move-index">0{index + 1}</span><span className="move-data"><strong>{move.name}</strong><small>{move.category} / {move.power} PWR</small></span><TypeBadge type={move.type} /><FiArrowUpRight className="move-arrow" /></button>)}
        </div>
        <div className="battle-options">
            <button type="button" onClick={onSwitch} className="battle-option" disabled={disabled}><FiRepeat /><span>Pokémon</span></button>
            {canCatch && <button type="button" onClick={onCatch} className="battle-option" disabled={disabled}><FiDisc /><span>Poké Ball</span></button>}
            {canRun && <button type="button" onClick={onRun} className="battle-option" disabled={disabled}><FiCornerUpLeft /><span>Run</span></button>}
        </div>
    </div>
);

export default BattleActions;
