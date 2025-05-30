import { ReactNode } from "react";

interface propsType {
  children: ReactNode;
  className?: string;
}

const Wrapper = ({ children, className = "mx-3" }: propsType) => {
  return (
    <div className="flex justify-center w-full">
      <div className={`w-full max-w-[1600px] ${className}`}>{children}</div>
    </div>
  );
};

export default Wrapper;
