import React from 'react'

const Loader = ({styles="w-10 h-10"}) => {
  return (
    <div className='flex justify-center items-center w-full'>
        <div className={`border-4 border-t-[--primary-color] rounded-[50%] border-slate-400 animate-spin ${styles}`}></div>
    </div>
  )
}

export default Loader
