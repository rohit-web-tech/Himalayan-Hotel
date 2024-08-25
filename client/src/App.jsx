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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/userprofile" element={<MyOrders />} />
        </Route>
        <Route element={<AuthenticationRoutes/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
      <NewsLetter />
      <Footer />
    </BrowserRouter>
  )
}

export default App;
