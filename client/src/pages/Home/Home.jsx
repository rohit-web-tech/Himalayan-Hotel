import React from "react";
import HeroBanner from "./heroBanner/HeroBanner";
import CheckRoomSection from "./checkRoomSection/CheckRoomSection";
import About from "../About/AboutUsContent/AboutUsContent";
import Achievements from "./achievements/Achievements";
import image from "../../assets/about.jpg";


const Home = () => {
  return (
    <div className="w-full relative">
      <HeroBanner />
      <About src={image} showBtn={true}/>
    </div>
  );
};

export default Home;
