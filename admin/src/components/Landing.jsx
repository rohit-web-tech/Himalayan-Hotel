import React from 'react'
import image from "../assets/admin.jpg"

const Landing = () => {
  return (
    <div className='flex flex-col items-center justify-center  w-full md:w-[calc(100%-300px)] '>
      <img
        src={image}
        className='h-96'
      />
      <p className='text-gray-700 text-xl font-bold'>Welcome to Admin Dashboard !</p>
    </div>
  )
}

export default Landing
