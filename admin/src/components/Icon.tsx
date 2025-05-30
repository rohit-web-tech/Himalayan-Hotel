import { LucideProps } from "lucide-react";
import { useGlobalContext } from "../contexts/GlobalContext";

interface propsType {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  onClick?: () => void;
}

const IconWrapper = ({ Icon, onClick }: propsType) => {
  const { themeColor } = useGlobalContext();

  return (
    <div
      className="hover:bg-light-gray cursor-pointer p-3 rounded-full hover:  "
      title="Close Menu"
      onClick={onClick}
      style={{ color: themeColor, opacity: "0.8" }}
    >
      <Icon
        className="h-5 w-5 "
        style={{
          color: themeColor,
        }}
      />
    </div>
  );
};

export default IconWrapper;
