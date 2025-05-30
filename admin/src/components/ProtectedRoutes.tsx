import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux" ;

const ProtectedRoutes = () => {
    const auth = useSelector((state : any) => state?.user?.isLoggedIn) ;
    return (
        !auth ? <Navigate to="/login" /> : ( <Outlet />)
    );
}
export default ProtectedRoutes;