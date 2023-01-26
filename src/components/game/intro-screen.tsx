import { FormEvent, useState } from "react";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import { getSpecies } from "game/data/species";

const featuredPokemon = ["pikachu", "bulbasaur", "charmander", "squirtle", "jigglypuff"].map(getSpecies);

const IntroScreen = ({ onStart }: { onStart: (name: string) => void }) => {
    const [name, setName] = useState("");
    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (name.trim()) onStart(name.trim());
    };

    return (
        <div className="intro-shell">
            <div className="intro-visual">
                <div className="intro-coordinate"><FiMapPin /> 36.2048° N · 138.2529° E</div>
                <div className="intro-topography" aria-hidden="true"><span /><span /><span /><span /></div>
                <div className="intro-pokemon" aria-hidden="true">
                    {featuredPokemon.map((pokemon) => <img key={pokemon.id} src={pokemon.artwork} alt="" draggable={false} />)}
                </div>
                <div className="intro-copy">
                    <p className="eyebrow">A Pokémon adventure awaits!</p>
                    <h1>Gotta mark 'em all!</h1>
                    <p>Explore Meadow Town, meet wild Pokémon, and raise a team that can take on every Trainer in the region.</p>
                </div>
                <div className="intro-readout"><span>REGION / MEADOW</span><span>POKÉMON / 23</span><span>STATUS / READY!</span></div>
            </div>
            <div className="intro-panel">
                <div>
                    <p className="eyebrow">New game</p>
                    <h2>What is your name?</h2>
                    <p className="intro-panel-copy">Professor Oakwood needs a name for your Trainer Card and Pokédex.</p>
                </div>
                <form onSubmit={submit} className="intro-form">
                    <label htmlFor="trainer-name">Trainer name</label>
                    <div className="intro-input-wrap"><span>PM—</span><input id="trainer-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={12} autoFocus placeholder="ENTER NAME" autoComplete="off" /></div>
                    <button type="submit" className="game-button" disabled={!name.trim()}>Start adventure <FiArrowUpRight /></button>
                </form>
                <p className="intro-legal">PRESS START · YOUR JOURNEY BEGINS HERE</p>
            </div>
        </div>
    );
};

export default IntroScreen;
