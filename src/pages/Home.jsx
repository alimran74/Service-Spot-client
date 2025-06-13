import Banner from "../components/home/Banner";
import Community from "../components/home/Community";
import Featured from "../components/home/Featured";
import MeetOurPartners from "../components/home/MeetOurPartners";
import PricingSection from "../components/home/PricingSection";
import SystemWork from "../components/home/SystemWork";
 



const Home = () => {
    return (
        <div>
            <Banner/>
            <Featured/>
            <PricingSection/>
            <MeetOurPartners/>
            <SystemWork/>
            <Community/>
            
        </div>
    );
};

export default Home;