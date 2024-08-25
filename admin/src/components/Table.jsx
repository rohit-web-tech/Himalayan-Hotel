import React from 'react'

export const TD = ({ children }) => {
    return (
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
            {children}
        </td>
    )
}

export const TR = ({ clickHandler = () => { }, children }) => {
    return (
        <tr
            className="bg-white border-b border-gray-400"
            onClick={clickHandler}
        >
            {children}
        </tr>
    )
}

const Table = ({ tableFields = [], tableRows = ()=>"" }) => {
    return (
        <div className="flex flex-col w-full max-h-[calc(100vh-100px)]">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-white border-b border-gray-400">
                                <tr>
                                    {
                                        tableFields.map(field => (
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                                {field}
                                            </th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableRows()
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table
