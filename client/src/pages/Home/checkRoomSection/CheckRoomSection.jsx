import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { FaArrowRight } from "react-icons/fa";

const CheckRoomSection =()=>{

    const [checkInDate,setCheckInDate] = useState("");
    const [checkOutDate,setCheckOutDate] = useState("");

    const getTodayDate =()=>{
        const date = new Date();
        return `${date.getFullYear()}-${(date.getMonth()+1<10)?"0"+(date.getMonth()+1):date.getMonth()+1}-${(date.getDate()<10)?"0"+date.getDate():date.getDate()}` ;
    }

    const setCheckOut = (e) =>{
        if(checkInDate){
            console.log(checkInDate)
            setCheckOutDate(e.target.value);
        }else{
            alert("Please enter checkIn Date first!!");
            setCheckOutDate("");
        }
    }

    return(
        <div className="w-full h-auto mt-5">
            <ContentWrapper>
                <div className="w-full  rounded-xl height-auto my-2 shadow-sm shadow-[var(--primary-color)] bg-[--primary-color] py-4 px-2 flex justify-between items-center flex-wrap gap-4">
                    <div className="flex gap-1 items-center w-full sm:w-auto">
                        <label htmlFor="check in" className="w-[90px] sm:w-auto text-[--secondary-color]">Check In : </label>
                        <input type="date" name="check-in" value={checkInDate} onChange={(e)=>{setCheckInDate(e.target.value)}} min={getTodayDate()} id="check-in" className=" w-[80%] sm:w-auto sm:gap- rounded-sm border-2 border-[--secondary-color] text-[--primary-color]" placeholder="Check In"/>
                    </div>
                    <div className="flex gap-1 items-center w-full sm:w-auto">
                        <label htmlFor="check in" className="w-[90px] sm:w-auto text-[--secondary-color]">Check Out : </label>
                        <input type="date" min={checkInDate} value={checkOutDate} onClick={setCheckOut} onChange={setCheckOut} name="check-in" id="check-in" className= "w-[80%] sm:w-auto rounded-sm border-2 border-[--secondary-color] text-[--primary-color]" placeholder="Check In"/>
                    </div>
                    <button className=" rounded-sm bg-[--secondary-color] sm:w-auto w-full flex items-center justify-center gap-1 px-2 py-1">Check Availability<FaArrowRight/></button>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default CheckRoomSection ;