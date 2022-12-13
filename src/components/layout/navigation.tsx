import { NavLink } from "react-router-dom";
import { FiBookOpen, FiCompass, FiHexagon, FiSliders } from "react-icons/fi";
import { useGame } from "game/context";

const NavigationBar = () => {
    const { catalogSource } = useGame();
    const linkClass = ({ isActive }: { isActive: boolean }) => `navigation-link ${isActive ? "navigation-link-active" : ""}`;
    return (
        <nav className="navigation-shell">
            <div className="navigation-inner">
                <NavLink to="/" className="navigation-brand" aria-label="Pokemark home">
                    <span className="navigation-mark"><FiHexagon /></span>
                    <span><strong>POKEMARK</strong><small>FIELD UNIT 04</small></span>
                </NavLink>
                <ul className="navigation-links">
                    <li><NavLink to="/" className={linkClass}><FiCompass /><span>Expedition</span></NavLink></li>
                    <li><NavLink to="/roster" className={linkClass}><FiBookOpen /><span>Specimens</span></NavLink></li>
                    <li><NavLink to="/settings" className={linkClass}><FiSliders /><span>Field log</span></NavLink></li>
                </ul>
                <div className="navigation-status"><i /> {catalogSource === "loading" ? "Syncing PokéAPI" : catalogSource === "pokeapi" ? "PokéAPI online" : "Cached catalog"}</div>
            </div>
        </nav>
    );
};

export default NavigationBar;
