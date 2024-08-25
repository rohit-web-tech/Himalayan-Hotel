import React from 'react'
import NavBtn from './NavBtn.jsx'
import {useNavigate} from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate() ;
    return (
        <div className='w-[300px] bg-gray-700 text-white h-screen flex flex-col items-center justify-between py-6'>
            <div onClick={()=>navigate("/")}>
                <h1 className='text-xl font-bold hover:cursor-pointer'>Admin Panel</h1>
                <p className='text-xs text-gray-200 text-center'>Himalayan Hotel</p>
            </div>
            <ul className='flex flex-col items-center justify-between gap-2'>
                <li>
                    <NavBtn
                        to="/users"
                    >Users</NavBtn>
                </li>
                <li>
                    <NavBtn
                        to="/admins"
                    >Admins</NavBtn>
                </li>
                <li>
                    <NavBtn
                        to="/bookings"
                    >Bookings</NavBtn>
                </li>
                <li>
                    <NavBtn
                        to="/rooms"
                    >Rooms</NavBtn>
                </li>
                <li>
                    <NavBtn
                        to="/home"
                    >Home</NavBtn>
                </li>
                <li>
                    <NavBtn
                        to="/about"
                    >About Us</NavBtn>
                </li>
                <li>
                    <NavBtn
                        to="/contact"
                    >Contact Us</NavBtn>
                </li>
            </ul>
            <div className='bg-red-600 py-1 hover:bg-red-800 hover:cursor-pointer w-44 text-sm rounded-md text-center'
                onClick={()=>{
                    localStorage.removeItem('akhoteladmin');
                    navigate("/login");
                }}
            >
                Logout
            </div>
        </div>
    )
}

export default Navbar
