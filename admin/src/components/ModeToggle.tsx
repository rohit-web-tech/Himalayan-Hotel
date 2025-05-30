import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/Theme.context";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <div
      className="h-10 w-10   bg-light-gray flex justify-center items-center rounded-lg absolute top-14 right-2 cursor-pointer shadow-inner shadow-shadowColor"
      style={{
        zIndex : "100000"
      }}
      onClick={toggleMode}
    >
      {theme === "light" ? (
        <Sun
          className="w-6 h-6 text-black"
        />
      ) : (
        <Moon
          className="w-6 h-6 text-white"
        />
      )}
    </div>
  );
};

export default ModeToggle;
