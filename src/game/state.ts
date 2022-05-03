import { createPokemon, species } from "game/data/species";
import { moves } from "game/data/moves";
import { townMap, trainers, wildEncounterIds, isWalkable } from "game/data/world";
import { calculateDamage, healthyPokemonIndex, isFainted, typeMultiplier } from "game/battle";
import { grassEncounterChance, maxPartySize, experienceForLevel } from "game/constants";
import { BattleParticipant, BattleState, GameState, Move, Pokemon, Trainer } from "game/types";

export const initialGameState: GameState = {
    screen: "intro",
    trainerName: "",
    playerPosition: { x: 7, y: 9 },
    party: [],
    storage: [],
    money: 300,
    badges: [],
    defeatedTrainers: []
};

export const setTrainerName = (state: GameState, trainerName: string): GameState => ({ ...state, trainerName, screen: "starter" });

export const chooseStarter = (state: GameState, speciesId: string): GameState => ({
    ...state,
    party: [createPokemon(speciesId, 5)],
    screen: "overworld",
    notice: `Professor Oakwood gave you ${species[speciesId].name}!`
});

const makeWildOpponent = (): BattleParticipant => {
    const speciesId = wildEncounterIds[Math.floor(Math.random() * wildEncounterIds.length)];
    return { kind: "wild", pokemon: [createPokemon(speciesId, 3 + Math.floor(Math.random() * 4))] };
};

const beginBattle = (state: GameState, opponent: BattleParticipant): GameState => ({
    ...state,
    screen: "battle",
    notice: undefined,
    battle: { opponent, activePlayerIndex: healthyPokemonIndex(state.party), activeOpponentIndex: 0, message: opponent.kind === "wild" ? `A wild ${species[opponent.pokemon[0].speciesId].name} appeared!` : `${opponent.trainer?.title} ${opponent.trainer?.name} wants to battle!`, turn: "player", canRun: opponent.kind === "wild" }
});

export const movePlayer = (state: GameState, dx: number, dy: number): GameState => {
    if (state.screen !== "overworld" || !state.party.length || state.battle) return state;
    const x = state.playerPosition.x + dx;
    const y = state.playerPosition.y + dy;
    const tile = townMap[y]?.[x];
    if (!tile || !isWalkable(tile)) return { ...state, notice: "You cannot go that way." };
    const trainer = trainers.find((item) => item.x === x && item.y === y && !state.defeatedTrainers.includes(item.id));
    if (trainer) return beginBattle(state, { kind: "trainer", trainer, pokemon: trainer.pokemon.map((pokemon) => ({ ...pokemon })) });
    const movedState = { ...state, playerPosition: { x, y }, notice: tile === "healing" ? "Your party was fully healed!" : tile === "sign" ? "Meadow Town: where every path begins." : undefined };
    const healedState = tile === "healing" ? { ...movedState, party: movedState.party.map((pokemon) => ({ ...pokemon, hp: pokemon.maxHp })) } : movedState;
    return tile === "grass" && Math.random() < grassEncounterChance ? beginBattle(healedState, makeWildOpponent()) : healedState;
};

export const startTrainerBattle = (state: GameState, trainer: Trainer) => beginBattle(state, { kind: "trainer", trainer, pokemon: trainer.pokemon.map((pokemon) => ({ ...pokemon })) });

const replaceBattlePokemon = (battle: BattleState, side: "player" | "opponent", index: number, pokemon: Pokemon) => {
    const key = side === "player" ? "pokemon" : "pokemon";
    const opponent = side === "opponent" ? { ...battle.opponent, [key]: battle.opponent.pokemon.map((item, itemIndex) => itemIndex === index ? pokemon : item) } : battle.opponent;
    return { ...battle, opponent };
};

const levelUp = (pokemon: Pokemon, earnedExperience: number): Pokemon => {
    let nextPokemon = { ...pokemon, experience: pokemon.experience + earnedExperience };
    while (nextPokemon.experience >= experienceForLevel(nextPokemon.level)) {
        nextPokemon = { ...nextPokemon, level: nextPokemon.level + 1, maxHp: nextPokemon.maxHp + 3, hp: Math.min(nextPokemon.maxHp + 3, nextPokemon.hp + 5) };
        const currentSpecies = species[nextPokemon.speciesId];
        if (currentSpecies.evolvesTo && currentSpecies.evolutionLevel === nextPokemon.level) {
            const evolved = species[currentSpecies.evolvesTo];
            nextPokemon = { ...nextPokemon, speciesId: evolved.id, nickname: nextPokemon.nickname === currentSpecies.name ? evolved.name : nextPokemon.nickname, maxHp: nextPokemon.maxHp + 8, hp: nextPokemon.hp + 8, moves: evolved.moves.map((moveId) => moves[moveId]) };
        }
    }
    return nextPokemon;
};

const advanceOpponent = (state: GameState, party: Pokemon[], battle: BattleState, defeatedName: string): GameState => {
    const nextIndex = healthyPokemonIndex(battle.opponent.pokemon);
    if (nextIndex >= 0) return { ...state, party, battle: { ...battle, activeOpponentIndex: nextIndex, message: `${defeatedName} fainted! ${species[battle.opponent.pokemon[nextIndex].speciesId].name} is next.`, turn: "player" } };
    const reward = battle.opponent.kind === "trainer" ? battle.opponent.trainer?.reward || 0 : 0;
    const trainerId = battle.opponent.trainer?.id;
    const badge = trainerId === "luna" ? "Meadow Badge" : undefined;
    return { ...state, party, money: state.money + reward, badges: badge && !state.badges.includes(badge) ? [...state.badges, badge] : state.badges, defeatedTrainers: trainerId ? [...state.defeatedTrainers, trainerId] : state.defeatedTrainers, screen: "overworld", battle: undefined, notice: battle.opponent.kind === "wild" ? `The wild ${defeatedName} fainted!` : `You won ${reward} Poké!` };
};

export const useMove = (state: GameState, move: Move): GameState => {
    const battle = state.battle;
    if (!battle || battle.turn !== "player") return state;
    const player = state.party[battle.activePlayerIndex];
    const opponent = battle.opponent.pokemon[battle.activeOpponentIndex];
    const damage = calculateDamage(player, opponent, move);
    const updatedOpponent = { ...opponent, hp: Math.max(0, opponent.hp - damage) };
    const updatedBattle = replaceBattlePokemon(battle, "opponent", battle.activeOpponentIndex, updatedOpponent);
    const effectiveness = typeMultiplier(move.type, opponent);
    if (isFainted(updatedOpponent)) {
        const earnedExperience = opponent.level * 12;
        const party = state.party.map((item, index) => index === battle.activePlayerIndex ? levelUp(item, earnedExperience) : item);
        return advanceOpponent(state, party, updatedBattle, opponent.nickname);
    }
    const opponentMove = updatedOpponent.moves[Math.floor(Math.random() * updatedOpponent.moves.length)];
    const counterDamage = calculateDamage(updatedOpponent, player, opponentMove);
    const updatedPlayer = { ...player, hp: Math.max(0, player.hp - counterDamage) };
    const party = state.party.map((item, index) => index === battle.activePlayerIndex ? updatedPlayer : item);
    const message = `${player.nickname} used ${move.name}! ${effectiveness > 1 ? "It's super effective! " : effectiveness < 1 ? "It's not very effective. " : ""}${updatedOpponent.nickname} used ${opponentMove.name}!`;
    if (isFainted(updatedPlayer)) {
        const nextIndex = healthyPokemonIndex(party);
        if (nextIndex < 0) return { ...state, party, screen: "overworld", battle: undefined, playerPosition: { x: 7, y: 9 }, money: Math.max(0, state.money - 100), notice: "Your party rushed back to the healing station." };
        return { ...state, party, battle: { ...updatedBattle, activePlayerIndex: nextIndex, message: `${updatedPlayer.nickname} fainted! Go, ${party[nextIndex].nickname}!`, turn: "player" } };
    }
    return { ...state, party, battle: { ...updatedBattle, message, turn: "player" } };
};

export const switchPokemon = (state: GameState, index: number): GameState => {
    if (!state.battle || index === state.battle.activePlayerIndex || isFainted(state.party[index])) return state;
    return { ...state, battle: { ...state.battle, activePlayerIndex: index, message: `Go, ${state.party[index].nickname}!`, turn: "player" } };
};

export const runFromBattle = (state: GameState): GameState => state.battle?.canRun ? { ...state, screen: "overworld", battle: undefined, notice: "Got away safely!" } : state;

export const catchPokemon = (state: GameState): GameState => {
    const battle = state.battle;
    if (!battle || battle.opponent.kind === "trainer") return state;
    const pokemon = battle.opponent.pokemon[battle.activeOpponentIndex];
    const chance = 0.3 + (1 - pokemon.hp / pokemon.maxHp) * 0.6;
    if (Math.random() > chance) return { ...state, battle: { ...battle, message: `Oh no! ${pokemon.nickname} broke free!`, turn: "player" } };
    const party = state.party.length < maxPartySize ? [...state.party, pokemon] : state.party;
    const storage = state.party.length < maxPartySize ? state.storage : [...state.storage, pokemon];
    return { ...state, party, storage, screen: "overworld", battle: undefined, notice: `${pokemon.nickname} was caught!` };
};

export const dismissNotice = (state: GameState): GameState => ({ ...state, notice: undefined });
