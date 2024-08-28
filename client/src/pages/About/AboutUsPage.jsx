import React, { useEffect, useState } from 'react'
import About from './AboutUsContent/AboutUsContent'
import image from '../../assets/herobanner.jpg';
import Loader from '../../components/loader';
import { fetchGetData } from '../../lib/fetchData';

const AboutUsPage = () => {
  const [loading, setLoading] = useState(true)
  const [aboutData, setAboutData] = useState({
    title: "",
    description: "",
    imageUrl: ""
  })

  const getAboutData = async () => {
    try {
      const res = await fetchGetData(`/getAbout`,setLoading);
      if (res.message == "success") {
        setAboutData(res?.about || {
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
    getAboutData();
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
