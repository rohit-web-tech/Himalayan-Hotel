import React from 'react';

interface Props {
    name: string;
    checked: boolean;
    onClick: (e: React.FormEvent<HTMLInputElement>) => void;
    label: string;
}

const Radio = ({
    name = "",
    checked = false,
    onClick = () => {},
    label = ""
}: Props) => {

    const id = React.useId();

    return (
        <div className="flex items-center">
            <input
                type="radio"
                name={name}
                id={id}
                checked={checked}
                onChange={onClick}
            />
            <label
                className=" cursor-pointer ml-2 text-sm text-main-text   "
                htmlFor={id}
            >
                {label}
            </label>
        </div>

    )
}

export default Radio
