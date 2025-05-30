import { Loader2 } from "lucide-react";
import { useGlobalContext } from "../contexts/GlobalContext";

const Loader = ({ text = "Loading...", className = "py-12", loaderStyle="w-8 h-8"}: { text?: string, className ?: string, loaderStyle ?: string }) => {
    const {themeColor} = useGlobalContext() ;
    return (
        <div className={`flex flex-col items-center justify-center h-full w-full ${className}`}>
            <Loader2 className={`animate-spin ${loaderStyle}`} style={{
                color : themeColor
            }} />
            {text && <p className="text-sm text-secondary-text">{text}</p>}
        </div>
    );
};

export default Loader;