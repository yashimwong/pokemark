import { FiArrowDown, FiArrowLeft, FiArrowRight, FiArrowUp } from "react-icons/fi";

const MovementControls = ({ onMove }: { onMove: (dx: number, dy: number) => void }) => (
    <div className="movement-controls">
        <span />
        <button type="button" onClick={() => onMove(0, -1)} className="map-control" aria-label="Move north"><FiArrowUp /></button>
        <span />
        <button type="button" onClick={() => onMove(-1, 0)} className="map-control" aria-label="Move west"><FiArrowLeft /></button>
        <button type="button" onClick={() => onMove(0, 1)} className="map-control" aria-label="Move south"><FiArrowDown /></button>
        <button type="button" onClick={() => onMove(1, 0)} className="map-control" aria-label="Move east"><FiArrowRight /></button>
    </div>
);

export default MovementControls;
