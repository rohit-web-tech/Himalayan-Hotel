import React from "react";

interface optionType {
    value : string,
    label : string
}

interface Props {
    name: string,
    options: optionType[],
    className?: string,
    onSelect:(e:React.ChangeEvent<HTMLSelectElement>)=>void,
    value: string
}

const Select = ({
    name = "",
    options = [],
    className= "",
    onSelect=()=>{},
    value=options[0].value
}:Props) => {
    return (
        <select
            name={name}
            className={`border border-gray p-2 rounded-lg ${className}`}
            onChange={onSelect}
            value={value}
        >
            {
                options?.map((option:optionType,i:number) => (
                    <option
                        value={option?.value}
                        key={i}
                    >
                        {option?.label}
                    </option>
                ))
            }
        </select>
    )
}

export default Select
