import { useId } from "react"

const InputBox = ({ styles = "", handleChange = () => { }, value = "", placeholder = "", type = "text", name = "" }) => {
    const id = useId();
    return (
        <input
            onChange={handleChange}
            value={value}
            className={`w-full bg-transparent text-gray-600 rounded-md border border-gray-400 px-3 py-2 text-xs placeholder-gray-600 invalid:border-red-500 ${styles}`}
            placeholder={placeholder}
            type={type}
            name={name}
            id={id}
        />
    )
}

export default InputBox
