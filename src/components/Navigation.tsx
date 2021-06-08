import { Link } from "react-router-dom";
import { CogIcon } from "@heroicons/react/outline";

type NavigationProps = {
  version: String;
};

const Navigation = ({ version }: NavigationProps) => {
  return (
    <div className="flex flex-row flex-nowrap items-center justify-start h-12 bg-gray-900">
      <div className="flex flex-row items-center ml-4 text-gray-50 text-2xl leading-none">
        <Link to="/">PokeMark</Link>
        <div className="self-end text-gray-400 ml-1 text-base leading-none">
          v{version}
        </div>
      </div>

      <nav className="flex flex-row flex-nowrap items-center justify-end w-full mr-4">
        <ul>
          <li className="text-gray-50 bg-gray-700 py-1 px-2 rounded-md hover:bg-gray-600">
            <Link to="/settings">
              <CogIcon className="inline h-5 w-5 mr-1 mb-0.5" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
