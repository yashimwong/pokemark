import TrainerWizard from "components/form/trainer-wizard";
import MainContainer from "components/layout/container";

const Home = () => {
    return (
        <MainContainer>
            <div className="flex-col w-full">
                <h1 className="text-2xl">Homepage</h1>
                <TrainerWizard />
            </div>
        </MainContainer>
    );
};

export default Home;
