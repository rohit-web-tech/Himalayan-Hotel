import React, { useState } from 'react' ;
import Img from './lazyloading/Img.jsx' ;
import Image from '../assets/verifyEmail.jpg' ;
import { useNavigate, useParams } from 'react-router-dom';
import {fetchData} from '../lib/fetchData.js'
import { message } from 'antd';
import Loader from "./loader.jsx";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const {token} = useParams();
    const [loading,setLoading] = useState(false);

    const verifyBtnHandler = async(e) => {

        const res = await fetchData("/user/verifyEmail",setLoading,"POST",{token});

        if(res?.success){
            message.success("Email verified successfully !!") ;
            setTimeout(()=>{
                navigate("/login");
            },500)
        }else{
            message.error(res?.message);
        }

    }

    return (
        <div className="flex flex-col items-center justify-center mb-6">
            <Img
                src={Image}
                alt="No Data"
                className="h-96"
            />
            <p className='text-[--primary-color] font-bold text-xl'>
                Please verify your email address to proceed.
            </p>
            <button
                className='bg-[--primary-color] text-[--secondary-color] text-sm px-6 py-2 rounded-lg mt-4 transition-all hover:bg-transparent hover:text-[--primary] border-2 border-[--primary-color]'
                onClick={verifyBtnHandler}
            >
                {loading ? <Loader styles='h-4 w-4' /> : "Verify Email"}
            </button>
        </div>
    )
}

export default VerifyEmail
