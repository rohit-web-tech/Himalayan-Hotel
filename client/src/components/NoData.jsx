import Img from "./lazyloading/Img.jsx";
import Image from "../assets/nodata.jpg";

const NoData = ({ title = "No Data", btnText = "Back To Home", btnHandler = () => { } }) => {
    return (
        <div className="flex flex-col items-center justify-center mb-6">
            <Img
                src={Image}
                alt="No Data"
                className="h-96"
            />
            <p className='text-[--primary-color] font-bold text-xl'>{title}</p>
            <button
                className='bg-[--primary-color] text-[--secondary-color] text-sm px-6 py-2 rounded-lg mt-4 transition-all hover:bg-transparent hover:text-[--primary] border-2 border-[--primary-color]'
                onClick={btnHandler}
            >{btnText}</button>
        </div>
    )
}

export default NoData
