import React, { useEffect, useState } from 'react'
import './style.scss';
import DateSelector from '../../components/DateSelector/DateSelector';
import Room from './rooms/Room';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import moment from 'moment';
import NoData from '../../components/NoData';
import { useNavigate } from 'react-router-dom';
const Booking = () => {
  const [rooms, setRooms] = useState([]);
  const [roomSearch, setRoomSearch] = useState("");
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Dates, setDates] = useState({
    "fromDate": "",
    "toDate": ""
  });

  const navigate = useNavigate();

  const handleFilterByDate = (dates) => {
    setDates({
      "fromDate": !dates ? "" : moment(dates[0]?.format("DD-MMM-YYYY"))._i,
      "toDate": !dates ? "" : moment(dates[1]?.format("DD-MMM-YYYY"))._i
    })
    
    let fromDate = moment(dates[0]?.format("DD-MMM-YYYY"))._i;
    let toDate = moment(dates[1]?.format("DD-MMM-YYYY"))._i;

    setTimeout(() => {
      if (Dates.fromDate !== "" && Dates.toDate !== "") {
        let tempRooms = [];
        for (const room of duplicateRooms) {
          let availability = false;
          if (room?.currentBookings?.length > 0) {
            for (const booking of room?.currentBookings) {
              if (
                !moment(fromDate).isBetween(booking?.fromDate, booking?.toDate) &&
                !moment(toDate).isBetween(booking?.fromDate, booking?.toDate) &&
                !moment(booking?.fromDate).isBetween(fromDate, toDate) &&
                !moment(booking?.toDate).isBetween(fromDate, toDate)
              ) {
                if (
                  fromDate !== booking?.fromDate &&
                  fromDate !== booking?.toDate &&
                  toDate !== booking?.fromDate &&
                  toDate !== booking?.toDate
                ) {
                  availability = true;
                } else {
                  availability = false;
                }
              } else {
                availability = false;
              }
            }
          }
          if (availability || room?.currentBookings?.length == 0) {
            tempRooms.push(room);
          }
          setRooms(tempRooms);
        }
      } else {
        setRooms(duplicateRooms);
      }
    }, 100)
  }


  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    setLoading(true);
    fetch(`${BASE_URL}/getRooms`)
      .then(res => res.json())
      .then(res => {
        setRooms(res);
        setDuplicateRooms(res);
      })
      .catch(err => console.log(err))
      .finally(()=>setLoading(false))
  }, [])

  let handleRoomSearch = (e) => {
    setRoomSearch(() => e.target.value);
  }

  function Skeleton() {
    return (
      <div className="card-container">
        <div className="skeleton-image skeleton"></div>
        <div className="room-description">
          <div className="room-name skeleton"></div>
          <div className="room-subtitles skeleton"></div>
          <div className="room-price-and-maxcount">
            <div className="room-price skeleton"></div>
            <div className="max-count skeleton"></div>
          </div>
        </div>
        <div className="room-btns">
          <div className="btn skeleton"></div>
          <div className="btn skeleton"></div>
        </div>
      </div>
    )
  }

  return (
    <div id="booking-page">
      <ContentWrapper>
        <div className="header">
          <DateSelector handleFilterByDate={handleFilterByDate} />
          <input placeholder='Search for a specific room' type="text" name="room-name" id="room-name" class="input-box shadow" onChange={handleRoomSearch} value={roomSearch} />
        </div>
        <div className="room-section">
          {
            loading ?
              (
                <>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </>
              ) : rooms?.length < 1 ? (
                <NoData 
                  title="No room available"
                  btnText='Go back to home'
                  btnHandler={()=>navigate("/")}
                />
              ): (
                rooms.length >= 1 && rooms?.filter(item => item?.roomName?.toLowerCase().includes(roomSearch?.toLowerCase()))
                  .length < 1 ? (
                  <NoData 
                   title={`No room found for ${roomSearch}`}
                   btnHandler={()=>setRoomSearch("")}
                   btnText="Show All Rooms"
                  />
                ) :
                  rooms?.filter(item => item?.roomName?.toLowerCase()?.includes(roomSearch.toLowerCase()))
                    .map(room => (
                      <Room dates={Dates} room={room} key={room.room_id} roomId={room.room_id} />
                    ))
              )
          }
        </div>
      </ContentWrapper>
    </div>
  )
}

export default Booking
