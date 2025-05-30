import {
  BellIcon,
  ChevronDown,
  Menu,
  MessageSquare,
  Search,
  ShoppingCart,
} from "lucide-react";
import Iconwithnotification from "./Notify";

export default function DashboardNavbar() {
  return (
    <header className="bg-gray-50 top-0 left-0 w-full h-16 flex justify-center items-center  ">
      <div className="container mx-auto flex justify-between items-center w-full ">
        <div className="flex gap-2 ">
          <div className="px-3  py-3 rounded-full hover:bg-neutral-100/80 cursor-pointer transition-all flex items-center ">
            <Menu className="text-gray-400 " size={20} />
          </div>
          <div className="px-3  py-3 rounded-full hover:bg-neutral-100/80 cursor-pointer transition-all flex items-center ">
            <Search className="text-gray-400" size={20} />
          </div>
        </div>
        <div className=" flex items-center justify-between gap-0">
          <div className="px-3  py-3 rounded-full hover:bg-neutral-100/80 cursor-pointer transition-all flex items-center ">
            <ShoppingCart className="text-gray-400" size={20} />
          </div>
          <Iconwithnotification Icon={MessageSquare} />
          <Iconwithnotification Icon={BellIcon} />
          <div className="w-[0.5px] h-8 bg-gray-300 mx-2"></div>
          <div className="flex gap-2 items-center hover:bg-gray-100 px-1.5 py-2 rounded cursor-pointer transition-all">
            <img
              className="w-8 h-8 rounded-full"
              src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
              alt="avatar"
            />
            Hi,<span className="font-semibold text-gray-400">Ashish</span>
            <ChevronDown className="text-gray-400" size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
