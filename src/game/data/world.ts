import { PlayerPosition, Trainer, WorldMapId } from "game/types";
import { createPokemon } from "game/data/species";

export type Tile = "path" | "grass" | "tree" | "water" | "flower" | "sign" | "lab" | "healing" | "bridge" | "shop" | "gate";

export type MapExit = {
    x: number;
    y: number;
    to: WorldMapId;
    entry: PlayerPosition;
};

export type WorldMap = {
    id: WorldMapId;
    name: string;
    route: string;
    description: string;
    signMessage: string;
    tiles: Tile[][];
    wildEncounterIds: string[];
    wildLevels: [number, number];
    trainers: Trainer[];
    exits: MapExit[];
};

const meadowTown: Tile[][] = [
    ["tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree"],
    ["tree", "grass", "grass", "path", "path", "path", "grass", "grass", "water", "water", "water", "grass", "grass", "grass", "grass", "tree"],
    ["tree", "grass", "flower", "path", "lab", "lab", "grass", "grass", "water", "water", "water", "grass", "flower", "grass", "grass", "tree"],
    ["tree", "grass", "grass", "path", "lab", "lab", "path", "path", "bridge", "bridge", "bridge", "path", "path", "path", "grass", "tree"],
    ["tree", "path", "path", "path", "path", "path", "grass", "grass", "water", "water", "water", "grass", "grass", "path", "grass", "tree"],
    ["tree", "path", "grass", "grass", "grass", "path", "grass", "flower", "water", "water", "water", "grass", "grass", "path", "grass", "tree"],
    ["tree", "path", "grass", "grass", "grass", "path", "path", "path", "path", "path", "path", "path", "path", "path", "path", "gate"],
    ["tree", "path", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "path", "tree"],
    ["tree", "path", "grass", "grass", "grass", "healing", "healing", "grass", "grass", "flower", "grass", "grass", "grass", "grass", "path", "tree"],
    ["tree", "path", "path", "path", "path", "healing", "healing", "path", "path", "path", "shop", "path", "path", "path", "path", "tree"],
    ["tree", "grass", "grass", "grass", "sign", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "tree"],
    ["tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree"]
];

const birchTrail: Tile[][] = [
    ["tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree"],
    ["tree", "grass", "grass", "grass", "tree", "grass", "grass", "grass", "grass", "grass", "grass", "tree", "grass", "grass", "grass", "tree"],
    ["tree", "grass", "flower", "grass", "tree", "grass", "tree", "tree", "path", "tree", "grass", "tree", "grass", "flower", "grass", "tree"],
    ["tree", "grass", "path", "path", "path", "path", "tree", "grass", "path", "grass", "grass", "path", "path", "path", "grass", "tree"],
    ["tree", "tree", "path", "grass", "tree", "path", "tree", "flower", "path", "tree", "tree", "path", "tree", "grass", "grass", "tree"],
    ["tree", "grass", "path", "grass", "grass", "path", "path", "path", "path", "path", "path", "path", "tree", "grass", "grass", "tree"],
    ["gate", "path", "path", "path", "path", "path", "grass", "grass", "sign", "grass", "path", "path", "path", "path", "path", "gate"],
    ["tree", "grass", "grass", "tree", "grass", "path", "grass", "tree", "path", "grass", "path", "tree", "grass", "grass", "grass", "tree"],
    ["tree", "grass", "flower", "tree", "grass", "path", "path", "path", "path", "path", "path", "tree", "grass", "flower", "grass", "tree"],
    ["tree", "grass", "grass", "grass", "grass", "grass", "grass", "tree", "healing", "healing", "grass", "grass", "grass", "grass", "grass", "tree"],
    ["tree", "grass", "grass", "tree", "grass", "grass", "grass", "tree", "healing", "healing", "grass", "tree", "grass", "grass", "grass", "tree"],
    ["tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree"]
];

const moonriseCove: Tile[][] = [
    ["tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "gate", "tree", "tree", "tree", "tree", "tree", "tree", "tree"],
    ["tree", "grass", "grass", "grass", "water", "water", "water", "bridge", "path", "grass", "grass", "grass", "flower", "grass", "grass", "tree"],
    ["tree", "grass", "flower", "grass", "water", "water", "water", "bridge", "path", "grass", "water", "water", "water", "water", "grass", "tree"],
    ["tree", "grass", "grass", "grass", "water", "water", "water", "bridge", "path", "path", "bridge", "bridge", "bridge", "bridge", "path", "tree"],
    ["tree", "tree", "path", "path", "bridge", "bridge", "bridge", "bridge", "grass", "path", "water", "water", "water", "water", "path", "tree"],
    ["tree", "grass", "path", "grass", "water", "water", "water", "grass", "grass", "path", "water", "water", "water", "water", "path", "tree"],
    ["gate", "path", "path", "path", "path", "path", "path", "path", "sign", "path", "path", "path", "path", "path", "path", "tree"],
    ["tree", "grass", "path", "grass", "water", "water", "water", "grass", "grass", "path", "water", "water", "water", "water", "grass", "tree"],
    ["tree", "grass", "path", "grass", "water", "water", "water", "grass", "flower", "path", "path", "path", "grass", "grass", "grass", "tree"],
    ["tree", "grass", "path", "path", "bridge", "bridge", "bridge", "path", "path", "path", "grass", "healing", "healing", "grass", "grass", "tree"],
    ["tree", "grass", "grass", "grass", "water", "water", "water", "grass", "grass", "grass", "grass", "healing", "healing", "grass", "grass", "tree"],
    ["tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree"]
];

const emberRidge: Tile[][] = [
    ["tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree"],
    ["tree", "grass", "grass", "grass", "grass", "tree", "grass", "grass", "grass", "grass", "tree", "grass", "grass", "grass", "grass", "tree"],
    ["tree", "grass", "tree", "tree", "path", "tree", "grass", "flower", "grass", "path", "tree", "grass", "tree", "tree", "grass", "tree"],
    ["tree", "grass", "grass", "tree", "path", "path", "path", "path", "path", "path", "path", "path", "tree", "grass", "grass", "tree"],
    ["tree", "tree", "grass", "tree", "grass", "tree", "grass", "tree", "grass", "tree", "grass", "path", "tree", "grass", "tree", "tree"],
    ["tree", "grass", "grass", "path", "path", "path", "path", "tree", "grass", "tree", "grass", "path", "path", "path", "grass", "tree"],
    ["tree", "grass", "tree", "path", "grass", "tree", "path", "path", "sign", "path", "path", "path", "tree", "path", "grass", "tree"],
    ["tree", "grass", "tree", "path", "grass", "tree", "tree", "tree", "path", "tree", "grass", "tree", "tree", "path", "grass", "tree"],
    ["tree", "grass", "grass", "path", "path", "path", "path", "path", "path", "path", "path", "path", "path", "path", "grass", "tree"],
    ["tree", "grass", "tree", "tree", "grass", "tree", "grass", "tree", "path", "tree", "grass", "tree", "grass", "grass", "grass", "tree"],
    ["tree", "grass", "grass", "grass", "grass", "grass", "grass", "path", "path", "path", "grass", "grass", "grass", "flower", "grass", "tree"],
    ["tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "gate", "tree", "tree", "tree", "tree", "tree", "tree", "tree"]
];

const meadowTrainers: Trainer[] = [
    { id: "mia", name: "Mia", title: "Youngster", greeting: "My team has been training in the tall grass!", defeatText: "That was a brilliant battle!", x: 11, y: 4, direction: "left", pokemon: [createPokemon("caterpie", 4), createPokemon("spearow", 5)], reward: 180 },
    { id: "kai", name: "Kai", title: "Ranger", greeting: "The river trail is a real test for new trainers.", defeatText: "Your bond is stronger than I expected.", x: 3, y: 7, direction: "down", pokemon: [createPokemon("psyduck", 5), createPokemon("geodude", 6)], reward: 240 },
    { id: "luna", name: "Luna", title: "Ace Trainer", greeting: "Show me what your first partner can do!", defeatText: "You have earned your first badge.", x: 12, y: 7, direction: "right", pokemon: [createPokemon("growlithe", 7), createPokemon("abra", 7), createPokemon("pikachu", 8)], reward: 500 }
];

const maps: Record<WorldMapId, WorldMap> = {
    "meadow-town": {
        id: "meadow-town",
        name: "Meadow Town",
        route: "Route 01",
        description: "A quiet starting town crossed by a bright river.",
        signMessage: "Meadow Town: where every path begins.",
        tiles: meadowTown,
        wildEncounterIds: ["pidgey", "caterpie", "rattata", "oddish", "pikachu"],
        wildLevels: [3, 6],
        trainers: meadowTrainers,
        exits: [{ x: 15, y: 6, to: "birch-trail", entry: { x: 1, y: 6 } }]
    },
    "birch-trail": {
        id: "birch-trail",
        name: "Birch Trail",
        route: "Route 02",
        description: "A shaded woodland path alive with quick Pokémon.",
        signMessage: "Birch Trail · Meadow Town west · Moonrise Cove east.",
        tiles: birchTrail,
        wildEncounterIds: ["caterpie", "pidgey", "spearow", "oddish", "pikachu", "jigglypuff"],
        wildLevels: [5, 8],
        trainers: [
            { id: "rowan", name: "Rowan", title: "Bug Catcher", greeting: "The birches are full of surprises!", defeatText: "You found the strongest path.", x: 10, y: 5, direction: "left", pokemon: [createPokemon("caterpie", 7), createPokemon("pidgey", 7)], reward: 260 }
        ],
        exits: [
            { x: 0, y: 6, to: "meadow-town", entry: { x: 14, y: 6 } },
            { x: 15, y: 6, to: "moonrise-cove", entry: { x: 1, y: 6 } }
        ]
    },
    "moonrise-cove": {
        id: "moonrise-cove",
        name: "Moonrise Cove",
        route: "Route 03",
        description: "Moonlit water winds around islands of silver grass.",
        signMessage: "Moonrise Cove · Birch Trail west · Ember Ridge north.",
        tiles: moonriseCove,
        wildEncounterIds: ["psyduck", "zubat", "abra", "jigglypuff", "sandshrew", "geodude"],
        wildLevels: [7, 10],
        trainers: [
            { id: "marina", name: "Marina", title: "Swimmer", greeting: "The tide makes every battle different.", defeatText: "You read the current perfectly.", x: 9, y: 3, direction: "down", pokemon: [createPokemon("psyduck", 9), createPokemon("jigglypuff", 9)], reward: 340 }
        ],
        exits: [
            { x: 0, y: 6, to: "birch-trail", entry: { x: 14, y: 6 } },
            { x: 8, y: 0, to: "ember-ridge", entry: { x: 8, y: 10 } }
        ]
    },
    "ember-ridge": {
        id: "ember-ridge",
        name: "Ember Ridge",
        route: "Route 04",
        description: "A rugged highland warmed by volcanic stone.",
        signMessage: "Ember Ridge summit · Moonrise Cove south.",
        tiles: emberRidge,
        wildEncounterIds: ["vulpix", "growlithe", "ponyta", "machop", "geodude", "sandshrew"],
        wildLevels: [9, 12],
        trainers: [
            { id: "flint", name: "Flint", title: "Hiker", greeting: "Only tough partners reach the ridge!", defeatText: "That strength will carry you far.", x: 11, y: 5, direction: "left", pokemon: [createPokemon("geodude", 11), createPokemon("growlithe", 12)], reward: 420 }
        ],
        exits: [{ x: 8, y: 11, to: "moonrise-cove", entry: { x: 8, y: 1 } }]
    }
};

export const worldMaps = maps;
export const getWorldMap = (mapId: WorldMapId) => maps[mapId];
export const isWalkable = (tile: Tile) => !["tree", "water", "lab"].includes(tile);
