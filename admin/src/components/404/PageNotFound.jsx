import React from 'react'
import image from "../../assets/404.jpg"
import { useNavigate } from 'react-router-dom'

const PageNotFound = ({type=""}) => {
    const navigate = useNavigate();
    return (
        <div className={`py-6 flex flex-col items-center justify-center ${type==="login" ? "w-[calc(100%-300px)]" : "w-full" }`}>
            <img
                className="h-96"
                src={image}
                alt="404"
            />
            <p className='text-[--primary-color] font-bold text-xl'>Page doesn't exist</p>
            <button
                className='bg-[--primary-color] text-[--secondary-color] text-sm px-6 py-2 rounded-lg mt-4 transition-all hover:bg-transparent hover:text-[--primary] border-2 border-[--primary-color]'
                onClick={() => navigate("/")}
            >Go Back To Home</button>
        </div>
    )
}

export default PageNotFound
