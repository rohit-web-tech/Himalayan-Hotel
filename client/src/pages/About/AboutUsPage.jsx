import React, { useEffect, useState } from 'react'
import About from './AboutUsContent/AboutUsContent'
import image from '../../assets/herobanner.jpg';
import Loader from '../../components/loader';

const AboutUsPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    setLoading(true)
    getAboutData().finally(() => setLoading(false))
  }, [])
  
  return (
    loading ? (
      <Loader styles="h-10 w-10 my-[30vh]" />
    ) : (
      <>
        <About src={image} showBtn={false} data={aboutData}/>
      </>
    )
  )
}

export default AboutUsPage
