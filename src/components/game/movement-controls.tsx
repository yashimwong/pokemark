const MovementControls = ({ onMove }: { onMove: (dx: number, dy: number) => void }) => (
    <div className="grid grid-cols-3 gap-1 w-36 mx-auto mt-5 select-none">
        <span />
        <button type="button" onClick={() => onMove(0, -1)} className="map-control">↑</button>
        <span />
        <button type="button" onClick={() => onMove(-1, 0)} className="map-control">←</button>
        <button type="button" onClick={() => onMove(0, 1)} className="map-control">↓</button>
        <button type="button" onClick={() => onMove(1, 0)} className="map-control">→</button>
    </div>
);

export default MovementControls;
