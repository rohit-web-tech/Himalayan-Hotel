import React from "react";
import { LucideProps, MessageSquare } from "lucide-react";

const Iconwithnotification = ({
  Icon,
}: {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}) => {
  return (
    <div className="relative inline-block  px-3  py-3 rounded-full hover:bg-neutral-100/80 cursor-pointer transition-all ">
      <Icon className=" text-gray-400" size={20} />

      <span className="absolute top-2 right-2     flex h-2 w-2 items-center text-center justify-center rounded-full bg-blue-500 text-white text-[6px] font-bold"></span>
    </div>
  );
};

export default Iconwithnotification;
