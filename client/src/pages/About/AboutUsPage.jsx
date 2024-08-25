import React from 'react'
import About from './AboutUsContent/AboutUsContent'
import image from '../../assets/herobanner.jpg';

const AboutUsPage = () => {
  return (
    <About src={image} showBtn={false}/>
  )
}

export default AboutUsPage
