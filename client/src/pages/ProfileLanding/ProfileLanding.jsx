import React from "react";
import { FaUserCircle, FaBook, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfileLandingPage = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logged out");
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center py-10 mt-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Welcome, User!</h1>
                <p className="text-gray-600 text-base mt-2">Manage your account and bookings</p>
            </div>

            {/* Boxes Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-4">
                {/* Profile Details Box */}
                <div
                    className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all cursor-pointer"
                    onClick={() => { navigate("/profile/user") }}
                >                    <div className="flex items-center justify-center text-blue-500 text-4xl mb-4">
                        <FaUserCircle />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 text-center">Profile Details</h2>
                    <p className="text-gray-600 text-center mt-2 text-sm">View and update your personal information.</p>
                </div>

                {/* My Bookings Box */}
                <div
                    className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all cursor-pointer"
                    onClick={() => { navigate("/profile/bookings") }}
                >
                    <div className="flex items-center justify-center text-green-500 text-4xl mb-4">
                        <FaBook />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 text-center">My Bookings</h2>
                    <p className="text-gray-600 text-center mt-2 text-sm">Check your booking history and status.</p>
                </div>

                {/* Logout Box */}
                <div
                    onClick={handleLogout}
                    className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all cursor-pointer"
                >
                    <div className="flex items-center justify-center text-red-500 text-4xl mb-4">
                        <FaSignOutAlt />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 text-center">Logout</h2>
                    <p className="text-gray-600 text-center mt-2 text-sm">Sign out of your account safely.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileLandingPage;