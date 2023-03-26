import BattleScreen from "components/game/battle-screen";
import IntroScreen from "components/game/intro-screen";
import Notice from "components/game/notice";
import OverworldScreen from "components/game/overworld-screen";
import ShopScreen from "components/game/shop-screen";
import StarterSelect from "components/game/starter-select";
import MainContainer from "components/layout/container";
import { useGame } from "game/context";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { game, beginAdventure, selectStarter, move, fight, switchPartyMember, run, catchWildPokemon, purchasePokeballs, exitShop, clearNotice } = useGame();
    const navigate = useNavigate();

    return (
        <MainContainer className="game-main">
            <div className="w-full">
                {game.screen === "intro" && <IntroScreen onStart={beginAdventure} />}
                {game.screen === "starter" && <StarterSelect trainerName={game.trainerName} onSelect={selectStarter} />}
                {game.screen === "overworld" && <OverworldScreen game={game} onMove={move} onOpenPokedex={() => navigate("/pokedex")} />}
                {game.screen === "battle" && <BattleScreen game={game} onFight={fight} onSwitch={switchPartyMember} onCatch={catchWildPokemon} onRun={run} />}
                {game.screen === "shop" && <ShopScreen money={game.money} pokeballs={game.pokeballs} onBuy={purchasePokeballs} onLeave={exitShop} />}
                <Notice message={game.notice} onClose={clearNotice} />
            </div>
        </MainContainer>
    );
};

export default Home;
