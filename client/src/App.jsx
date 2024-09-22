import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import NewsLetter from "./components/newsletter/NewsLetters";
import Footer from "./components/footer/Footer";
import AboutUsPage from "./pages/About/AboutUsPage";
import ContactPage from "./pages/Contact/Contact";
import Booking from "./pages/booking/Booking";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import AuthenticationRoutes from "./components/authenticationRoutes/AuthenticationRoutes";
import MyOrders from "./pages/myorders/MyOrders";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import PageNotFound from "./components/404/PageNotFound";
import VerifyEmail from "./components/VerifyEmail";
import { useEffect, useState } from "react";
import { fetchGetData } from "./lib/fetchData";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/slice/user.slice";
import Loader from "./components/loader";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (
      async () => {
        const res = await fetchGetData("/user/currentUser", setLoading);
        console.log(res)
        if (res?.success) {
          dispatch(login(res?.data));
        } else {
          dispatch(logout());
        }
      }
    )();
  }, [])

  return (
    <BrowserRouter>
      {
        loading ? (
          <Loader 
            styles="my-[45vh] h-10 w-10"
          />
        ) : (
          <>
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Home/>} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/userprofile" element={<MyOrders />} />
              </Route>
              <Route element={<AuthenticationRoutes />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
              <Route path="/verifyEmail/:token" element={<VerifyEmail />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <NewsLetter />
            <Footer />
          </>
        )
      }
    </BrowserRouter>
  )
}

export default App;
