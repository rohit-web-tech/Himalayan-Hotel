import { Check, Eye, EyeOff, X, LucideProps } from 'lucide-react';
import { FC, useState, useId } from 'react';

interface propsType {
  placeholder: string;
  name: string;
  value?: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  required: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  Error?: string;
}

const Input: FC<propsType> = ({
  placeholder = "",
  name = "",
  label = "",
  value="",
  onChange = () => { },
  type = "text",
  required = true,
  Error = "",
  className = "",
}: propsType) => {

  const [showPassword, setShowPassword] = useState(false);
  const elementId = useId();

  return (
    <div className={`flex flex-col relative ${className}`}>
      <label
        htmlFor={elementId}
        className="font-semibold text-[12px] text-secondary-text capitalize"
      >
        {label}
      </label>

      <div className={`relative w-full `}>
        <div className={`relative w-full flex items-center`}>
          <input
            id={elementId}
            value={value}
            onChange={onChange}
            type={type !== "password" ? type : showPassword ? "text" : type}
            name={name}
            placeholder={placeholder}
            className={`border-gray border rounded-md bg-light-gray p-2 text-sm w-full h-[36px] pr-10 shadow-inner text-main-text    placeholder:text-gray `}
            required={required}
          />
          {
            type === "password" ? (
              <div
                className="h-full p-1 absolute top-0 right-0 w-10 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              >
                {
                  !showPassword ? 
                    <EyeOff className="h-4 text-main-text   " />
                    :
                    <Eye className="h-4 text-main-text   " />
                }
              </div>
            ) : (
              <div
                className="h-full p-1 absolute top-0 right-0 w-10 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              >
                {
                  Error ?
                    <X className="bg-red-500 w-4 h-4 rounded-full text-white" /> 
                    :
                    <Check className="bg-green-500 w-4 h-4 rounded-full text-white" />  
                }
              </div>
            )
          }
        </div>
        <div className="text-red-600 text-xs    py-1">{Error}</div>
      </div>
    </div>
  )
}

export default Input;
