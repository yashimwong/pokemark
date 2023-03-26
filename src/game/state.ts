import { createPokemon, getSpecies } from "game/data/species";
import { getMove } from "game/data/moves";
import { getWorldMap, isWalkable, WorldMap } from "game/data/world";
import { calculateDamage, healthyPokemonIndex, isFainted, typeMultiplier } from "game/battle";
import { grassEncounterChance, maxPartySize, experienceForLevel } from "game/constants";
import { BattleParticipant, BattleState, GameState, Move, Pokemon, Trainer } from "game/types";

export const initialGameState: GameState = {
    screen: "intro",
    trainerName: "",
    currentMapId: "meadow-town",
    playerPosition: { x: 7, y: 9 },
    party: [],
    storage: [],
    money: 300,
    pokeballs: 5,
    badges: [],
    defeatedTrainers: []
};

export const setTrainerName = (state: GameState, trainerName: string): GameState => ({ ...state, trainerName, screen: "starter" });

export const chooseStarter = (state: GameState, speciesId: string): GameState => ({
    ...state,
    party: [createPokemon(speciesId, 5)],
    screen: "overworld",
    notice: `Professor Oakwood gave you ${getSpecies(speciesId).name}!`
});

const makeWildOpponent = (map: WorldMap): BattleParticipant => {
    const speciesId = map.wildEncounterIds[Math.floor(Math.random() * map.wildEncounterIds.length)];
    const [minimumLevel, maximumLevel] = map.wildLevels;
    const level = minimumLevel + Math.floor(Math.random() * (maximumLevel - minimumLevel + 1));
    return { kind: "wild", pokemon: [createPokemon(speciesId, level)] };
};

const beginBattle = (state: GameState, opponent: BattleParticipant): GameState => ({
    ...state,
    screen: "battle",
    notice: undefined,
    battle: { opponent, activePlayerIndex: healthyPokemonIndex(state.party), activeOpponentIndex: 0, message: opponent.kind === "wild" ? `A wild ${getSpecies(opponent.pokemon[0].speciesId).name} appeared!` : `${opponent.trainer?.title} ${opponent.trainer?.name} wants to battle!`, turn: "player", canRun: opponent.kind === "wild" }
});

export const movePlayer = (state: GameState, dx: number, dy: number): GameState => {
    if (state.screen !== "overworld" || !state.party.length || state.battle) return state;
    const map = getWorldMap(state.currentMapId);
    const x = state.playerPosition.x + dx;
    const y = state.playerPosition.y + dy;
    const tile = map.tiles[y]?.[x];
    if (!tile || !isWalkable(tile)) return { ...state, notice: "You cannot go that way." };
    const exit = map.exits.find((item) => item.x === x && item.y === y);
    if (exit) {
        const destination = getWorldMap(exit.to);
        return { ...state, currentMapId: exit.to, playerPosition: exit.entry, notice: `Entered ${destination.name}.` };
    }
    const trainer = map.trainers.find((item) => item.x === x && item.y === y && !state.defeatedTrainers.includes(item.id));
    if (trainer) return beginBattle(state, { kind: "trainer", trainer, pokemon: trainer.pokemon.map((pokemon) => ({ ...pokemon })) });
    const movedState: GameState = {
        ...state,
        screen: tile === "shop" ? "shop" : state.screen,
        playerPosition: { x, y },
        notice: tile === "healing" ? "Your party was fully healed!" : tile === "sign" ? map.signMessage : undefined
    };
    const healedState = tile === "healing" ? { ...movedState, party: movedState.party.map((pokemon) => ({ ...pokemon, hp: pokemon.maxHp })) } : movedState;
    return tile === "grass" && Math.random() < grassEncounterChance ? beginBattle(healedState, makeWildOpponent(map)) : healedState;
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
        const currentSpecies = getSpecies(nextPokemon.speciesId);
        if (currentSpecies.evolvesTo && currentSpecies.evolutionLevel === nextPokemon.level) {
            const evolved = getSpecies(currentSpecies.evolvesTo);
            nextPokemon = { ...nextPokemon, speciesId: evolved.id, nickname: nextPokemon.nickname === currentSpecies.name ? evolved.name : nextPokemon.nickname, maxHp: nextPokemon.maxHp + 8, hp: nextPokemon.hp + 8, moves: evolved.moves.map(getMove) };
        }
    }
    return nextPokemon;
};

const recoverAtMeadow = (state: GameState, party: Pokemon[], notice: string, pokeballs = state.pokeballs): GameState => ({
    ...state,
    party: party.map((pokemon) => ({ ...pokemon, hp: pokemon.maxHp })),
    pokeballs,
    currentMapId: "meadow-town",
    screen: "overworld",
    battle: undefined,
    playerPosition: { x: 7, y: 9 },
    money: Math.max(0, state.money - 100),
    notice
});

const advanceOpponent = (state: GameState, party: Pokemon[], battle: BattleState, defeatedName: string): GameState => {
    const nextIndex = healthyPokemonIndex(battle.opponent.pokemon);
    if (nextIndex >= 0) return { ...state, party, battle: { ...battle, activeOpponentIndex: nextIndex, message: `${defeatedName} fainted! ${getSpecies(battle.opponent.pokemon[nextIndex].speciesId).name} is next.`, turn: "player" } };
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
    if (!player || !opponent) return { ...state, screen: "overworld", battle: undefined, notice: "The encounter data was incomplete. Returning to the field." };
    const damage = calculateDamage(player, opponent, move);
    const updatedOpponent = { ...opponent, hp: Math.max(0, opponent.hp - damage) };
    const updatedBattle = replaceBattlePokemon(battle, "opponent", battle.activeOpponentIndex, updatedOpponent);
    const effectiveness = typeMultiplier(move.type, opponent);
    if (isFainted(updatedOpponent)) {
        const earnedExperience = opponent.level * 12;
        const party = state.party.map((item, index) => index === battle.activePlayerIndex ? levelUp(item, earnedExperience) : item);
        return advanceOpponent(state, party, updatedBattle, opponent.nickname);
    }
    const opponentMove = updatedOpponent.moves[Math.floor(Math.random() * updatedOpponent.moves.length)] || getMove("tackle");
    const counterDamage = calculateDamage(updatedOpponent, player, opponentMove);
    const updatedPlayer = { ...player, hp: Math.max(0, player.hp - counterDamage) };
    const party = state.party.map((item, index) => index === battle.activePlayerIndex ? updatedPlayer : item);
    const message = `${player.nickname} used ${move.name}! ${effectiveness > 1 ? "It's super effective! " : effectiveness < 1 ? "It's not very effective. " : ""}${updatedOpponent.nickname} used ${opponentMove.name}!`;
    if (isFainted(updatedPlayer)) {
        const nextIndex = healthyPokemonIndex(party);
        if (nextIndex < 0) return recoverAtMeadow(state, party, "Your party rushed back to the Meadow Town healing station.");
        return { ...state, party, battle: { ...updatedBattle, activePlayerIndex: nextIndex, message: `${updatedPlayer.nickname} fainted! Go, ${party[nextIndex].nickname}!`, turn: "player" } };
    }
    return { ...state, party, battle: { ...updatedBattle, message, turn: "player" } };
};

export const switchPokemon = (state: GameState, index: number): GameState => {
    const pokemon = state.party[index];
    if (!state.battle || !pokemon || index === state.battle.activePlayerIndex || isFainted(pokemon)) return state;
    return { ...state, battle: { ...state.battle, activePlayerIndex: index, message: `Go, ${state.party[index].nickname}!`, turn: "player" } };
};

export const runFromBattle = (state: GameState): GameState => state.battle?.canRun ? { ...state, screen: "overworld", battle: undefined, notice: "Got away safely!" } : state;

export const catchPokemon = (state: GameState): GameState => {
    const battle = state.battle;
    if (!battle || battle.opponent.kind === "trainer") return state;
    if (state.pokeballs <= 0) return { ...state, battle: { ...battle, message: "You are out of Poké Balls! Visit the Meadow Town shop.", turn: "player" } };
    const pokemon = battle.opponent.pokemon[battle.activeOpponentIndex];
    if (!pokemon) return { ...state, screen: "overworld", battle: undefined, notice: "The encounter data was incomplete. Returning to the field." };
    const player = state.party[battle.activePlayerIndex];
    if (!player) return { ...state, screen: "overworld", battle: undefined, notice: "The encounter data was incomplete. Returning to the field." };
    const healthBonus = (1 - pokemon.hp / pokemon.maxHp) * 0.65;
    const levelBonus = Math.max(-0.08, Math.min(0.08, (player.level - pokemon.level) * 0.02));
    const chance = Math.max(0.15, Math.min(0.9, 0.25 + healthBonus + levelBonus));
    const pokeballs = state.pokeballs - 1;
    if (Math.random() > chance) {
        const opponentMove = pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)] || getMove("tackle");
        const counterDamage = calculateDamage(pokemon, player, opponentMove);
        const updatedPlayer = { ...player, hp: Math.max(0, player.hp - counterDamage) };
        const party = state.party.map((item, index) => index === battle.activePlayerIndex ? updatedPlayer : item);
        if (isFainted(updatedPlayer)) {
            const nextIndex = healthyPokemonIndex(party);
            if (nextIndex < 0) {
                return recoverAtMeadow(state, party, `${pokemon.nickname} broke free! Your party rushed back to Meadow Town.`, pokeballs);
            }
            return { ...state, party, pokeballs, battle: { ...battle, activePlayerIndex: nextIndex, message: `${pokemon.nickname} broke free and used ${opponentMove.name}! Go, ${party[nextIndex].nickname}!`, turn: "player" } };
        }
        return { ...state, party, pokeballs, battle: { ...battle, message: `${pokemon.nickname} broke free and used ${opponentMove.name}!`, turn: "player" } };
    }
    const party = state.party.length < maxPartySize ? [...state.party, pokemon] : state.party;
    const storage = state.party.length < maxPartySize ? state.storage : [...state.storage, pokemon];
    const destination = state.party.length < maxPartySize ? "joined your party" : "was sent to storage";
    return { ...state, party, storage, pokeballs, screen: "overworld", battle: undefined, notice: `${pokemon.nickname} was caught and ${destination}!` };
};

export const buyPokeballs = (state: GameState, quantity: number, price: number): GameState => {
    if (state.screen !== "shop") return state;
    if (state.money < price) return { ...state, notice: `You need ₽ ${price - state.money} more for that pack.` };
    return { ...state, money: state.money - price, pokeballs: state.pokeballs + quantity, notice: `Bought ${quantity} Poké Ball${quantity === 1 ? "" : "s"}!` };
};

export const leaveShop = (state: GameState): GameState => ({ ...state, screen: "overworld", notice: undefined });

export const dismissNotice = (state: GameState): GameState => ({ ...state, notice: undefined });
