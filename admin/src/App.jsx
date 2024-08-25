import {BrowserRouter,Routes,Route} from "react-router-dom" ;
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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/" element={<Landing />} />
          <Route path="/users" element={<User/>} />
          <Route path="/admins" element={<Admin/>} />
          <Route path="/bookings" element={<Bookings/>} />
          <Route path="/rooms" element={<Rooms/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/*" element={<PageNotFound type="login"/>} />
        </Route>
        <Route element={<AuthenticationRoutes/>}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
