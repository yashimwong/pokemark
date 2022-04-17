import { moves } from "game/data/moves";
import { Pokemon, PokemonSpecies } from "game/types";

export const species: Record<string, PokemonSpecies> = {
    sproutle: { id: "sproutle", name: "Sproutle", number: "001", types: ["grass"], color: "#75b947", sprite: "🌱", baseHp: 22, attack: 12, defense: 13, speed: 10, moves: ["tackle", "vineWhip"], evolvesTo: "thornadon", evolutionLevel: 12 },
    cindercub: { id: "cindercub", name: "Cindercub", number: "004", types: ["fire"], color: "#ef7448", sprite: "🔥", baseHp: 20, attack: 14, defense: 10, speed: 12, moves: ["scratch", "ember"], evolvesTo: "pyroar", evolutionLevel: 12 },
    bubblit: { id: "bubblit", name: "Bubblit", number: "007", types: ["water"], color: "#55a9e8", sprite: "💧", baseHp: 23, attack: 11, defense: 14, speed: 9, moves: ["tackle", "waterGun"], evolvesTo: "ripplex", evolutionLevel: 12 },
    sparko: { id: "sparko", name: "Sparko", number: "025", types: ["electric"], color: "#edc744", sprite: "⚡", baseHp: 19, attack: 13, defense: 10, speed: 15, moves: ["quickAttack", "thunderShock"] },
    pebblit: { id: "pebblit", name: "Pebblit", number: "074", types: ["rock", "ground"], color: "#a99070", sprite: "🪨", baseHp: 26, attack: 15, defense: 17, speed: 6, moves: ["tackle", "rockThrow"] },
    flitter: { id: "flitter", name: "Flitter", number: "016", types: ["normal", "flying"], color: "#c6a17c", sprite: "🕊️", baseHp: 18, attack: 10, defense: 9, speed: 14, moves: ["tackle", "gust"] },
    mossbug: { id: "mossbug", name: "Mossbug", number: "010", types: ["bug"], color: "#94ad50", sprite: "🐛", baseHp: 20, attack: 9, defense: 11, speed: 10, moves: ["tackle", "poisonSting"] },
    mindove: { id: "mindove", name: "Mindove", number: "063", types: ["psychic"], color: "#c782b3", sprite: "🔮", baseHp: 19, attack: 11, defense: 10, speed: 13, moves: ["tackle", "confusion"] },
    thornadon: { id: "thornadon", name: "Thornadon", number: "002", types: ["grass", "poison"], color: "#4e983b", sprite: "🌿", baseHp: 32, attack: 19, defense: 20, speed: 15, moves: ["tackle", "vineWhip", "bite"] },
    pyroar: { id: "pyroar", name: "Pyroar", number: "005", types: ["fire"], color: "#dc4e34", sprite: "🦁", baseHp: 30, attack: 22, defense: 15, speed: 19, moves: ["scratch", "ember", "bite"] },
    ripplex: { id: "ripplex", name: "Ripplex", number: "008", types: ["water"], color: "#347ec4", sprite: "🐬", baseHp: 34, attack: 17, defense: 22, speed: 14, moves: ["tackle", "waterGun", "bite"] }
};

export const createPokemon = (speciesId: string, level: number, nickname?: string): Pokemon => {
    const currentSpecies = species[speciesId];
    const maxHp = currentSpecies.baseHp + level * 3;

    return {
        uid: `${speciesId}-${Math.random().toString(36).slice(2, 9)}`,
        speciesId,
        nickname: nickname || currentSpecies.name,
        level,
        experience: 0,
        hp: maxHp,
        maxHp,
        moves: currentSpecies.moves.map((moveId) => moves[moveId])
    };
};
