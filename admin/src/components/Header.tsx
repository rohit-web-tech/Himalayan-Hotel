import { useGlobalContext } from "../contexts/GlobalContext";
import IconWrapper from "./Icon";
import { LogOut, Menu, Settings, User } from "lucide-react";
import Wrapper from "./Wrapper";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";
import { logout } from "../store/slice/user";
import { message } from "antd";
import { fetchGetData } from "../lib/fetchData";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const SERVER_URL = import.meta.env.VITE_BASE_URL ;
  const { setShowSideBar, setShowSettingsBar } = useGlobalContext();
  const user = useSelector((state : any) => state?.user?.userData)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalLoading, setModalLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    desc: "",
    cancelText: "",
    confirmText: "",
  });

  const closeModal = () => {
    setShowModal(false);
  }

  const logoutUser = async () => {
    try {
      const res = await fetchGetData("/user/logout", setModalLoading);
      if (res?.success) {
        navigate("/login");
      } else {
        message.error(res?.message)
      }
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(logout(""))
      closeModal();
    }
  }

  const handleLogOut = () => {
    setModalData(() => (
      {
        title: "Are you sure you want to log out?",
        desc: "You will need to sign in again to access your account. ",
        confirmText: "Logout",
        cancelText: "Stay Login"
      }
    ));
    setShowModal(true);
  }

  return (
    <div className="bg-main-bg sticky top-0 z-10">
      <ConfirmModal
        isOpen={showModal}
        onClose={closeModal}
        onConfirm={logoutUser}
        message={modalData?.desc}
        title={modalData?.title}
        cancelText={modalData?.cancelText}
        confirmText={modalData?.confirmText}
        loading={modalLoading}
      />
      <Wrapper className="mx-0">
        <div className="flex justify-between items-center gap-0">
          <div className="flex items-center sm:gap-1 gap-0">
            <IconWrapper
              Icon={Menu}
              onClick={() => {
                setShowSideBar((prev: boolean) => !prev);
              }}
            />
          </div>
          <div className="flex items-center sm:gap-1 gap-0">
            <div className="flex items-center gap-1">
              <img
                src={SERVER_URL + user?.image}
                alt="admin"
                className="w-8 h-8 rounded-full"
              />
              <div className="text-xs text-main-text mr-3">
                <Dropdown
                  label={user?.name || "Admin"}
                  items={[
                    {
                      label: "Profile",
                      icon: <User size={16} />,
                      onClick: () => navigate("/profile"),
                    },
                    {
                      label: "Settings",
                      icon: <Settings size={16} />,
                      onClick: () => setShowSettingsBar(true),
                    },
                    {
                      label: "Logout",
                      icon: <LogOut size={16} />,
                      onClick: handleLogOut,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
