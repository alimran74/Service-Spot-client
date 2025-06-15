import Banner from "../components/home/Banner";
import CountUpStats from "../components/home/CountUpStats";
import FAQ from "../components/home/FAQ";

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
            <CountUpStats/>
            <SystemWork/>
            <FAQ/>
            
            
        </div>
    );
};

export default Home;