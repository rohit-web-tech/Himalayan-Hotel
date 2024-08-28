import Image from "../assets/nodata.jpg";

const NoData = ({ title = "No Data"}) => {
    return (
        <div className="flex flex-col items-center justify-center mb-6">
            <img
                src={Image}
                alt="No Data"
                className="h-96"
            />
            <p className='text-[--primary-color] font-bold text-xl'>{title}</p>
        </div>
    )
}

export default NoData
