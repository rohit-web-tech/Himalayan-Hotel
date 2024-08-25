import React from "react";
import "./style.css";
import logo from "../../assets/logo.png";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Footer() {
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
              <div className="contact-details flex-box justify-center flex-column">
                <p className="details-footer">
                  <span className="bold">Address: </span>Palampur, Himachal Pradesh, India
                </p>
                <p className="details-footer">
                  <span className="bold">Phone: </span>+91-99999-000000
                </p>
                <p className="details-footer">
                  <span className="bold">Hours: </span>24 X 7
                </p>
              </div>
            </div>
            <div className="social-media">
              <h4 className="heading">Follow Us</h4>
              <div className="brands-logo flex-box align-center">
                <FaInstagram className="hover:cursor-pointer hover:text-white" />
                <FaLinkedinIn className="hover:cursor-pointer hover:text-white" />
                <FaXTwitter className="hover:cursor-pointer hover:text-white" />
                <FaFacebookF className="hover:cursor-pointer hover:text-white" />
              </div>
            </div>
          </div>
          <div className="footer-user-options">
            <div className="about">
              <h4 className="heading">About</h4>
              <div className="user-options flex-box flex-column">
                <p className="details-footer">About Us</p>
                <p className="details-footer">Contact Us</p>
                <p className="details-footer">Privacy Policy</p>
                <p className="details-footer">Terms & Conditions</p>
              </div>
            </div>
            <div className="my-account">
              <h4 className="heading">My Account</h4>
              <div className="user-options flex-box flex-column">
                <p className="details-footer">Sign In</p>
                <p className="details-footer">View Cart</p>
                <p className="details-footer">Track My Order</p>
                <p className="details-footer">Help</p>
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
