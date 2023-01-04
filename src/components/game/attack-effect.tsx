import { PokemonType } from "game/types";

const AttackEffect = ({ type }: { type: PokemonType }) => (
    <span className={`attack-effect attack-effect-${type}`} aria-hidden="true">
        <i /><i /><i /><i /><i /><i /><i /><i />
        <b>HIT!</b>
    </span>
);

export default AttackEffect;
