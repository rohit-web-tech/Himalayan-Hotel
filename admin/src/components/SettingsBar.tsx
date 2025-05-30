import { FC } from "react";
import IconWrapper from "./Icon";
import { Check, CircleX, Moon, Sun } from "lucide-react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { ThemeColorType } from "../lib/types";
import { useTheme } from "../contexts/Theme.context";

const SettingsBar: FC = () => {
  const themeColors: ThemeColorType[] = [
    "#c026d3",
    "blue",
    "green",
    "#eab308",
    "orange",
    "red",
  ];
  const {
    themeColor: currentThemeColor,
    setThemeColor,
    showSettingsBar,
    setShowSettingsBar,
  } = useGlobalContext();
  const { theme, setTheme } = useTheme();

  const handleCloseSideBar = (e: React.MouseEvent<HTMLElement>) => {
    setShowSettingsBar(false);
  }

  const ColorBox = ({
    color = "#d946ef",
    isActive = false,
  }: {
    color: ThemeColorType;
    isActive: boolean;
  }) => (
    <div
      className={`w-full aspect-square max-w-9 rounded-full flex items-center justify-center cursor-pointer`}
      style={{
        background: color,
      }}
      onClick={() => setThemeColor(color)}
    >
      {isActive && <Check className="text-white" />}
    </div>
  );

  return (
    <div
      className={`w-full bg-half-transparent h-screen overflow-y-auto fixed left-0 right-0 top-0 z-[50] ${showSettingsBar ? "block" : "hidden"
        }`}
      onClick={handleCloseSideBar}
    >
      <div
        className="w-80 h-full overflow-y-auto bg-main-bg   float-right relative px-4 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center w-full border-b-1 border-slate-300    py-2">
          <h2 className="text-main-text    text-base font-medium">
            Settings
          </h2>
          <IconWrapper
            Icon={CircleX}
            onClick={() => setShowSettingsBar(false)}
          />
        </div>
        <div className="flex flex-col w-full border-b-1 border-slate-300    py-4 gap-2">
          <h2 className="text-main-text    text-lg font-medium">
            Theme Mode
          </h2>
            <div className="flex gap-4">
              {/* Light mode button */}
              <button
                onClick={() => setTheme("light")}
                className={`flex flex-col items-center justify-center rounded-2xl border px-4 py-3 text-sm shadow transition hover:bg-gray-100 ${theme === "light" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 bg-white text-gray-600"
                  }`}
              >
                <Sun size={24} />
                <span className="mt-1">Light</span>
              </button>

              {/* Dark mode button */}
              <button
                onClick={() => setTheme("dark")}
                className={`flex flex-col items-center justify-center rounded-2xl border px-4 py-3 text-sm shadow transition hover:bg-gray-100 dark:hover:bg-gray-800 ${theme === "dark" ? "border-blue-500 bg-gray-900 text-blue-400" : "border-gray-200 bg-white text-gray-600"
                  }`}
              >
                <Moon size={24} />
                <span className="mt-1">Dark</span>
              </button>
            </div>
        </div>
        <div className="flex flex-col w-full border-b-1 border-slate-300    py-4 gap-2">
          <h2 className="text-main-text    text-lg font-medium">
            Theme Color
          </h2>
          <div className="flex items-center w-full justify-between gap-2">
            {themeColors?.map((themeColor: ThemeColorType) => (
              <ColorBox
                color={themeColor}
                isActive={themeColor === currentThemeColor}
                key={themeColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsBar;