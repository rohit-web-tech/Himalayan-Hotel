import { createContext, ReactNode, useContext, useState } from "react";
import { ThemeColorType } from "../lib/types";

type MenuContextType = {
  showSideBar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  showSettingsBar: boolean;
  setShowSettingsBar: (state: boolean) => void;
  themeColor: ThemeColorType;
  setThemeColor: (color: ThemeColorType) => void;
  screenSize: number;
  setScreenSize: (size: number) => void;
};

const initialState: MenuContextType = {
  showSideBar: false,
  setShowSideBar: () => { },
  showSettingsBar: false,
  setShowSettingsBar: () => { },
  themeColor: localStorage.getItem("themeColor") as ThemeColorType || "#c026d3",
  setThemeColor: () => { },
  screenSize: 0,
  setScreenSize: () => { },
};

const GlobalContext = createContext<MenuContextType>(initialState);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  const [showSettingsBar, setShowSettingsBar] = useState<boolean>(false);

  const [themeColor, setThemeColor] = useState<ThemeColorType>(localStorage.getItem("themeColor") as ThemeColorType || "#c026d3");

  const handleChangeTheme = (color: ThemeColorType) => {
    setThemeColor(color);
    localStorage.setItem("themeColor", color);
  }

  const [screenSize, setScreenSize] = useState<number>(0);

  return (
    <GlobalContext.Provider
      value={{
        showSideBar,
        setShowSideBar,
        themeColor,
        setThemeColor: handleChangeTheme,
        showSettingsBar,
        setShowSettingsBar,
        screenSize,
        setScreenSize,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
