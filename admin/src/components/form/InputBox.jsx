import React from 'react'

const InputBox = ({handleUserInput=()=>{}, placeholder="",name="",type="text",value="",styles="",label=""}) => {
    return (
        <div>
        <label htmlFor="" className='text-xs'>{label}</label>
        <input
            onChange={handleUserInput}
            value={value}
            className={`w-full bg-transparent text-gray-600 rounded-md border-2 border-gray-400 px-3 py-2 text-xs placeholder-gray-600 invalid:border-red-500 ${styles}`}
            placeholder={placeholder}
            type={type}
            name={name}
        />
        </div>
    )
}

export default InputBox;
