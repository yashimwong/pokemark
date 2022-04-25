import { species } from "game/data/species";
import { Move, Pokemon, PokemonType } from "game/types";

const advantages: Record<PokemonType, PokemonType[]> = {
    normal: [], fire: ["grass", "bug"], water: ["fire", "rock", "ground"], grass: ["water", "rock", "ground"], electric: ["water", "flying"], bug: ["grass", "psychic"], poison: ["grass"], ground: ["fire", "electric", "rock"], flying: ["grass", "bug"], psychic: ["poison"], rock: ["fire", "bug", "flying"]
};

export const typeMultiplier = (moveType: PokemonType, defender: Pokemon) => {
    const defenderTypes = species[defender.speciesId].types;
    return defenderTypes.reduce((total, type) => total * (advantages[moveType].includes(type) ? 2 : advantages[type].includes(moveType) ? 0.5 : 1), 1);
};

export const calculateDamage = (attacker: Pokemon, defender: Pokemon, move: Move) => {
    const attackerSpecies = species[attacker.speciesId];
    const defenderSpecies = species[defender.speciesId];
    const attackingStat = move.category === "special" ? attackerSpecies.attack : attackerSpecies.attack;
    const defendingStat = move.category === "special" ? defenderSpecies.defense : defenderSpecies.defense;
    const sameTypeBonus = attackerSpecies.types.includes(move.type) ? 1.5 : 1;
    const damage = Math.floor((((2 * attacker.level / 5 + 2) * move.power * attackingStat / defendingStat) / 50 + 2) * sameTypeBonus * typeMultiplier(move.type, defender));
    return Math.max(1, damage);
};

export const isFainted = (pokemon: Pokemon) => pokemon.hp <= 0;

export const healthyPokemonIndex = (party: Pokemon[]) => party.findIndex((pokemon) => !isFainted(pokemon));

export const hpPercent = (pokemon: Pokemon) => Math.max(0, Math.round(pokemon.hp / pokemon.maxHp * 100));
