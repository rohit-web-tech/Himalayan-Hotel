import React from 'react'

const ImagePreview = ({src=""}) => {
  return (
    <div className='w-full border-2 border-gray-300 bg-gray-200 rounded-md h-[200px] flex items-center justify-center bg-contain relative overflow-hidden'>
      {
        src && <img src={src} alt="Preview" className='h-full w-full' />
      }
    </div>
  )
}

export default ImagePreview
