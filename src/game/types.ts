export type PokemonType = "normal" | "fire" | "water" | "grass" | "electric" | "bug" | "poison" | "ground" | "flying" | "psychic" | "rock" | "dark" | "fairy" | "fighting" | "steel";

export type MoveCategory = "physical" | "special" | "status";

export type Move = {
    id: string;
    name: string;
    type: PokemonType;
    power: number;
    accuracy: number;
    pp: number;
    category: MoveCategory;
    description: string;
};

export type PokemonSpecies = {
    id: string;
    name: string;
    number: string;
    types: PokemonType[];
    color: string;
    artwork: string;
    baseHp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    moves: string[];
    evolvesTo?: string;
    evolutionLevel?: number;
};

export type Pokemon = {
    uid: string;
    speciesId: string;
    nickname: string;
    level: number;
    experience: number;
    hp: number;
    maxHp: number;
    moves: Move[];
};

export type PlayerPosition = {
    x: number;
    y: number;
};

export type Trainer = {
    id: string;
    name: string;
    title: string;
    greeting: string;
    defeatText: string;
    x: number;
    y: number;
    direction: "up" | "down" | "left" | "right";
    pokemon: Pokemon[];
    reward: number;
};

export type BattleParticipant = {
    kind: "wild" | "trainer";
    trainer?: Trainer;
    pokemon: Pokemon[];
};

export type BattleState = {
    opponent: BattleParticipant;
    activePlayerIndex: number;
    activeOpponentIndex: number;
    message: string;
    turn: "player" | "opponent" | "finished";
    canRun: boolean;
};

export type GameScreen = "overworld" | "battle" | "starter" | "intro";

export type GameState = {
    screen: GameScreen;
    trainerName: string;
    playerPosition: PlayerPosition;
    party: Pokemon[];
    storage: Pokemon[];
    money: number;
    badges: string[];
    defeatedTrainers: string[];
    battle?: BattleState;
    notice?: string;
};
