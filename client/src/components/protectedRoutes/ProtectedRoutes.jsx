import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const auth = useSelector((state)=>state?.user?.isLoggedIn) ? true : false ;
    return (!auth ? <Navigate to="/login" /> : <Outlet />);
}
export default ProtectedRoutes;