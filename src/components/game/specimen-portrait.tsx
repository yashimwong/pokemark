import classNames from "classnames";
import { PokemonSpecies } from "game/types";
import { CSSProperties } from "react";

const SpecimenPortrait = ({ specimen, size = "card", opposing }: { specimen: PokemonSpecies; size?: "card" | "starter" | "battle"; opposing?: boolean }) => (
    <div className={classNames("specimen-portrait", `specimen-portrait-${size}`, opposing && "specimen-portrait-opposing")} style={{ "--specimen-color": specimen.color } as CSSProperties}>
        <span className="specimen-index">Nº {specimen.number}</span>
        <img src={specimen.artwork} alt={specimen.name} draggable={false} />
    </div>
);

export default SpecimenPortrait;
