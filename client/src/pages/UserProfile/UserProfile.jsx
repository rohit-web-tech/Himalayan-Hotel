import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../lib/fetchData";
import { message } from "antd";
import { login } from "../../store/slice/user.slice.js";

const UserProfile = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const loggedInUser = useSelector(state => state?.user?.user) || { name: "Guest" };
  const [isEditing, setIsEditing] = useState(false);

  useEffect(()=>{
    setFormData(loggedInUser);
  },[loggedInUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const res = await fetchData("/user/updateMyInfo",()=>{},"PATCH",{name:formData?.name,contactNumber:formData?.contactNumber});
    if(!res?.success){
      return message.warning(res?.message || "Something went wrong while updating your profile !!");
    }
    dispatch(login(res?.data || {}));
    message.success("Profile updated successfully !!");
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-center flex-col bg-gray-100 px-6 py-12 mt-6 relative">
      <button
        type="button"
        className="absolute left-2 top-2 text-[--primary-color] hover:text-gray-600 text-2xl font-bold"
        onClick={() => navigate("/profile")}
      >
        <FaArrowLeft />
      </button>
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h1>
        <form>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border ${isEditing ? "border-gray-300" : "border-gray-200 bg-gray-100"
                } rounded-lg focus:outline-none focus:ring-2 ${isEditing ? "focus:ring-blue-500" : ""
                }`}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData?.email}
              disabled
              className="w-full px-4 py-2 border border-gray-200 bg-gray-100 rounded-lg focus:outline-none"
            />
          </div>

          {/* Contact */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Contact
            </label>
            <input
              type="text"
              name="contactNumber"
              value={formData?.contactNumber}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border ${isEditing ? "border-gray-300" : "border-gray-200 bg-gray-100"
                } rounded-lg focus:outline-none focus:ring-2 ${isEditing ? "focus:ring-blue-500" : ""
                }`}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-[--primary-color] text-white rounded-lg hover:bg-black"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;