import { FC } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

interface propsType {
  text: string;
  className?: string;
}

const Button: FC<propsType> = ({
    text = "",
    className = ""
}: propsType) => {

    const {themeColor} = useGlobalContext();

    return (
        <button
            style={{
                backgroundColor: themeColor
            }}
            type="submit"
            className={`w-full p-2 font-medium capitalize text-white text-[14px] transition-colors hover:shadow-sm ${className} capitalize`}
        >
            {text}
        </button>
    )
}

export default Button;
