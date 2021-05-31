type NavigationProps = {
  version: String;
};

const Navigation = ({ version }: NavigationProps) => {
  return (
    <nav className="flex flex-row flex-nowrap items-center justify-start h-12 bg-gray-900">
      <div className="flex flex-row items-center ml-4 text-gray-50 text-2xl leading-none">
        PokeMark{" "}
        <div className="self-end text-gray-400 ml-1 text-base leading-none">
          v{version}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;