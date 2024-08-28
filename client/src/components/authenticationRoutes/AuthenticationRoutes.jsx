import React from 'react'
import { Navigate , Outlet} from 'react-router-dom';

const AuthenticationRoutes = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("akhoteluser"));
  const auth = loggedInUser ? true : false ;
  return auth ? <Navigate to="/" /> : <Outlet/>
}

export default AuthenticationRoutes
