import './style.css';
import Img from '../../../components/lazyloading/Img';
import image from '../../../assets/herobanner.jpg'
import { FaLocationDot} from "react-icons/fa6";
import {
  FaPhoneAlt
} from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

export default function Location({data}) {
  return (
    <div id="element-card" className="flex-box justify-center aling-center text-[--primary-color]">
            <div className='element-card'>
                <div className="element-content flex-box justify-center flex-column">
                    <h6>Get In Touch</h6>
                    <h1>Visit our hotel or contact us today</h1>
                    <p className='flex items-center gap-1'><FaLocationDot /> {data?.address || "Palampur, Himachal Pradesh, India"}</p>
                    <p className='flex items-center gap-1'><MdEmail />{data?.email || "contact@himalayanhotel.com"}</p>
                    <p className='flex items-center gap-1'><FaPhoneAlt /> +91-{data?.contact || "99999-00000"}</p>
                    <p className='flex items-center gap-1'><IoTime/>Monday To Saturday, 10:00AM-6:00PM</p>
                </div>
                <div className="image flex-box justify-center align-center bg-gray-600">
                <Img src={data?.imageUrl || image}/>
                </div>
            </div>
        </div>
  )
}