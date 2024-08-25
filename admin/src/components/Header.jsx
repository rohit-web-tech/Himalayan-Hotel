import React from 'react'

const Header = ({title,handleBtn,btnText}) => {
  return (
    <div className='h-[70px] flex items-center justify-between'>
      <h2 className='text-gray-900 font-bold text-xl'>{title}</h2>
      <button
        onClick={handleBtn}
        className='border-blue-600 border-2 px-10 py-1 rounded-lg text-blue-600 text-sm hover:bg-blue-600 hover:text-white'
      >{btnText}</button>
    </div>
  )
}

export default Header
