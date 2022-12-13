import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { loadPokeApiCatalog } from "game/data/pokeapi";
import { chooseStarter, initialGameState, movePlayer, runFromBattle, setTrainerName, switchPokemon, useMove, catchPokemon, dismissNotice } from "game/state";
import { GameState, Move } from "game/types";

type GameContextValue = {
    game: GameState;
    catalogSource: "loading" | "pokeapi" | "fallback";
    beginAdventure: (name: string) => void;
    selectStarter: (speciesId: string) => void;
    move: (dx: number, dy: number) => void;
    fight: (move: Move) => void;
    switchPartyMember: (index: number) => void;
    run: () => void;
    catchWildPokemon: () => void;
    clearNotice: () => void;
};

const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [game, setGame] = useState(initialGameState);
    const [catalogSource, setCatalogSource] = useState<GameContextValue["catalogSource"]>("loading");

    useEffect(() => {
        let active = true;
        loadPokeApiCatalog()
            .then(() => { if (active) setCatalogSource("pokeapi"); })
            .catch(() => { if (active) setCatalogSource("fallback"); });
        return () => { active = false; };
    }, []);

    const value = useMemo(() => ({
        game,
        catalogSource,
        beginAdventure: (name: string) => setGame((state) => setTrainerName(state, name)),
        selectStarter: (speciesId: string) => setGame((state) => chooseStarter(state, speciesId)),
        move: (dx: number, dy: number) => setGame((state) => movePlayer(state, dx, dy)),
        fight: (move: Move) => setGame((state) => useMove(state, move)),
        switchPartyMember: (index: number) => setGame((state) => switchPokemon(state, index)),
        run: () => setGame((state) => runFromBattle(state)),
        catchWildPokemon: () => setGame((state) => catchPokemon(state)),
        clearNotice: () => setGame((state) => dismissNotice(state))
    }), [game, catalogSource]);

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error("useGame must be used inside GameProvider");
    return context;
};
