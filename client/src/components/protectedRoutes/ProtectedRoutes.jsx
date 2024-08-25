import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("akhoteluser"));
    const auth = loggedInUser ? true : false ;
    return (!auth ? <Navigate to="/login" /> : <Outlet />);
}
export default ProtectedRoutes;