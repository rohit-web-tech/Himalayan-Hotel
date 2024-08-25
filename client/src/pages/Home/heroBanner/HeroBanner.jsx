import {useEffect,useState} from "react";
import herobanner from "../../../assets/herobanner.jpg";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
const HeroBanner = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    imageUrl: ""
  })

  const getData = async () => {
    fetch(`${BASE_URL}/getHome`)
      .then(res => res.json())
      .then(res => {
        if (res.message == "success") {
          setData(res?.home || {
            title: "",
            subtitle: "",
            imageUrl: ""
          });
        }
      }).catch(err => console.log(err));
  }

  useEffect(() => {
    getData();
  }, [])
  const navigate = useNavigate();
  return (
    <div className="h-[500px] relative w-full flex justify-center items-center bg-gray-700">
      <img
        src={data?.imageUrl || herobanner}
        className="h-[500px] w-screen object-cover opactiy opacity-40"
      />
      <div className="absolute w-full">
        <ContentWrapper className="flex flex-col justify-center items-center gap-2 text-[--secondary-color]">
          <h1 className="text-[2rem] sm:text-[3.5rem] font-[600] text-center main">{data?.title  || "The Himalayan Hotel"}</h1>
          <p className="text-[.8rem] sm:text-[1.1rem] sm:-mt-2 text-center">{data?.subtitle || "A beautiful hotel in the lap of himalayas !"}</p>
          <button onClick={() => { navigate("/booking") }} className="border-2 hover:border-[--secondary-color] rounded-md bg-[--primary-color] hover:bg-transparent border-[--primary-color] duration-300 mt-3 text-sm py-2 px-10">Take a stay with us !</button>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default HeroBanner;