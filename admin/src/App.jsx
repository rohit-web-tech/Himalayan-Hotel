import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/login";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
import AuthenticationRoutes from "./components/authenticationRoutes/AuthenticationRoutes";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import PageNotFound from "./components/404/PageNotFound";
import Landing from "./components/Landing";
import User from "./components/User";
import Admin from "./components/Admins";
import Rooms from "./components/Rooms";
import Home from "./components/form/HomeForm";
import About from "./components/form/AboutForm";
import Contact from "./components/form/ContactForm";
import Bookings from "./components/Bookings";
import { useDispatch } from "react-redux";
import Loader from "./components/loader";
import {login, logout} from "./store/slice/user.js" ;
import { useEffect, useState } from "react";
import { fetchGetData } from "./lib/fetchData.js";
 
function App() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (
      async () => {
        const res = await fetchGetData("/user/currentUser",setLoading);
        if (res?.success && res?.data?.isAdmin) {
          dispatch(login(res?.data));
        } else {
          dispatch(logout());
        }
      }
    )();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {
        loading ? (
          <Loader styles="my-[45vh] h-10 w-10" />
        ) : (
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Landing />} />
              <Route path="/users" element={<User />} />
              <Route path="/admins" element={<Admin />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/*" element={<PageNotFound type="login" />} />
            </Route>
            <Route element={<AuthenticationRoutes />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )
      }
    </BrowserRouter>
  )
}

export default App;
