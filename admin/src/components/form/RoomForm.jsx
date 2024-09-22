import { useState } from 'react'
import InputBox from './InputBox'
import Submit from './Submit'
import ImagePreview from './ImagePreview'
import Loader from '../loader'

const RoomForm = ({ loading=false , title, initialUserData = "", edit = false, submitHandler = () => { }, goBackHandler = () => { } }) => {
    const [room, setRoom] = useState(initialUserData || {
        roomName: "",
        rent: "",
        imageUrl: "",
        totalRooms : ""
    })

    const handleUserInput = (e) => {
        setRoom(user => ({ ...user, [e.target.name]: e.target.value }))
    }

    return (
        <div className='w-full  mt-4 flex flex-col justify-center'>
            <div className='absolute top-4 text-sm text-gray-600 cursor-pointer sm:right-14 right-6' onClick={goBackHandler}>Go Back</div>
            <h3 className='text-base text-gray-700 font-semibold mb-2 mt-3'>{title}</h3>
            <form className='flex flex-col gap-3' onSubmit={(e) => {
                e.preventDefault();
                submitHandler(room);
            }}>
                <InputBox
                    handleUserInput={handleUserInput}
                    name="roomName"
                    type="text"
                    placeholder="Enter Room Name"
                    value={room?.roomName}
                    label="Room Name"
                />
                <InputBox
                    handleUserInput={handleUserInput}
                    name="rent"
                    type="number"
                    placeholder="Enter Room Rent"
                    value={room?.rent}
                    label="Room Rent"
                />
                <InputBox
                    handleUserInput={handleUserInput}
                    name="totalRooms"
                    type="number"
                    placeholder="Enter Total Rooms"
                    value={room?.totalRooms}
                    label="Number of Rooms"
                />
                <InputBox
                    handleUserInput={handleUserInput}
                    name="imageUrl"
                    type="text"
                    placeholder="Enter Image Url"
                    value={room?.imageUrl}
                    label="Image"
                />
                <ImagePreview
                    src={room?.imageUrl}
                />
                <Submit value={loading ? (<Loader styles="h-4 w-4" />) : edit ? "Save Changes" : "Add Room"} />
            </form>
        </div>
    )
}

export default RoomForm
