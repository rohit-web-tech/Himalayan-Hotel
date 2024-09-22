import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { useSelector } from "react-redux" ;

const ProtectedRoutes = () => {
    const auth = useSelector(state => state?.user?.isLoggedIn) ;
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