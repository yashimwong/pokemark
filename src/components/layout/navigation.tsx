import { NavLink } from "react-router-dom";

const NavigationBar = () => {
    const linkClass = ({ isActive }: { isActive: boolean }) => `px-3 py-1.5 rounded-lg text-sm font-bold transition ${isActive ? "bg-white text-slate-900" : "text-slate-300 hover:text-white"}`;
    return (
        <nav className="fixed top-0 z-20 w-full h-14 inline-flex justify-center items-center bg-slate-950 text-white shadow-lg">
            <div className="w-11/12 max-w-6xl inline-flex items-center">
                <div className="text-xl font-black tracking-tight">⚡ PokeMark</div>
                <ul className="inline-flex items-center gap-1 ml-auto">
                    <li><NavLink to="/" className={linkClass}>Adventure</NavLink></li>
                    <li><NavLink to="/roster" className={linkClass}>Roster</NavLink></li>
                    <li><NavLink to="/settings" className={linkClass}>Journal</NavLink></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavigationBar;
