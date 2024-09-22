import { useState } from 'react'
import InputBox from './InputBox'
import Submit from './Submit'
import Loader from '../loader'

const UserForm = ({loading=false, title, initialUserData = "", edit = false, submitHandler = () => { } , goBackHandler = () => {}}) => {
    const [user, setUser] = useState(initialUserData || {
        name: "",
        email: "",
        contactNumber: "",
        password: ""
    })

    const handleUserInput = (e) => {
        setUser(user => ({ ...user, [e.target.name]: e.target.value }))
    }

    return (
        <div className='w-full mt-4 my-3 flex flex-col justify-center'>
            <div className='absolute sm:right-14 right-6 top-6 text-sm text-gray-600 cursor-pointer' onClick={goBackHandler}>Go Back</div>
            <h3 className='text-base text-gray-700 font-semibold mb-4 mt-3'>{title}</h3>
            <form className='flex flex-col gap-4' onSubmit={(e) => {
                e.preventDefault();
                submitHandler(user);
            }}>
                <InputBox
                    handleUserInput={handleUserInput}
                    name="name"
                    type="text"
                    placeholder="Enter Name"
                    value={user?.name}
                    label="Name"
                    />
                <InputBox
                    handleUserInput={handleUserInput}
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={user?.email}
                    label="Email"
                    />
                <InputBox
                    handleUserInput={handleUserInput}
                    name="contactNumber"
                    type="number"
                    placeholder="Enter Number"
                    value={user?.contactNumber}
                    label="Contact Number"
                    />
                <InputBox
                    handleUserInput={handleUserInput}
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={user?.password}
                    label="Password"
                    />
                <Submit value={loading ? (<Loader styles="h-4 w-4" />) : (edit ? "Save Changes" : "Register")} />
            </form>
        </div>
    )
}

export default UserForm
