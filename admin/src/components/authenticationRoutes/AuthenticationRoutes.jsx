import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate , Outlet} from 'react-router-dom';

const AuthenticationRoutes = () => {
  const auth = useSelector(state => state?.user?.isLoggedIn) ;
  return auth ? <Navigate to="/" /> : <Outlet/>
}

export default AuthenticationRoutes