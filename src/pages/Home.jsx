import Banner from "../components/home/Banner";
import CountUpStats from "../components/home/CountUpStats";
import FAQ from "../components/home/FAQ";
import Featured from "../components/home/Featured";
import InteractiveServiceFinder from "../components/home/InteractiveServiceFinder";
import MeetOurPartners from "../components/home/MeetOurPartners";
import PricingSection from "../components/home/PricingSection";
import SystemWork from "../components/home/SystemWork";
import { Helmet } from 'react-helmet-async';
import Testimonials from "../components/home/Testimonials";
import BlogSection from "../components/home/BlogSection";



const Home = () => {
  return (
    <div>
       {/* <Helmet>
        <title>ServiceSpot | Home Cleaning & Repair Experts</title>
        <meta name="description" content="Book trusted professionals for cleaning, plumbing, repairs & more with ServiceSpot." />
        <meta name="keywords" content="cleaning services, home repair, plumbing, electrician, ServiceSpot" />
        <link rel="canonical" href="https://service-spot-2f7aa.web.app/" />
      </Helmet> */}
      
      <Banner />
      <Featured />
      <PricingSection />
      <MeetOurPartners />
      <CountUpStats />
      <Testimonials/>
      <InteractiveServiceFinder/>
      <SystemWork />
      <FAQ />
      <BlogSection/>
     
      
    </div>
  );
};

export default Home;
