import { NavLink } from "react-router-dom";
import { FiBook, FiCompass, FiHexagon, FiSliders } from "react-icons/fi";
import { useGame } from "game/context";

const NavigationBar = () => {
    const { catalogSource } = useGame();
    const linkClass = ({ isActive }: { isActive: boolean }) => `navigation-link ${isActive ? "navigation-link-active" : ""}`;
    return (
        <nav className="navigation-shell">
            <div className="navigation-inner">
                <NavLink to="/" className="navigation-brand" aria-label="Pokemark home">
                    <span className="navigation-mark"><FiHexagon /></span>
                    <span><strong>POKÉMARK</strong><small>MEADOW VERSION</small></span>
                </NavLink>
                <ul className="navigation-links">
                    <li><NavLink to="/" className={linkClass}><FiCompass /><span>Adventure</span></NavLink></li>
                    <li><NavLink to="/pokedex" className={linkClass}><FiBook /><span>Pokédex</span></NavLink></li>
                    <li><NavLink to="/settings" className={linkClass}><FiSliders /><span>Trainer</span></NavLink></li>
                </ul>
                <div className="navigation-status"><i /> {catalogSource === "loading" ? "Syncing PokéAPI" : catalogSource === "pokeapi" ? "PokéAPI online" : "Cached catalog"}</div>
            </div>
        </nav>
    );
};

export default NavigationBar;
