import { ReactComponent as Pokeball } from "../images/pokeball.svg";

const Loading = () => {
  return (
    <div className="mt-24 animate-pulse">
      <Pokeball width="240" height="240" className="animate-spin opacity-50" />
    </div>
  );
};

export default Loading;
