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
    { id: "ivysaur", pokeApiId: 2, color: "#4e983b", moves: ["tackle", "vine-whip"], evolvesTo: "venusaur", evolutionLevel: 24 },
    { id: "venusaur", pokeApiId: 3, color: "#418a48", moves: ["tackle", "vine-whip", "bite"] },
    { id: "charmander", pokeApiId: 4, color: "#ef7448", moves: ["scratch", "ember"], evolvesTo: "charmeleon", evolutionLevel: 12 },
    { id: "charmeleon", pokeApiId: 5, color: "#dc4e34", moves: ["scratch", "ember", "bite"], evolvesTo: "charizard", evolutionLevel: 24 },
    { id: "charizard", pokeApiId: 6, color: "#df603b", moves: ["scratch", "ember", "bite", "gust"] },
    { id: "squirtle", pokeApiId: 7, color: "#55a9e8", moves: ["tackle", "water-gun"], evolvesTo: "wartortle", evolutionLevel: 12 },
    { id: "wartortle", pokeApiId: 8, color: "#347ec4", moves: ["tackle", "water-gun", "bite"], evolvesTo: "blastoise", evolutionLevel: 24 },
    { id: "blastoise", pokeApiId: 9, color: "#3378ad", moves: ["tackle", "water-gun", "bite"] },
    { id: "caterpie", pokeApiId: 10, color: "#94ad50", moves: ["tackle", "bug-bite"] },
    { id: "pidgey", pokeApiId: 16, color: "#c6a17c", moves: ["tackle", "gust", "quick-attack"] },
    { id: "pikachu", pokeApiId: 25, color: "#edc744", moves: ["quick-attack", "thunder-shock"] },
    { id: "abra", pokeApiId: 63, color: "#c782b3", moves: ["confusion"] },
    { id: "rattata", pokeApiId: 19, color: "#96729f", moves: ["tackle", "quick-attack", "bite"] },
    { id: "spearow", pokeApiId: 21, color: "#a97447", moves: ["tackle", "gust", "quick-attack"] },
    { id: "sandshrew", pokeApiId: 27, color: "#c9a55d", moves: ["scratch", "rock-throw"] },
    { id: "vulpix", pokeApiId: 37, color: "#d67543", moves: ["scratch", "ember", "quick-attack"] },
    { id: "jigglypuff", pokeApiId: 39, color: "#dc98ad", moves: ["tackle", "bite"] },
    { id: "zubat", pokeApiId: 41, color: "#5879af", moves: ["bite", "gust"] },
    { id: "oddish", pokeApiId: 43, color: "#4b7696", moves: ["tackle", "vine-whip"] },
    { id: "psyduck", pokeApiId: 54, color: "#e0b942", moves: ["scratch", "water-gun", "confusion"] },
    { id: "growlithe", pokeApiId: 58, color: "#df7443", moves: ["bite", "ember"] },
    { id: "machop", pokeApiId: 66, color: "#718c9c", moves: ["tackle", "rock-throw"] },
    { id: "geodude", pokeApiId: 74, color: "#a99070", moves: ["tackle", "rock-throw"] },
    { id: "ponyta", pokeApiId: 77, color: "#f2e2b8", moves: ["tackle", "ember", "quick-attack"] }
];

// This fallback snapshot mirrors PokeAPI's core data so the game remains playable offline.
export const species: Record<string, PokemonSpecies> = {
    bulbasaur: { id: "bulbasaur", name: "Bulbasaur", number: "001", types: ["grass", "poison"], color: "#75b947", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png", baseHp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45, moves: ["tackle", "vine-whip"], evolvesTo: "ivysaur", evolutionLevel: 12 },
    ivysaur: { id: "ivysaur", name: "Ivysaur", number: "002", types: ["grass", "poison"], color: "#4e983b", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png", baseHp: 60, attack: 62, defense: 63, specialAttack: 80, specialDefense: 80, speed: 60, moves: ["tackle", "vine-whip"], evolvesTo: "venusaur", evolutionLevel: 24 },
    venusaur: { id: "venusaur", name: "Venusaur", number: "003", types: ["grass", "poison"], color: "#418a48", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png", baseHp: 80, attack: 82, defense: 83, specialAttack: 100, specialDefense: 100, speed: 80, moves: ["tackle", "vine-whip", "bite"] },
    charmander: { id: "charmander", name: "Charmander", number: "004", types: ["fire"], color: "#ef7448", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png", baseHp: 39, attack: 52, defense: 43, specialAttack: 60, specialDefense: 50, speed: 65, moves: ["scratch", "ember"], evolvesTo: "charmeleon", evolutionLevel: 12 },
    charmeleon: { id: "charmeleon", name: "Charmeleon", number: "005", types: ["fire"], color: "#dc4e34", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png", baseHp: 58, attack: 64, defense: 58, specialAttack: 80, specialDefense: 65, speed: 80, moves: ["scratch", "ember", "bite"], evolvesTo: "charizard", evolutionLevel: 24 },
    charizard: { id: "charizard", name: "Charizard", number: "006", types: ["fire", "flying"], color: "#df603b", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png", baseHp: 78, attack: 84, defense: 78, specialAttack: 109, specialDefense: 85, speed: 100, moves: ["scratch", "ember", "bite", "gust"] },
    squirtle: { id: "squirtle", name: "Squirtle", number: "007", types: ["water"], color: "#55a9e8", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png", baseHp: 44, attack: 48, defense: 65, specialAttack: 50, specialDefense: 64, speed: 43, moves: ["tackle", "water-gun"], evolvesTo: "wartortle", evolutionLevel: 12 },
    wartortle: { id: "wartortle", name: "Wartortle", number: "008", types: ["water"], color: "#347ec4", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png", baseHp: 59, attack: 63, defense: 80, specialAttack: 65, specialDefense: 80, speed: 58, moves: ["tackle", "water-gun", "bite"], evolvesTo: "blastoise", evolutionLevel: 24 },
    blastoise: { id: "blastoise", name: "Blastoise", number: "009", types: ["water"], color: "#3378ad", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png", baseHp: 79, attack: 83, defense: 100, specialAttack: 85, specialDefense: 105, speed: 78, moves: ["tackle", "water-gun", "bite"] },
    caterpie: { id: "caterpie", name: "Caterpie", number: "010", types: ["bug"], color: "#94ad50", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png", baseHp: 45, attack: 30, defense: 35, specialAttack: 20, specialDefense: 20, speed: 45, moves: ["tackle", "bug-bite"] },
    pidgey: { id: "pidgey", name: "Pidgey", number: "016", types: ["normal", "flying"], color: "#c6a17c", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png", baseHp: 40, attack: 45, defense: 40, specialAttack: 35, specialDefense: 35, speed: 56, moves: ["tackle", "gust", "quick-attack"] },
    rattata: { id: "rattata", name: "Rattata", number: "019", types: ["normal"], color: "#96729f", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png", baseHp: 30, attack: 56, defense: 35, specialAttack: 25, specialDefense: 35, speed: 72, moves: ["tackle", "quick-attack", "bite"] },
    spearow: { id: "spearow", name: "Spearow", number: "021", types: ["normal", "flying"], color: "#a97447", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png", baseHp: 40, attack: 60, defense: 30, specialAttack: 31, specialDefense: 31, speed: 70, moves: ["tackle", "gust", "quick-attack"] },
    pikachu: { id: "pikachu", name: "Pikachu", number: "025", types: ["electric"], color: "#edc744", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png", baseHp: 35, attack: 55, defense: 40, specialAttack: 50, specialDefense: 50, speed: 90, moves: ["quick-attack", "thunder-shock"] },
    sandshrew: { id: "sandshrew", name: "Sandshrew", number: "027", types: ["ground"], color: "#c9a55d", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/27.png", baseHp: 50, attack: 75, defense: 85, specialAttack: 20, specialDefense: 30, speed: 40, moves: ["scratch", "rock-throw"] },
    vulpix: { id: "vulpix", name: "Vulpix", number: "037", types: ["fire"], color: "#d67543", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png", baseHp: 38, attack: 41, defense: 40, specialAttack: 50, specialDefense: 65, speed: 65, moves: ["scratch", "ember", "quick-attack"] },
    jigglypuff: { id: "jigglypuff", name: "Jigglypuff", number: "039", types: ["normal", "fairy"], color: "#dc98ad", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png", baseHp: 115, attack: 45, defense: 20, specialAttack: 45, specialDefense: 25, speed: 20, moves: ["tackle", "bite"] },
    zubat: { id: "zubat", name: "Zubat", number: "041", types: ["poison", "flying"], color: "#5879af", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/41.png", baseHp: 40, attack: 45, defense: 35, specialAttack: 30, specialDefense: 40, speed: 55, moves: ["bite", "gust"] },
    oddish: { id: "oddish", name: "Oddish", number: "043", types: ["grass", "poison"], color: "#4b7696", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/43.png", baseHp: 45, attack: 50, defense: 55, specialAttack: 75, specialDefense: 65, speed: 30, moves: ["tackle", "vine-whip"] },
    psyduck: { id: "psyduck", name: "Psyduck", number: "054", types: ["water"], color: "#e0b942", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png", baseHp: 50, attack: 52, defense: 48, specialAttack: 65, specialDefense: 50, speed: 55, moves: ["scratch", "water-gun", "confusion"] },
    growlithe: { id: "growlithe", name: "Growlithe", number: "058", types: ["fire"], color: "#df7443", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/58.png", baseHp: 55, attack: 70, defense: 45, specialAttack: 70, specialDefense: 50, speed: 60, moves: ["bite", "ember"] },
    abra: { id: "abra", name: "Abra", number: "063", types: ["psychic"], color: "#c782b3", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/63.png", baseHp: 25, attack: 20, defense: 15, specialAttack: 105, specialDefense: 55, speed: 90, moves: ["confusion"] },
    machop: { id: "machop", name: "Machop", number: "066", types: ["fighting"], color: "#718c9c", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/66.png", baseHp: 70, attack: 80, defense: 50, specialAttack: 35, specialDefense: 35, speed: 35, moves: ["tackle", "rock-throw"] },
    geodude: { id: "geodude", name: "Geodude", number: "074", types: ["rock", "ground"], color: "#a99070", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png", baseHp: 40, attack: 80, defense: 100, specialAttack: 30, specialDefense: 30, speed: 20, moves: ["tackle", "rock-throw"] },
    ponyta: { id: "ponyta", name: "Ponyta", number: "077", types: ["fire"], color: "#f2e2b8", artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/77.png", baseHp: 50, attack: 85, defense: 55, specialAttack: 65, specialDefense: 65, speed: 90, moves: ["tackle", "ember", "quick-attack"] }
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
