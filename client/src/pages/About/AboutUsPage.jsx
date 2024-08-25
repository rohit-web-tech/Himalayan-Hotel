import React from 'react'
import About from './AboutUsContent/AboutUsContent'
import image from '../../assets/heroBanner.jpg';

const AboutUsPage = () => {
  return (
    <About src={image} showBtn={false}/>
  )
}

export default AboutUsPage
