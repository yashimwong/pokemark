import React from "react";
import { GlobalContext, GlobaDataType } from "stores/global-data";
import AutoComplete from "components/input/autocomplete";

const Home = () => {
    const { pokemon_list }: GlobaDataType = React.useContext(GlobalContext);

    return (
        <div className="">
            <h1 className="text-2xl">Homepage</h1>
            <AutoComplete data={pokemon_list.map((p) => ({ key: p.name, value: p.url }))} />
        </div>
    );
};

export default Home;
