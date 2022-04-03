import { Link } from "react-router-dom";

const NavigationBar = () => {
    return (
        <nav className="fixed top-0 w-full h-12 inline-flex justify-center items-center bg-black text-white">
            <div className="w-11/12 inline-flex">
                <div className="text-2xl">PokeMark</div>
                <ul className="inline-flex items-center ml-auto">
                    <li className="mr-2">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="mr-2">
                        <Link to="/roster">Roster</Link>
                    </li>
                    <li className="mr-2">
                        <Link to="/settings">Settings</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavigationBar;
