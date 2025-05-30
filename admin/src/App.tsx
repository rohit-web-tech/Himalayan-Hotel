import { FC, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useGlobalContext } from "./contexts/GlobalContext";
import SettingsButton from "./components/SettingsButton";
import Login from "./Pages/Login";
import SettingsBar from "./components/SettingsBar";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { useDispatch } from "react-redux";
import { fetchGetData } from "./lib/fetchData";
import { login, logout } from "./store/slice/user";
import Loader from "./components/Loader";
import AuthenticationRoutes from "./components/AuthenticationRoutes";

const App: FC = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { screenSize, setScreenSize, setShowSideBar } =
    useGlobalContext();

  // geting screen size on resizing
  useEffect(() => {
    const getScreenSize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", getScreenSize);
    getScreenSize();
    return () => window.removeEventListener("resize", getScreenSize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setShowSideBar(false);
    } else {
      setShowSideBar(true);
    }
  }, [screenSize]);

  useEffect(() => {
    (
      async () => {
        const res = await fetchGetData("/user/currentUser", setLoading);
        if (res?.success && res?.data?.isAdmin) {
          dispatch(login(res?.data));
        } else {
          dispatch(logout(""));
        }
      }
    )();
  }, []);

  return (
    <BrowserRouter>
      {
        loading ? (
          <div
            className="bg-main-bg flex items-center justify-center w-full h-screen"
          >
            <Loader text="Loading..." />
          </div>
        ) : (
          <>
            <SettingsBar />
            <SettingsButton />
            <Routes>
              <Route path="/*" element={<MainLayout />} />
              <Route element={<AuthenticationRoutes />}>
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </>
        )
      }

    </BrowserRouter >
  );
};

export default App;
