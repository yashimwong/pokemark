import MainContainer from "components/layout/container";
import PokemonCard from "components/game/pokemon-card";
import { useGame } from "game/context";

const Roster = () => {
    const { game } = useGame();
    return (
        <MainContainer className="game-main">
            <div className="w-full max-w-5xl mx-auto">
                <div className="mb-7"><p className="text-sm uppercase tracking-wider font-bold text-indigo-600">Trainer roster</p><h1 className="text-3xl font-black">Your Pokémon</h1><p className="text-slate-500 mt-1">Keep up to six Pokémon in your active party.</p></div>
                {!game.party.length ? <div className="game-panel p-8 text-center text-slate-500">Start your adventure and choose a partner to see your roster.</div> : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{game.party.map((pokemon, index) => <PokemonCard key={pokemon.uid} pokemon={pokemon} active={index === 0} />)}</div>}
                {game.storage.length > 0 && <div className="mt-10"><h2 className="text-xl font-black mb-4">Storage</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{game.storage.map((pokemon) => <PokemonCard key={pokemon.uid} pokemon={pokemon} />)}</div></div>}
            </div>
        </MainContainer>
    );
};

export default Roster;
