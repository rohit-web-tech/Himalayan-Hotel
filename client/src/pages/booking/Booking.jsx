import React, { useDebugValue, useEffect, useState } from 'react'
import './style.scss';
import DateSelector from '../../components/DateSelector/DateSelector';
import Room from './rooms/Room';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import moment from 'moment';
import NoData from '../../components/NoData';
import { useNavigate } from 'react-router-dom';
import { fetchData, fetchGetData } from '../../lib/fetchData';
const Booking = () => {
  const [rooms, setRooms] = useState([]);
  const [roomSearch, setRoomSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [Dates, setDates] = useState({
    "fromDate": "",
    "toDate": ""
  });

  const navigate = useNavigate();

  const handleFilterByDate = async (dates) => {

    setDates({
      "fromDate": !dates ? "" : moment(dates[0]?.format("DD-MMM-YYYY"))._i,
      "toDate": !dates ? "" : moment(dates[1]?.format("DD-MMM-YYYY"))._i
    })

  }

  useEffect(() => {
    const fetchRooms = async () => {
        const res = await fetchData("/room/filterByDate", setLoading, "POST", {
          fromDate: Dates.fromDate,
          toDate: Dates.toDate
        });
        if (res?.success) {
          setRooms(res?.data || []);
        }
    };
    
    fetchRooms();
  }, [Dates]);


  useEffect(() => {
    (async () => {
      const res = await fetchGetData(`/room`, setLoading);
      if (res?.success) {
        console.log(res?.data)
        setRooms(res?.data);
      }
    })()
  }, []);

  useEffect(() => {
    const getData = setTimeout(() => {
      (async () => {
        const res = await fetchData("/room/filterByQuery",setLoading,"POST",{query:roomSearch,...Dates});
        if(res?.success){
          setRooms(res?.data||[])
        }
      })();   
    }, 600)
    return () => clearTimeout(getData);
  }, [roomSearch]);

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
                  btnHandler={() => navigate("/")}
                />
              ) : (
                rooms?.map(room => (
                  <Room dates={Dates} room={room} key={room._id} roomId={room._id} />
                ))
              )
          }
        </div>
      </ContentWrapper>
    </div>
  )
}

export default Booking
