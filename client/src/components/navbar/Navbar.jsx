import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import Img from "../lazyloading/Img";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { FaLocationDot, FaXTwitter } from "react-icons/fa6";
import { IoMdLogIn, IoMdClose } from "react-icons/io";
import {
  FaPhoneAlt,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaBars
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import NavBtn from "./NavBtn";

const Navbar = () => {
  const [showSideNav, setShowSideNav] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [data, setData] = useState({
    contact: "",
    email: "",
    address: "",
    imageUrl: ""
  })

  const getData = async () => {
    fetch(`${BASE_URL}/getContact`)
      .then(res => res.json())
      .then(res => {
        if (res.message == "success") {
          setData(res?.contact || {
            contact: "",
            email: "",
            address: "",
            imageUrl: ""
          });
        }
      }).catch(err => console.log(err));
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <div className="flex flex-col w-full sticky top-0 z-50">
      <div className="w-100 h-auto bg-[--primary-color] py-2 border-b-[1px] border-[--secondary-color] block">
        <ContentWrapper>
          <div className="flex  flex-col items-center gap-2 justify-between sm:flex-row sm:gap-0">
            <div className="flex flex-wrap items-center justify-center sm:flex md:gap-7 gap-3">
              <a href={`tel:8580760230`} className="flex items-center gap-1 hover:cursor-pointer hover:text-white">
                <FaPhoneAlt className="text-[--secondary-color]" />
                <p className="text-gray-400 text-xs">+91-{data?.contact || "85807-60230"}</p>
              </a>
              <a href={`mailto:${data?.email || "rohitdogra0127@gmail.com"}`} className="flex items-center gap-1 hover:cursor-pointer hover:text-white">
                <MdEmail className="text-[--secondary-color]" />
                <p className="text-gray-400 text-xs">
                  {data?.email || "contact@himalayanhotel.com"}
                </p>
              </a>
              <div className="hidden items-center gap-1 hover:cursor-pointer hover:text-white sm:flex">
                <FaLocationDot className="text-[--secondary-color]" />
                <p className="text-gray-400 text-xs">
                  {data?.address || "Palampur, HP, India"}
                </p>
              </div>
            </div>
            <div className="sm:flex hidden items-center gap-4 text-[--secondary-color] md:gap-4 sm:gap-2">
              <a href="https://instagram.com/rohit_web_tech" target="_blank"><FaInstagram className="hover:cursor-pointer hover:text-white" /></a>
              <a href="https://www.linkedin.com/in/rohit-6095b3254/" target="_blank"><FaLinkedinIn className="hover:cursor-pointer hover:text-white" /></a>
              <a href="https://x.com/RohitWebTe68737" target="_blank"><FaXTwitter className="hover:cursor-pointer hover:text-white" /></a>
              <a href="https://www.facebook.com/profile.php?id=61557886149537" target="_blank">
                <FaFacebookF className="hover:cursor-pointer hover:text-white" /></a>
            </div>
          </div>
        </ContentWrapper>
      </div>
      <div className="w-100 h-auto bg-[--primary-color] py-2 relative">
        <ContentWrapper>
          <div className="w-100 flex justify-between items-center">
            <div onClick={() => { navigate('/') }} className="hover:cursor-pointer" title="Himalayan Hotel">
              <Img src={logo} className="h-10" />
            </div>
            <ul className="hidden items-center gap-6 text-sm text-[--secondary-color] cursor-pointer sm:flex">
              <li className="hover:cursor-pointer hover:text-white">
                <NavBtn to="/">Home</NavBtn>
              </li>
              <li className="hover:cursor-pointer hover:text-white">
                <NavBtn to="/booking">Book Room</NavBtn>
              </li>
              <li className="hover:cursor-pointer hover:text-white">
                <NavBtn to="/about">About Us</NavBtn>
              </li>
              <li className="hover:cursor-pointer hover:text-white">
                <NavBtn to="/contact">Contact Us</NavBtn>
              </li>
            </ul>
            <div className="flex items-center gap-3">
              <IoMdLogIn onClick={() => { navigate("/userprofile") }} className="text-[--secondary-color] text-[32px] sm:block hidden" />
              {
                showSideNav ? (
                  <IoMdClose
                    onClick={() => {
                      setShowSideNav(false);
                    }}
                    className="sm:hidden block text-[--secondary-color] text-[32px]"
                  />
                ) : (
                  <FaBars
                    onClick={() => {
                      setShowSideNav(true);
                    }}
                    className="sm:hidden block text-[--secondary-color] text-[32px]"
                  />
                )
              }
            </div>
          </div>
          {
            showSideNav && (
              <ul className="fixed left-0 flex-col z-80 bg-[--primary-color] flex w-full flex-wrap mt-2 border-[--secondary-color] border-t items-center justify-between gap-4 text-sm text-[--secondary-color] cursor-pointer sm:hidden py-3">
                <li className="hover:cursor-pointer hover:text-white" onClick={() => setShowSideNav(false)}>
                  <NavBtn to="/">Home</NavBtn>
                </li>
                <li className="hover:cursor-pointer hover:text-white" onClick={() => setShowSideNav(false)}>
                  <NavBtn to="/booking">Book Room</NavBtn>
                </li>
                <li className="hover:cursor-pointer hover:text-white" onClick={() => setShowSideNav(false)}>
                  <NavBtn to="/about">About Us</NavBtn>
                </li>
                <li className="hover:cursor-pointer hover:text-white" onClick={() => setShowSideNav(false)}>
                  <NavBtn to="/contact">Contact Us</NavBtn>
                </li>
                <li className="hover:cursor-pointer hover:text-white" onClick={() => setShowSideNav(false)}>
                  <NavBtn to="/userprofile">My Bookings</NavBtn>
                </li>
              </ul>
            )
          }
        </ContentWrapper>
      </div>
    </div>
  );
};

export default Navbar;
