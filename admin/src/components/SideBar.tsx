import { NavLink } from "react-router-dom";
import {
  BedDouble,
  ChartBarIcon,
  CircleX,
  Contact,
  Home,
  Hotel,
  HotelIcon,
  Layers,
  NotebookText,
  UserRoundCog,
  Users,
} from "lucide-react";
import IconWrapper from "./Icon";
import { useGlobalContext } from "../contexts/GlobalContext";

const SideBar = () => {
  const iconStyles = "h-4 w-4";

  const navigationData = [
    {
      label: "Dashboard",
      key: "dashboard",
      items: [
        {
          label: "Overall Stats",
          icon: <ChartBarIcon className={iconStyles} />,
          key: "ecommerce",
          active: true,
          to: "/dashboard",
        },
      ],
    },
    {
      label: "Management",
      key: "management",
      items: [
        {
          label: "Staff",
          icon: <UserRoundCog className={iconStyles} />,
          key: "admins",
          to: "/admins",
        },
        {
          label: "Users",
          icon: <Users className={iconStyles} />,
          key: "users",
          to: "/users",
        },
        {
          label: "Rooms",
          icon: <BedDouble className={iconStyles} />,
          key: "rooms",
          to: "/rooms",
        },
        {
          label: "Bookings",
          icon: <NotebookText className={iconStyles} />,
          key: "bookings",
          to: "/bookings",
        },
        {
          label: "Inventory",
          icon: <Layers className={iconStyles} />,
          key: "inventory",
          to: "/inventory",
        },
        // {
        //   label: "Earnings",
        //   icon: <IndianRupee className={iconStyles} />,
        //   key: "earnings",
        //   to: "/earnings",
        // },
        // {
        //   label: "Queries",
        //   icon: <FileQuestion className={iconStyles} />,
        //   key: "queries",
        //   to: "/queries",
        // },
        // {
        //   label: "Newsletters",
        //   icon: <Newspaper className={iconStyles} />,
        //   key: "newsletter",
        //   to: "/newsletter",
        // },
      ],
    },
    {
      label: "Pages",
      key: "pages",
      items: [
        {
          label: "Home",
          icon: <Home className={iconStyles} />,
          key: "home",
          to: "/home",
        },
        {
          label: "About",
          icon: <Hotel className={iconStyles} />,
          key: "about",
          to: "/about",
        },
        {
          label: "Contact",
          icon: <Contact className={iconStyles} />,
          key: "contact",
          to: "/contact",
        },
      ],
    }
  ];

  const { showSideBar, setShowSideBar, themeColor, screenSize } =
    useGlobalContext();

  const handleNavLinkClick = () => {
    if (showSideBar && screenSize < 768) {
      setShowSideBar(false);
    }
  };

  const handleSideBarClick = () => {
    handleNavLinkClick();
  }

  return (

    <div
      className={`h-screen overflow-hidden origin-left md:relative fixed left-0 top-0 z-[100] bg-half-transparent md:w-[200px] w-full ${showSideBar ? "block" : "hidden"}`}
      onClick={handleSideBarClick}
      id="side_bar_container"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`h-screen bg-main-bg  shadow-xl p-2 w-[200px] overflow-y-auto ease-in-out transition-all flex flex-col items-center duration-100 ${showSideBar ? "left-0" : "-left-[100%]"}`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="text-base font-semibold flex gap-1 text-main-text py-2">
            <HotelIcon />
            Admin Panel
          </div>
          <div className="md:hidden block">
            <IconWrapper Icon={CircleX} onClick={() => setShowSideBar(false)} />
          </div>
        </div>
        <div className={`w-full my-5 flex flex-col gap-3`}>
          {navigationData?.map((category) => (
            <div key={category?.key} className={`flex flex-col gap-2`}>
              <div className={`flex flex-col`}>
                <div className={`uppercase text-gray justify-start text-sm `}>
                  {category?.label}
                </div>
              </div>
              {category?.items?.map((item) => (
                <NavLink
                  to={item?.to ?? "/"}
                  className={({ isActive }) =>
                    `flex gap-1 items-center text-secondary-text text-sm p-3 cursor-pointer rounded-md ${isActive
                      ? "text-white"
                      : "hover:bg-hover"
                    }`
                  }
                  onClick={handleNavLinkClick}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? themeColor : "" ,
                  })}
                  key={item?.key}
                >
                  <div className="items-center">{item?.icon}</div>
                  <p className={`capitalize`}>{item?.label}</p>
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default SideBar;