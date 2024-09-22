import React from 'react'
import { Navigate , Outlet} from 'react-router-dom';
import {useSelector} from "react-redux" ;

const AuthenticationRoutes = () => {
  const auth = useSelector((state)=>state?.user?.isLoggedIn) ? true : false ;
  return auth ? <Navigate to="/" /> : <Outlet/>
}

export default AuthenticationRoutes
