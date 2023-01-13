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
                    <p className="eyebrow">Field assignment · 04</p>
                    <h1>Every trail leaves a mark.</h1>
                    <p>Survey Meadow Town, document unknown species, and build a team capable of going beyond the mapped frontier.</p>
                </div>
                <div className="intro-readout"><span>REGION / MEADOW</span><span>CONDITIONS / CLEAR</span><span>STATUS / OPEN</span></div>
            </div>
            <div className="intro-panel">
                <div>
                    <p className="eyebrow">Trainer registration</p>
                    <h2>Initialize your field journal</h2>
                    <p className="intro-panel-copy">Your call sign will identify every survey, encounter, and specimen record.</p>
                </div>
                <form onSubmit={submit} className="intro-form">
                    <label htmlFor="trainer-name">Trainer call sign</label>
                    <div className="intro-input-wrap"><span>PM—</span><input id="trainer-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={12} autoFocus placeholder="ENTER NAME" autoComplete="off" /></div>
                    <button type="submit" className="game-button" disabled={!name.trim()}>Start expedition <FiArrowUpRight /></button>
                </form>
                <p className="intro-legal">FIELD SYSTEM 2.4 · LOCAL SAVE ACTIVE</p>
            </div>
        </div>
    );
};

export default IntroScreen;
