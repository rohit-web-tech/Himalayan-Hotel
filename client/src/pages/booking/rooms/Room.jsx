import React, { useState } from 'react'
import "./style.scss";
import Img from '../../../components/lazyloading/Img';
import { message } from "antd"
import { RiStarSFill } from "react-icons/ri";
import RoomDetails from '../../roomdetails/RoomDetails';
import BookRoom from '../../bookRoom/BookRoom';
import { fetchData } from '../../../lib/fetchData';
import { useNavigate } from 'react-router-dom';


const Room = (props) => {
    const [bookingLoading, setBookingLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showBookRoom, setShowBookRoom] = useState(false);
    const navigate = useNavigate();
    const handleBook = (roomId) => {
        const fromDate = props.dates.fromDate, toDate = props.dates.toDate;
        if (fromDate == "" && toDate == "") {
            message.warning("Please select date first to book room!!");
        } else {
            setShowDetails(false);
            setShowBookRoom(true);
        }
    }
    const handleBookRoom = async (roomId) => {
        const fromDate = props.dates.fromDate, toDate = props.dates.toDate;
        const res = await fetchData(`/booking`, setBookingLoading, "POST", { fromDate, toDate, roomId })
        if (res?.success) {
            message.success("Room Booked Successfully!!");
            navigate("/userprofile");
        } else {
            message.error(res.message)
        }
    }
    return (
        <div id="room-container">
            <div className="room-image">
                <Img src={props?.room?.imageUrl} />
            </div>
            <div className="room-description">
                <div className="room-name">
                    <p>{props?.room?.roomName}</p>
                </div>
                <div className="stars text-[25px] text-[gold] flex items-center">
                    <RiStarSFill />
                    <RiStarSFill />
                    <RiStarSFill />
                    <RiStarSFill />
                    <RiStarSFill />
                </div>
                <div className="room-price-and-maxcount">
                    <div className="room-price">
                        <p>Rent : {props?.room?.rent}rs/Night</p>
                    </div>
                    <div className="max-count">
                        <p>Available Rooms : {props?.room?.totalRooms}</p>
                    </div>
                </div>
            </div>
            <div className="room-btns">
                <button className="book-now btn" onClick={() => { handleBook(props?.roomId) }}>
                    Book Now
                </button>
                <button className="see-details btn" onClick={() => { setShowDetails(true) }}>
                    See Details
                </button>
            </div>
            {
                showDetails && <RoomDetails handleBook={handleBook} roomId={props?.roomId} setShowDetails={setShowDetails} roomDetails={props?.room} />
            }
            {
                showBookRoom && <BookRoom loading={bookingLoading} roomId={props?.roomId} handleBookRoom={handleBookRoom} dates={props?.dates} setShowBookRoom={setShowBookRoom} roomDetails={props?.room} />
            }
        </div>
    )
}

export default Room
