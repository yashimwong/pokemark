import { Trainer } from "game/types";
import { createPokemon } from "game/data/species";

export type Tile = "path" | "grass" | "tree" | "water" | "flower" | "sign" | "lab" | "healing" | "bridge";

export const townMap: Tile[][] = [
    ["tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree"],
    ["tree", "grass", "grass", "path", "path", "path", "grass", "grass", "water", "water", "water", "grass", "grass", "grass", "grass", "tree"],
    ["tree", "grass", "flower", "path", "lab", "lab", "grass", "grass", "water", "water", "water", "grass", "flower", "grass", "grass", "tree"],
    ["tree", "grass", "grass", "path", "lab", "lab", "path", "path", "bridge", "bridge", "bridge", "path", "path", "path", "grass", "tree"],
    ["tree", "path", "path", "path", "path", "path", "grass", "grass", "water", "water", "water", "grass", "grass", "path", "grass", "tree"],
    ["tree", "path", "grass", "grass", "grass", "path", "grass", "flower", "water", "water", "water", "grass", "grass", "path", "grass", "tree"],
    ["tree", "path", "grass", "grass", "grass", "path", "path", "path", "path", "path", "path", "path", "path", "path", "path", "tree"],
    ["tree", "path", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "path", "tree"],
    ["tree", "path", "grass", "grass", "grass", "healing", "healing", "grass", "grass", "flower", "grass", "grass", "grass", "grass", "path", "tree"],
    ["tree", "path", "path", "path", "path", "healing", "healing", "path", "path", "path", "path", "path", "path", "path", "path", "tree"],
    ["tree", "grass", "grass", "grass", "sign", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "tree"],
    ["tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree"]
];

export const wildEncounterIds = ["pidgey", "caterpie", "pikachu", "geodude", "abra"];

export const trainers: Trainer[] = [
    { id: "mia", name: "Mia", title: "Youngster", greeting: "My team has been training in the tall grass!", defeatText: "That was a brilliant battle!", x: 11, y: 4, direction: "left", pokemon: [createPokemon("caterpie", 4), createPokemon("pidgey", 5)], reward: 180 },
    { id: "kai", name: "Kai", title: "Ranger", greeting: "The river trail is a real test for new trainers.", defeatText: "Your bond is stronger than I expected.", x: 3, y: 7, direction: "down", pokemon: [createPokemon("geodude", 6)], reward: 240 },
    { id: "luna", name: "Luna", title: "Ace Trainer", greeting: "Show me what your first partner can do!", defeatText: "You have earned your first badge.", x: 12, y: 7, direction: "right", pokemon: [createPokemon("abra", 7), createPokemon("pikachu", 7)], reward: 500 }
];

export const isWalkable = (tile: Tile) => !["tree", "water", "lab"].includes(tile);
