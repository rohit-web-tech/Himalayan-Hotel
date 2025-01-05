import { useState } from 'react'
import InputBox from './InputBox'
import Submit from './Submit'
import Loader from '../loader'

const InventoryForm = ({loading=false, title, initialUserData = "", edit = false, submitHandler = () => { } , goBackHandler = () => {}}) => {
    const [user, setUser] = useState(initialUserData ? 
        {
            name : initialUserData?.item?.name,
            ...initialUserData
        } : {
        name: ""
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
                <Submit value={loading ? (<Loader styles="h-4 w-4" />) : (edit ? "Save Changes" : "Add")} />
            </form>
        </div>
    )
}

export default InventoryForm ;
