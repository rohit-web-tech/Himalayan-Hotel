import { useEffect, useState } from "react";
import "./style.css";
import logo from "../../assets/logo.png";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { FaLocationDot, FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchGetData } from "../../lib/fetchData";
import { MdEmail } from "react-icons/md";

export default function Footer() {

  const [data, setData] = useState({
    contact: "",
    email: "",
    address: "",
    imageUrl: ""
  })

  const getData = async () => {
    const res = await fetchGetData(`/contact`)
    if (res?.success) {
      setData(res?.data || {
        contact: "",
        email: "",
        address: "",
        imageUrl: ""
      });
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div
      id="footer"
      className="flex-box justify-center align-center flex-column bg-[--primary-color] text-[--secondary-color] border-t-2 border-[--secondary-color]"
    >
      <ContentWrapper>
        <div className="footer">
          <div className="footer-contact">
            <div className="logo-footer">
              <Link to="/">
                <img src={logo} alt="Himalayan Hotel" className="h-12" />
              </Link>
            </div>
            <div className="contact">
              <h4 className="heading">Contact</h4>
              <div className="contact-details flex-box justify-center flex-column gap-2">
                <a href={`tel:8580760230`} className="flex items-center gap-1 hover:cursor-pointer hover:text-white">
                  <FaPhoneAlt className="text-[--secondary-color]" />
                  <p className="text-gray-400 text-xs">{" "}+91-{data?.contact || "85807-60230"}</p>
                </a>
                <a href={`mailto:${data?.email || "rohitdogra0127@gmail.com"}`} className="flex items-center gap-1 hover:cursor-pointer hover:text-white">
                  <MdEmail className="text-[--secondary-color]" />
                  <p className="text-gray-400 text-xs">
                    {" "}
                    {data?.email || "contact@himalayanhotel.com"}
                  </p>
                </a>
                <div className="flex items-center gap-1 hover:cursor-pointer hover:text-white">
                  <FaLocationDot className="text-[--secondary-color]" />
                  <p className="text-gray-400 text-xs">
                    {" "}
                    {data?.address || "Palampur, HP, India"}
                  </p>
                </div>
              </div>
            </div>
            <div className="social-media">
              <h4 className="heading">Follow Us</h4>
              <div className="brands-logo flex-box align-center">
                <a href="https://instagram.com/rohit_web_tech" target="_blank"><FaInstagram className="hover:cursor-pointer hover:text-white" /></a>
                <a href="https://www.linkedin.com/in/rohit-6095b3254/" target="_blank"><FaLinkedinIn className="hover:cursor-pointer hover:text-white" /></a>
                <a href="https://x.com/RohitWebTe68737" target="_blank"><FaXTwitter className="hover:cursor-pointer hover:text-white" /></a>
                <a href="https://www.facebook.com/profile.php?id=61557886149537" target="_blank">
                  <FaFacebookF className="hover:cursor-pointer hover:text-white" /></a>
              </div>
            </div>
          </div>
          <div className="footer-user-options">
            <div className="about">
              <h4 className="heading">About</h4>
              <div className="user-options flex-box flex-column">
                <Link className="details-footer" to="/about">About Us</Link>
                <Link className="details-footer" to="/contact">Contact Us</Link>
                <Link className="details-footer" to="/policy">Privacy Policy</Link>
                <Link className="details-footer" to="/t&c">Terms & Conditions</Link>
              </div>
            </div>
            <div className="my-account">
              <h4 className="heading">My Account</h4>
              <div className="user-options flex-box flex-column">
                <Link className="details-footer" to="/login">Sign In</Link>
                <Link className="details-footer" to="/userProfile">My Bookings</Link>
                <Link className="details-footer" to="/userProfile">Track My Booking</Link>
                <Link className="details-footer" to="/help">Help</Link>
              </div>
            </div>
          </div>
        </div>
        <h4 className="text-[16px] text-center">
          &copy; Himalayan Hotel || All Rights Reserved:2024
        </h4>
      </ContentWrapper>
    </div>
  );
}
