import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import AdminProfileEdit from '../components/EditProfile';
import Admins from '../Pages/Admins';
import Users from '../Pages/Users';
import Rooms from '../Pages/Rooms';
import Newsletters from '../Pages/Newsletters';
import Bookings from '../Pages/Bookings';
import Inventory from '../Pages/Inventory';
import Earnings from '../Pages/Earnings';
import Queries from '../Pages/Queries';
import { useSelector } from 'react-redux';
import BookingDetails from '../Pages/BookingDetails';
import RoomInventory from '../Pages/RoomInventory';
import Home from '../Pages/Home';
import About from '../Pages/About';
import Contact from '../Pages/Contact';

const MainLayout = () => {
    const auth = useSelector((state:any) => state?.user?.isLoggedIn) ;
    return !auth ? <Navigate to="/login" /> : (
        <div className="h-screen flex bg-secondary-bg relative">
            <SideBar />
            <div
                className={`flex-1 h-screen overflow-y-auto transition-all duration-300 ease-in-out`}
            >
                <Header />
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<AdminProfileEdit />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/admins" element={<Admins />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/newsletter" element={<Newsletters />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/earnings" element={<Earnings />} />
                    <Route path="/queries" element={<Queries />} />
                    <Route path="/booking-details" element={<BookingDetails />} />
                    <Route path="/room-inventory" element={<RoomInventory />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    {/* <Route path="/bookings" element={} /> */}
                </Routes>
            </div>
        </div>

    )
}

export default MainLayout;
