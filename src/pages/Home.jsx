import HeroSlider from "../components/home/HeroSlider";
import LatestCrops from "../components/home/LatestCrops";
import HowItWorks from "../components/home/HowItWorks";
import Statistics from "../components/home/Statistics";
import AgroNews from "../components/home/AgroNews";
import Testimonials from "../components/home/Testimonials";

const Home = () => {
  return (
    <div className="bg-gray-50">
      <HeroSlider />
      <LatestCrops />
      <HowItWorks />
      <Statistics />
      <AgroNews />
      <Testimonials />
    </div>
  );
};

export default Home;
