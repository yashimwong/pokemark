import TypeBadge from "components/game/type-badge";
import { Move } from "game/types";
import { FiArrowUpRight, FiCornerUpLeft, FiDisc, FiRepeat } from "react-icons/fi";

const BattleActions = ({ moves, canCatch, canRun, onFight, onCatch, onRun, onSwitch }: { moves: Move[]; canCatch: boolean; canRun: boolean; onFight: (move: Move) => void; onCatch: () => void; onRun: () => void; onSwitch: () => void }) => (
    <div className="battle-actions">
        <div className="move-grid">
            {moves.map((move, index) => <button type="button" key={move.id} onClick={() => onFight(move)} className="move-button"><span className="move-index">0{index + 1}</span><span className="move-data"><strong>{move.name}</strong><small>{move.category} / {move.power} PWR</small></span><TypeBadge type={move.type} /><FiArrowUpRight className="move-arrow" /></button>)}
        </div>
        <div className="battle-options">
            <button type="button" onClick={onSwitch} className="battle-option"><FiRepeat /><span>Rotate unit</span></button>
            {canCatch && <button type="button" onClick={onCatch} className="battle-option"><FiDisc /><span>Deploy capture</span></button>}
            {canRun && <button type="button" onClick={onRun} className="battle-option"><FiCornerUpLeft /><span>Withdraw</span></button>}
        </div>
    </div>
);

export default BattleActions;
