import React from "react";

const Home = () => {
    return (
        <React.Fragment>
            <nav className="fixed top-0 w-full h-12 inline-flex justify-center items-center bg-black text-white">
                <div className="w-11/12 inline-flex">
                    <div className="text-2xl">PokeMark</div>
                    <ul className="inline-flex items-center ml-auto">
                        <li className="mr-2">Home</li>
                        <li className="mr-2">Roster</li>
                        <li className="mr-2">Settings</li>
                    </ul>
                </div>
            </nav>
            <div className="flex justify-center w-full mt-12">
                <div className="flex w-11/12">
                    <h1 className="text-2xl">Homepage</h1>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;
