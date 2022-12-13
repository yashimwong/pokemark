import { hydrateMoves, moveIds } from "game/data/moves";
import { hydrateSpecies, pokemonDefinitions } from "game/data/species";
import { Move, MoveCategory, PokemonSpecies, PokemonType } from "game/types";

const apiBaseUrl = "https://pokeapi.co/api/v2";
const supportedTypes: PokemonType[] = ["normal", "fire", "water", "grass", "electric", "bug", "poison", "ground", "flying", "psychic", "rock", "dark"];
const supportedCategories: MoveCategory[] = ["physical", "special", "status"];

type NamedResource = { name: string };

type PokeApiPokemon = {
    id: number;
    name: string;
    sprites: { other: { "official-artwork": { front_default: string | null } } };
    stats: { base_stat: number; stat: NamedResource }[];
    types: { type: NamedResource }[];
};

type PokeApiMove = {
    name: string;
    type: NamedResource;
    power: number | null;
    accuracy: number | null;
    pp: number | null;
    effect_chance: number | null;
    damage_class: NamedResource;
    effect_entries: { short_effect: string; language: NamedResource }[];
};

const titleCase = (value: string) => value.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
const pokemonType = (value: string): PokemonType => supportedTypes.includes(value as PokemonType) ? value as PokemonType : "normal";
const moveCategory = (value: string): MoveCategory => supportedCategories.includes(value as MoveCategory) ? value as MoveCategory : "physical";

const request = async <T,>(path: string): Promise<T> => {
    const response = await fetch(`${apiBaseUrl}/${path}`);
    if (!response.ok) throw new Error(`PokeAPI request failed with ${response.status} for ${path}`);
    return response.json() as Promise<T>;
};

const mapPokemon = (pokemon: PokeApiPokemon, definition: typeof pokemonDefinitions[number]): PokemonSpecies => {
    const stats = Object.fromEntries(pokemon.stats.map((entry) => [entry.stat.name, entry.base_stat]));

    return {
        id: definition.id,
        name: titleCase(pokemon.name),
        number: String(pokemon.id).padStart(3, "0"),
        types: pokemon.types.map((entry) => pokemonType(entry.type.name)),
        color: definition.color,
        artwork: pokemon.sprites.other["official-artwork"].front_default || "",
        baseHp: stats.hp,
        attack: stats.attack,
        defense: stats.defense,
        specialAttack: stats["special-attack"],
        specialDefense: stats["special-defense"],
        speed: stats.speed,
        moves: definition.moves,
        evolvesTo: definition.evolvesTo,
        evolutionLevel: definition.evolutionLevel
    };
};

const mapMove = (move: PokeApiMove): Move => {
    const description = move.effect_entries.find((entry) => entry.language.name === "en")?.short_effect || "No field notes available.";

    return {
        id: move.name,
        name: titleCase(move.name),
        type: pokemonType(move.type.name),
        power: move.power || 0,
        accuracy: move.accuracy || 100,
        pp: move.pp || 0,
        category: moveCategory(move.damage_class.name),
        description: description.replace("$effect_chance", String(move.effect_chance || 0))
    };
};

let catalogRequest: Promise<void> | undefined;

export const loadPokeApiCatalog = () => {
    if (!catalogRequest) {
        catalogRequest = Promise.all([
            Promise.all(pokemonDefinitions.map((definition) => request<PokeApiPokemon>(`pokemon/${definition.pokeApiId}`).then((pokemon) => [definition.id, mapPokemon(pokemon, definition)] as const))),
            Promise.all(moveIds.map((moveId) => request<PokeApiMove>(`move/${moveId}`).then((move) => [moveId, mapMove(move)] as const)))
        ]).then(([apiSpecies, apiMoves]) => {
            hydrateMoves(Object.fromEntries(apiMoves));
            hydrateSpecies(Object.fromEntries(apiSpecies));
        });
    }

    return catalogRequest;
};
