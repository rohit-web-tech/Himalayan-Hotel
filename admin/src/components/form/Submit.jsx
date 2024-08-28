import React from 'react'

const Submit = ({value="Add",styles=""}) => {
    return (
        <button
            className={`w-full rounded-md px-3 py-2 text-xs bg-gray-700 hover:bg-gray-900 text-white text-center ${styles}`}
            type="submit"
            value={value}
        >
            {value}
        </button>
    )
}

export default Submit
