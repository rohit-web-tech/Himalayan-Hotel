import { useState } from 'react'
import InputBox from './InputBox'
import Submit from './Submit'

const UserForm = ({ title, initialUserData = "", edit = false, submitHandler = () => { } , goBackHandler = () => {}}) => {
    const [user, setUser] = useState(initialUserData || {
        userName: "",
        userEmail: "",
        userNumber: "",
        userPassword: ""
    })

    const handleUserInput = (e) => {
        setUser(user => ({ ...user, [e.target.name]: e.target.value }))
    }

    return (
        <div className='w-full h-[90vh] flex flex-col justify-center'>
            <div className='absolute top-6 text-sm text-gray-600 cursor-pointer' onClick={goBackHandler}>Go Back</div>
            <h3 className='text-base text-gray-700 font-semibold mb-4 mt-3'>{title}</h3>
            <form className='flex flex-col gap-4' onSubmit={(e) => {
                e.preventDefault();
                submitHandler(user);
            }}>
                <InputBox
                    handleUserInput={handleUserInput}
                    name="userName"
                    type="text"
                    placeholder="Enter Name"
                    value={user?.userName}
                    label="Name"
                    />
                <InputBox
                    handleUserInput={handleUserInput}
                    name="userEmail"
                    type="email"
                    placeholder="Enter Email"
                    value={user?.userEmail}
                    label="Email"
                    />
                <InputBox
                    handleUserInput={handleUserInput}
                    name="userNumber"
                    type="number"
                    placeholder="Enter Number"
                    value={user?.userNumber}
                    label="Contact Number"
                    />
                <InputBox
                    handleUserInput={handleUserInput}
                    name="userPassword"
                    type="password"
                    placeholder="Enter Password"
                    value={user?.userPassword}
                    label="Password"
                    />
                <Submit value={edit ? "Save Changes" : "Register"} />
            </form>
        </div>
    )
}

export default UserForm
