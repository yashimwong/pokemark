import { getMove } from "game/data/moves";
import { Pokemon, PokemonSpecies } from "game/types";

export type PokemonDefinition = {
    id: string;
    pokeApiId: number;
    color: string;
    moves: string[];
    evolvesTo?: string;
    evolutionLevel?: number;
};

export const pokemonDefinitions: PokemonDefinition[] = [
    { id: "bulbasaur", pokeApiId: 1, color: "#75b947", moves: ["tackle", "vine-whip"], evolvesTo: "ivysaur", evolutionLevel: 12 },
    { id: "ivysaur", pokeApiId: 2, color: "#4e983b", moves: ["tackle", "vine-whip"] },
    { id: "charmander", pokeApiId: 4, color: "#ef7448", moves: ["scratch", "ember"], evolvesTo: "charmeleon", evolutionLevel: 12 },
    { id: "charmeleon", pokeApiId: 5, color: "#dc4e34", moves: ["scratch", "ember", "bite"] },
    { id: "squirtle", pokeApiId: 7, color: "#55a9e8", moves: ["tackle", "water-gun"], evolvesTo: "wartortle", evolutionLevel: 12 },
    { id: "wartortle", pokeApiId: 8, color: "#347ec4", moves: ["tackle", "water-gun", "bite"] },
    { id: "caterpie", pokeApiId: 10, color: "#94ad50", moves: ["tackle", "bug-bite"] },
    { id: "pidgey", pokeApiId: 16, color: "#c6a17c", moves: ["tackle", "gust", "quick-attack"] },
    { id: "pikachu", pokeApiId: 25, color: "#edc744", moves: ["quick-attack", "thunder-shock"] },
    { id: "abra", pokeApiId: 63, color: "#c782b3", moves: ["confusion"] },
    { id: "geodude", pokeApiId: 74, color: "#a99070", moves: ["tackle", "rock-throw"] }
];

// This fallback snapshot mirrors PokeAPI's core data so the game remains playable offline.
export const species: Record<string, PokemonSpecies> = {
    bulbasaur: { id: "bulbasaur", name: "Bulbasaur", number: "001", types: ["grass", "poison"], color: "#75b947", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png", baseHp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45, moves: ["tackle", "vine-whip"], evolvesTo: "ivysaur", evolutionLevel: 12 },
    ivysaur: { id: "ivysaur", name: "Ivysaur", number: "002", types: ["grass", "poison"], color: "#4e983b", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png", baseHp: 60, attack: 62, defense: 63, specialAttack: 80, specialDefense: 80, speed: 60, moves: ["tackle", "vine-whip"] },
    charmander: { id: "charmander", name: "Charmander", number: "004", types: ["fire"], color: "#ef7448", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png", baseHp: 39, attack: 52, defense: 43, specialAttack: 60, specialDefense: 50, speed: 65, moves: ["scratch", "ember"], evolvesTo: "charmeleon", evolutionLevel: 12 },
    charmeleon: { id: "charmeleon", name: "Charmeleon", number: "005", types: ["fire"], color: "#dc4e34", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png", baseHp: 58, attack: 64, defense: 58, specialAttack: 80, specialDefense: 65, speed: 80, moves: ["scratch", "ember", "bite"] },
    squirtle: { id: "squirtle", name: "Squirtle", number: "007", types: ["water"], color: "#55a9e8", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png", baseHp: 44, attack: 48, defense: 65, specialAttack: 50, specialDefense: 64, speed: 43, moves: ["tackle", "water-gun"], evolvesTo: "wartortle", evolutionLevel: 12 },
    wartortle: { id: "wartortle", name: "Wartortle", number: "008", types: ["water"], color: "#347ec4", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png", baseHp: 59, attack: 63, defense: 80, specialAttack: 65, specialDefense: 80, speed: 58, moves: ["tackle", "water-gun", "bite"] },
    caterpie: { id: "caterpie", name: "Caterpie", number: "010", types: ["bug"], color: "#94ad50", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png", baseHp: 45, attack: 30, defense: 35, specialAttack: 20, specialDefense: 20, speed: 45, moves: ["tackle", "bug-bite"] },
    pidgey: { id: "pidgey", name: "Pidgey", number: "016", types: ["normal", "flying"], color: "#c6a17c", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png", baseHp: 40, attack: 45, defense: 40, specialAttack: 35, specialDefense: 35, speed: 56, moves: ["tackle", "gust", "quick-attack"] },
    pikachu: { id: "pikachu", name: "Pikachu", number: "025", types: ["electric"], color: "#edc744", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png", baseHp: 35, attack: 55, defense: 40, specialAttack: 50, specialDefense: 50, speed: 90, moves: ["quick-attack", "thunder-shock"] },
    abra: { id: "abra", name: "Abra", number: "063", types: ["psychic"], color: "#c782b3", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/63.png", baseHp: 25, attack: 20, defense: 15, specialAttack: 105, specialDefense: 55, speed: 90, moves: ["confusion"] },
    geodude: { id: "geodude", name: "Geodude", number: "074", types: ["rock", "ground"], color: "#a99070", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png", baseHp: 40, attack: 80, defense: 100, specialAttack: 30, specialDefense: 30, speed: 20, moves: ["tackle", "rock-throw"] }
};

const legacySpeciesIds: Record<string, string> = {
    sproutle: "bulbasaur",
    thornadon: "ivysaur",
    cindercub: "charmander",
    pyroar: "charmeleon",
    bubblit: "squirtle",
    ripplex: "wartortle",
    mossbug: "caterpie",
    flitter: "pidgey",
    sparko: "pikachu",
    mindove: "abra",
    pebblit: "geodude"
};

export const getSpecies = (speciesId: string) => species[legacySpeciesIds[speciesId] || speciesId] || species.bulbasaur;

export const hydrateSpecies = (apiSpecies: Record<string, PokemonSpecies>) => {
    Object.entries(apiSpecies).forEach(([speciesId, pokemon]) => {
        if (species[speciesId]) Object.assign(species[speciesId], pokemon);
    });
};

export const createPokemon = (speciesId: string, level: number, nickname?: string): Pokemon => {
    const currentSpecies = getSpecies(speciesId);
    const maxHp = currentSpecies.baseHp + level * 3;

    return {
        uid: `${currentSpecies.id}-${Math.random().toString(36).slice(2, 9)}`,
        speciesId: currentSpecies.id,
        nickname: nickname || currentSpecies.name,
        level,
        experience: 0,
        hp: maxHp,
        maxHp,
        moves: currentSpecies.moves.map(getMove)
    };
};
