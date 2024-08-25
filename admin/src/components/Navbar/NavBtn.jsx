import { NavLink } from 'react-router-dom'

const NavBtn = ({to,children}) => {
    return (
        <NavLink
            className={({ isActive }) => (
                ` ${isActive ? "font-bold bg-gray-800" : "bg-gray-600"} py-1 hover:bg-gray-800 hover:cursor-pointer w-44 block text-sm rounded-md text-center`
            )}
            to={to}
        >{children}</NavLink>
    )
}

export default NavBtn;