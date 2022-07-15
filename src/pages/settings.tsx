import MainContainer from "components/layout/container";
import { useGame } from "game/context";

const Settings = () => {
    const { game } = useGame();
    return (
        <MainContainer className="game-main">
            <div className="w-full max-w-3xl mx-auto game-panel p-6 sm:p-8">
                <p className="text-sm uppercase tracking-wider font-bold text-indigo-600">Trainer journal</p>
                <h1 className="text-3xl font-black">Adventure settings</h1>
                <div className="grid sm:grid-cols-2 gap-5 mt-7">
                    <section className="rounded-2xl bg-slate-50 p-5"><h2 className="font-black">How to play</h2><ul className="text-sm text-slate-600 mt-3 space-y-2"><li>Move with arrow keys, WASD, or the map controls.</li><li>Walk in tall grass for random encounters.</li><li>Win trainer battles to earn Poké and badges.</li><li>Use healing stations to restore your party.</li></ul></section>
                    <section className="rounded-2xl bg-indigo-50 p-5"><h2 className="font-black">Trainer record</h2><dl className="text-sm text-slate-600 mt-3 space-y-2"><div className="flex justify-between"><dt>Trainer</dt><dd className="font-bold">{game.trainerName || "New Trainer"}</dd></div><div className="flex justify-between"><dt>Poké</dt><dd className="font-bold">{game.money}</dd></div><div className="flex justify-between"><dt>Trainers defeated</dt><dd className="font-bold">{game.defeatedTrainers.length}</dd></div><div className="flex justify-between"><dt>Badges</dt><dd className="font-bold">{game.badges.length}</dd></div></dl></section>
                </div>
                <section className="mt-6"><h2 className="font-black">Badges</h2><div className="flex flex-wrap gap-3 mt-3">{game.badges.length ? game.badges.map((badge) => <span key={badge} className="rounded-full bg-amber-100 text-amber-800 px-4 py-2 text-sm font-bold">★ {badge}</span>) : <span className="text-sm text-slate-500">Defeat Ace Trainer Luna to earn the Meadow Badge.</span>}</div></section>
            </div>
        </MainContainer>
    );
};

export default Settings;
