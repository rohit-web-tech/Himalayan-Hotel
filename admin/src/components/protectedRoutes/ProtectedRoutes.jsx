import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const ProtectedRoutes = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("akhoteladmin"));
    const auth = loggedInUser ? true : false;
    return (
        !auth ? <Navigate to="/login" /> : (
            <div className='flex items-start'>
                <Navbar />
                <div className='md:w-[300px]'></div>
                <Outlet />
            </div>
        )
    );
}
export default ProtectedRoutes;