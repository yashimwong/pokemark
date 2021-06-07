import { ReactComponent as Pokeball } from "../images/pokeball.svg";

const Loading = () => {
  return (
    <div className="xl:mt-24 mt-8 animate-pulse">
      <Pokeball
        width="200"
        height="200"
        className="animate-spin opacity-50 xl:w-96 xl:h-96"
      />
    </div>
  );
};

export default Loading;
