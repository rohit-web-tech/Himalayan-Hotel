import React from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import image from "../../../assets/herobanner.jpg";

const Achievements = () => {
  return (
    <div className="w-full mt-4 relative flex items-center justify-center py-10">
      <img src={image} className="w-full h-full opacity-50 object-cover object-center absolute" />
      <ContentWrapper className="w-full h-full flex items-center flex-wrap z-20 gap-4 justify-between ssm-center ">
        <div className="flex flex-col justify-center items-center">
            <div className="font-bold text-[22px] text-[--primary-color] sm:text-[30px]">2K+</div>
            <div className="text-[20px] border-t-4 border-[--primary-color] text-[--primary-color] sm:text-[28px] w-[150px] sm:w-[230px] text-center">Happy Customers</div>
        </div>
        <div className="flex flex-col justify-center items-center">
            <div className="font-bold text-[22px] text-[--primary-color] sm:text-[30px]">25</div>
            <div className="text-[20px] border-t-4 border-[--primary-color] text-[--primary-color] sm:text-[28px] w-[150px] sm:w-[230px] text-center">Years Completed</div>
        </div>
        <div className="flex flex-col justify-center items-center">
            <div className="font-bold text-[22px] text-[--primary-color] sm:text-[30px]">50+</div>
            <div className="text-[20px] border-t-4 border-[--primary-color] text-[--primary-color] sm:text-[28px] w-[150px] sm:w-[230px] text-center">Premium Rooms</div>
        </div>
        <div className="flex flex-col justify-center items-center">
            <div className="font-bold text-[22px] text-[--primary-color] sm:text-[30px]">5</div>
            <div className="text-[20px] border-t-4 border-[--primary-color] text-[--primary-color] sm:text-[28px] w-[150px] sm:w-[230px] text-center">Star Services</div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Achievements;
