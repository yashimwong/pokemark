import React from "react";
import { GlobalContext, GlobaDataType } from "stores/global";

const Home = () => {
    const { fetchPokemon }: GlobaDataType = React.useContext(GlobalContext);

    React.useEffect(() => {
        fetchPokemon();
    }, []);

    return <h1 className="text-2xl">Homepage</h1>;
};

export default Home;
