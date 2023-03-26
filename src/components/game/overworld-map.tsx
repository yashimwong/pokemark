import { useEffect } from "react";
import classNames from "classnames";
import { getWorldMap } from "game/data/world";
import { GameState } from "game/types";

const OverworldMap = ({ game, onMove }: { game: GameState; onMove: (dx: number, dy: number) => void }) => {
    const map = getWorldMap(game.currentMapId);
    useEffect(() => {
        const moveForKey: Record<string, [number, number]> = { ArrowUp: [0, -1], w: [0, -1], W: [0, -1], ArrowDown: [0, 1], s: [0, 1], S: [0, 1], ArrowLeft: [-1, 0], a: [-1, 0], A: [-1, 0], ArrowRight: [1, 0], d: [1, 0], D: [1, 0] };
        const handleKeyDown = (event: KeyboardEvent) => {
            const direction = moveForKey[event.key];
            if (direction) {
                event.preventDefault();
                onMove(direction[0], direction[1]);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onMove]);

    return (
        <div className="map-frame">
            <div className="world-map" style={{ gridTemplateColumns: `repeat(${map.tiles[0].length}, minmax(0, 1fr))` }}>
                {map.tiles.flatMap((row, y) => row.map((tile, x) => {
                    const trainer = map.trainers.find((item) => item.x === x && item.y === y && !game.defeatedTrainers.includes(item.id));
                    const player = game.playerPosition.x === x && game.playerPosition.y === y;
                    return (
                        <div key={`${x}-${y}`} className={classNames("map-tile", `tile-${tile}`)}>
                            <img className="map-tile-art" src={`/tiles/${tile}.svg`} alt="" aria-hidden="true" draggable={false} />
                            {trainer && <img className="map-character map-trainer" src="/sprites/trainer.svg" alt={`${trainer.title} ${trainer.name}`} draggable={false} />}
                            {player && <img className="map-character map-player" src="/sprites/player.svg" alt={game.trainerName} draggable={false} />}
                        </div>
                    );
                }))}
            </div>
        </div>
    );
};

export default OverworldMap;
