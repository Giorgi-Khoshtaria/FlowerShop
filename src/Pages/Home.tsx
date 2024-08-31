import BestSellers from "../components/HomePageComponents/BestSellers";
import HomePageHero from "../components/HomePageComponents/HomePageHero";

function Home() {
  return (
    <div className="flex items-center justify-center mt-[73px] p-4">
      <div className="max-w-[1440px] w-full flex flex-col items-start">
        <HomePageHero />
        <BestSellers />
      </div>
    </div>
  );
}

export default Home;
