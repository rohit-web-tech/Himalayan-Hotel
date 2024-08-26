import React, { useEffect, useState } from "react";
import HeroBanner from "./heroBanner/HeroBanner";
import About from "../About/AboutUsContent/AboutUsContent";
import image from "../../assets/about.jpg";
import Loader from "../../components/loader";


const Home = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(true)
  const [heroBannerData, setHeroBannerData] = useState({
    title: "",
    subtitle: "",
    imageUrl: ""
  })
  const [aboutData, setAboutData] = useState({
    title: "",
    description: "",
    imageUrl: ""
  })

  const getAboutData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/getAbout`);
      const data = await res.json();
      if (data.message == "success") {
        setAboutData(data?.about || {
          title: "",
          description: "",
          imageUrl: ""
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getHeroBannerData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/getHome`);
      const data = await res.json();
      if (data.message == "success") {
        setHeroBannerData(data?.home || {
          title: "",
          subtitle: "",
          imageUrl: ""
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getHeroBannerData(),
      getAboutData()
    ]).finally(() => setLoading(false))
  }, [])
  return (
    <div className="w-full relative">
      {
        loading ? (
          <Loader styles="h-10 w-10 my-[30vh]" />
        ) : (
          <>
            <HeroBanner data={heroBannerData} />
            <About src={image} showBtn={true} data={aboutData} />
          </>
        )
      }
    </div>
  );
};

export default Home;
