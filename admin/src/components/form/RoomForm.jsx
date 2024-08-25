import { useState } from 'react'
import InputBox from './InputBox'
import Submit from './Submit'
import ImagePreview from './ImagePreview'

const RoomForm = ({ title, initialUserData = "", edit = false, submitHandler = () => { }, goBackHandler = () => { } }) => {
    const [room, setRoom] = useState(initialUserData || {
        room_id: "",
        roomName: "",
        roomRent: "",
        maxCount: "",
        imageUrls : ""
    })

    const handleUserInput = (e) => {
        setRoom(user => ({ ...user, [e.target.name]: e.target.value }))
    }

    return (
        <div className='w-full h-[90vh] flex flex-col justify-center'>
            <div className='absolute top-4 text-sm text-gray-600 cursor-pointer right-14' onClick={goBackHandler}>Go Back</div>
            <h3 className='text-base text-gray-700 font-semibold mb-2 mt-3'>{title}</h3>
            <form className='flex flex-col gap-3' onSubmit={(e) => {
                e.preventDefault();
                submitHandler(room);
            }}>
                <InputBox
                    handleUserInput={handleUserInput}
                    name="room_id"
                    type="number"
                    placeholder="Enter Room Number"
                    value={room?.room_id}
                    label="Room No."
                />
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
                    name="roomRent"
                    type="number"
                    placeholder="Enter Room Rent"
                    value={room?.roomRent}
                    label="Room Rent"
                />
                <InputBox
                    handleUserInput={handleUserInput}
                    name="maxCount"
                    type="number"
                    placeholder="Enter Maximum Members"
                    value={room?.maxCount}
                    label="Max Members"
                />
                <InputBox
                    handleUserInput={handleUserInput}
                    name="imageUrls"
                    type="text"
                    placeholder="Enter Image Url"
                    value={room?.imageUrls}
                    label="Image"
                />
                <ImagePreview
                    src={room?.imageUrls}
                />
                <Submit value={edit ? "Save Changes" : "Add Room"} />
            </form>
        </div>
    )
}

export default RoomForm
