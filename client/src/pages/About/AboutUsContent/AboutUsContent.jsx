import {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyloading/Img";
export default function About({ src, showBtn,data }) {
  const navigate = useNavigate();
  return (
    <div
      id="element-card"
      className="flex justify-center aling-center mt-8 "
    >
      <ContentWrapper>
        <div className="element-card">
          <div className="image flex-box justify-center align-center bg-gray-600">
            <Img src={data?.imageUrl || src} className="h-96" />
          </div>
          <div className="element-content flex-box justify-center flex-column">
            <h1 className=" text-[--primary-color]">
              { data?.title || "Welcome to Himalayan Hotel"}
            </h1>
            <p className="about-us text-gray-600 text-sm">
              {data?.description ||`The Himalayas, a majestic mountain range cradling Palampur,
              redefine awe-inspiring beauty. Towering peaks draped in snow,
              serene valleys dotted with vibrant flora, and crystal-clear rivers
              flowing through lush forests compose a landscape that whispers
              both tranquility and grandeur. The play of light and shadow on
              these ancient peaks creates a canvas that evolves with each
              passing moment, offering a spectacle that words can scarcely
              capture. The Himalayas aren't just mountains; they're a symphony
              of nature's marvels, an embodiment of peace, and an invitation to
              explore the divine beauty woven into the fabric of the Earth....`}
            </p>
            {
              showBtn && <button onClick={() => { navigate("/about") }} className="bg-[--primary-color] py-2 px-4 text-[--secondary-color] rounded-md text-md mt-5 border-[--primary-color] border-2 hover:cursor-pointer hover:text-[--primary-color] hover:bg-transparent duration-100 text-sm">Continue Reading</button>

            }
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}
