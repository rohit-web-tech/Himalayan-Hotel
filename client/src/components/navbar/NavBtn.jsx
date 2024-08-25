import { NavLink } from 'react-router-dom'

const NavBtn = ({to,children}) => {
    return (
        <NavLink
            className={({ isActive }) => (
                isActive ? "relative font-bold text-white before:w-[30%] border-b-2 border-white" : ""
            )}
            to={to}
        >{children}</NavLink>
    )
}

export default NavBtn;