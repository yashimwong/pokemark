import { useMemo, useState } from "react";
import MainContainer from "components/layout/container";
import SpecimenPortrait from "components/game/specimen-portrait";
import TypeBadge from "components/game/type-badge";
import { getSpecies, pokemonDefinitions } from "game/data/species";
import { useGame } from "game/context";
import { FiCheck, FiChevronRight, FiCircle } from "react-icons/fi";

const Pokedex = () => {
    const { game } = useGame();
    const ownedPokemon = [...game.party, ...game.storage];
    const ownedIds = useMemo(() => new Set(ownedPokemon.map((pokemon) => pokemon.speciesId)), [ownedPokemon]);
    const initialEntry = ownedPokemon[0]?.speciesId || pokemonDefinitions[0].id;
    const [selectedId, setSelectedId] = useState(initialEntry);
    const selected = getSpecies(selectedId);
    const owned = ownedPokemon.find((pokemon) => pokemon.speciesId === selected.id);
    const completion = Math.round((ownedIds.size / pokemonDefinitions.length) * 100);

    return (
        <MainContainer className="game-main">
            <div className="pokedex-shell">
                <header className="pokedex-header">
                    <div className="pokedex-brand">
                        <span className="pokedex-lens"><i /></span>
                        <div><p>MEADOW REGIONAL</p><h1>POKÉDEX</h1></div>
                    </div>
                    <div className="pokedex-progress">
                        <span>CAUGHT</span>
                        <strong>{String(ownedIds.size).padStart(3, "0")} / {String(pokemonDefinitions.length).padStart(3, "0")}</strong>
                        <i><b style={{ width: `${completion}%` }} /></i>
                    </div>
                </header>

                <div className="pokedex-body">
                    <aside className="pokedex-list" aria-label="Pokédex entries">
                        <div className="pokedex-list-label"><span>REGIONAL DATA</span><span>{completion}%</span></div>
                        {pokemonDefinitions.map((definition) => {
                            const pokemon = getSpecies(definition.id);
                            const isOwned = ownedIds.has(pokemon.id);
                            const isSelected = selected.id === pokemon.id;
                            return (
                                <button type="button" key={pokemon.id} className={`pokedex-entry ${isSelected ? "pokedex-entry-active" : ""}`} onClick={() => setSelectedId(pokemon.id)}>
                                    <span className="pokedex-entry-number">#{pokemon.number}</span>
                                    <img src={pokemon.artwork} alt="" draggable={false} />
                                    <span className="pokedex-entry-name">{pokemon.name}</span>
                                    {isOwned ? <FiCheck aria-label="Caught" /> : <FiCircle aria-label="Not caught" />}
                                    <FiChevronRight aria-hidden="true" />
                                </button>
                            );
                        })}
                    </aside>

                    <section className="pokedex-display">
                        <div className="pokedex-screen">
                            <div className="pokedex-scanlines" aria-hidden="true" />
                            <span className="pokedex-screen-number">NO. {selected.number}</span>
                            <SpecimenPortrait specimen={selected} size="starter" />
                            <div className="pokedex-screen-name">
                                <span>{owned ? "● CAUGHT" : "○ NOT CAUGHT"}</span>
                                <h2>{selected.name}</h2>
                                <div>{selected.types.map((type) => <TypeBadge key={type} type={type} />)}</div>
                            </div>
                        </div>

                        <div className="pokedex-readout">
                            <div className="pokedex-description">
                                <span>POKÉMON DATA</span>
                                <p>{selected.name} has been documented in the Meadow region. Its highest recorded base attribute is {Math.max(selected.attack, selected.defense, selected.specialAttack, selected.specialDefense, selected.speed)}.</p>
                            </div>
                            <dl className="pokedex-stats">
                                <div><dt>HP</dt><dd>{selected.baseHp}</dd></div>
                                <div><dt>ATK</dt><dd>{selected.attack}</dd></div>
                                <div><dt>DEF</dt><dd>{selected.defense}</dd></div>
                                <div><dt>SP. ATK</dt><dd>{selected.specialAttack}</dd></div>
                                <div><dt>SP. DEF</dt><dd>{selected.specialDefense}</dd></div>
                                <div><dt>SPEED</dt><dd>{selected.speed}</dd></div>
                            </dl>
                            <div className="pokedex-owned-data">
                                <span>TRAINER RECORD</span>
                                <strong>{owned ? `${owned.nickname} · LV.${owned.level}` : "NO CAPTURE DATA"}</strong>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </MainContainer>
    );
};

export default Pokedex;
