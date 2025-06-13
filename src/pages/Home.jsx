import Banner from "../components/home/Banner";
import Community from "../components/home/Community";
import Featured from "../components/home/Featured";
import SystemWork from "../components/home/SystemWork";


const Home = () => {
    return (
        <div>
            <Banner/>
            <Featured/>
            <SystemWork/>
            <Community/>
            
        </div>
    );
};

export default Home;