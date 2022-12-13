import { Move } from "game/types";

export const moves: Record<string, Move> = {
    tackle: { id: "tackle", name: "Tackle", type: "normal", power: 40, accuracy: 100, pp: 35, category: "physical", description: "A physical tackle." },
    scratch: { id: "scratch", name: "Scratch", type: "normal", power: 40, accuracy: 100, pp: 35, category: "physical", description: "Scratches with sharp claws." },
    ember: { id: "ember", name: "Ember", type: "fire", power: 40, accuracy: 100, pp: 25, category: "special", description: "A small flame attack." },
    "vine-whip": { id: "vine-whip", name: "Vine Whip", type: "grass", power: 45, accuracy: 100, pp: 25, category: "physical", description: "Strikes with slender vines." },
    "water-gun": { id: "water-gun", name: "Water Gun", type: "water", power: 40, accuracy: 100, pp: 25, category: "special", description: "Shoots water at the target." },
    "thunder-shock": { id: "thunder-shock", name: "Thunder Shock", type: "electric", power: 40, accuracy: 100, pp: 30, category: "special", description: "A jolt of electricity." },
    "quick-attack": { id: "quick-attack", name: "Quick Attack", type: "normal", power: 40, accuracy: 100, pp: 30, category: "physical", description: "An almost invisible strike." },
    bite: { id: "bite", name: "Bite", type: "dark", power: 60, accuracy: 100, pp: 25, category: "physical", description: "Bites with sharp fangs." },
    "rock-throw": { id: "rock-throw", name: "Rock Throw", type: "rock", power: 50, accuracy: 90, pp: 15, category: "physical", description: "Hurls a small rock." },
    confusion: { id: "confusion", name: "Confusion", type: "psychic", power: 50, accuracy: 100, pp: 25, category: "special", description: "A weak telekinetic force." },
    gust: { id: "gust", name: "Gust", type: "flying", power: 40, accuracy: 100, pp: 35, category: "special", description: "Whips up a damaging gust." },
    "bug-bite": { id: "bug-bite", name: "Bug Bite", type: "bug", power: 60, accuracy: 100, pp: 20, category: "physical", description: "Bites the target and may consume its held berry." }
};

export const moveIds = Object.keys(moves);

export const getMove = (moveId: string) => moves[moveId] || moves.tackle;

export const hydrateMoves = (apiMoves: Record<string, Move>) => {
    Object.entries(apiMoves).forEach(([moveId, move]) => {
        if (moves[moveId]) Object.assign(moves[moveId], move);
    });
};
