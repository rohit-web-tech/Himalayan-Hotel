import { useEffect, useState } from 'react'
import Table, { TD, TR } from './Table'
import Header from './Header';
import { message } from "antd";
import RoomForm from './form/RoomForm';
import Loader from './loader';
import NoData from './NoData';
import { fetchData, fetchGetData } from '../lib/fetchData';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [editRoomData, seteditRoomData] = useState("");
    const [loading, setLoading] = useState(true);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);

    const getrooms = async () => {
        const res = await fetchGetData("/getRooms", setLoading);
        setRooms(res || []);
    }

    useEffect(() => {
        getrooms();
    }, [])

    const addNewRoom = async (room) => {
        if (!room?.roomName || !room?.roomRent || !room?.maxCount || !room?.room_id || !room?.imageUrls) {
            message.warning("Please fill all the fields!!");
            return;
        }

        const res = await fetchData("/setRoomData", setFormSubmitLoading, "POST", room);
        if (res.message == "success") {
            message.success("Room added successfully!!");
            setTimeout(() => {
                getrooms();
                closeForm();
            }, 1000)
        } else {
            message.error(res.message);
        }

    }

    const editRoom = async (room) => {
        if (!room?.roomName || !room?.roomRent || !room?.maxCount || !room?.room_id || !room?.imageUrls) {
            message.warning("Please fill all the fields!!");
            return;
        }

        const res = await fetchData("/editRoom", setFormSubmitLoading, "PATCH", room);
        if (res.message == "success") {
            message.success("Room details edited successfully!!");
            setTimeout(() => {
                getrooms();
                closeForm();
            }, 1000)
        } else {
            message.error(res.message);
        }
    }

    const deleteRoom = async(room) => {
        const userConfirmation = confirm(`Are you sure, you want to delete ${room?.roomName || "Room"} ?`);

        if (!userConfirmation) return;

        const res = await fetchData("/deleteRoom", setFormSubmitLoading, "DELETE", room);
        if (res.message == "success") {
            message.success("Room details deleted successfully!!");
            getrooms();
        } else {
            message.error(res.message);
        }
    }

    const closeForm = () => {
        setShowForm(false);
        setEditForm(false);
        seteditRoomData("");
        setSubmitHandler(() => { });
    }

    const tableFeilds = [
        "#",
        "Name",
        "Number",
        "Max Member",
        "Rent",
        "Edit",
        "Delete"
    ]

    const rowData = () => {
        return rooms?.map((room, i) => (
            <TR key={rooms.id}>
                <TD>{i + 1}</TD>
                <TD>{room?.roomName || "Room"}</TD>
                <TD>{room?.room_id || "1"}</TD>
                <TD>{room?.maxCount || "1"}</TD>
                <TD>{room?.roomRent || "00"}</TD>
                <TD><button
                    className='bg-blue-600 py-1 px-6 text-white rounded-lg text-xs'
                    onClick={() => {
                        seteditRoomData(room);
                        setEditForm(true);
                        setShowForm(true);
                    }}
                >Edit</button></TD>
                <TD><button
                    className='bg-red-600 py-1 px-6 text-white rounded-lg text-xs'
                    onClick={() => {
                        deleteRoom(room);
                    }}
                >Delete</button></TD>
            </TR>
        ))
    }

    return (
        <div className='flex flex-col  w-full md:w-[calc(100%-300px)]  min-h-screen sm:px-14 px-6 py-3'>
            {
                loading ? (
                    <Loader styles="h-10 w-10 my-[calc(50vh-40px)]" />
                ) :
                    rooms?.length < 1 ? (
                        <div className='h-screen flex justify-center items-center'>
                            <NoData
                                title='No Room Data found !!'
                            />
                        </div>
                    ) : (
                        !showForm ? (
                            <>
                                <Header
                                    title="Rooms"
                                    handleBtn={() => {
                                        setShowForm(true);
                                    }}
                                    btnText="Add new room"
                                />
                                <Table tableFields={tableFeilds} tableRows={rowData} />
                            </>
                        ) : (
                            <RoomForm
                                title="Add new room"
                                edit={editForm}
                                initialUserData={editRoomData}
                                goBackHandler={closeForm}
                                submitHandler={editForm ? editRoom : addNewRoom}
                                loading={formSubmitLoading}
                            />
                        )
                    )
            }

        </div>
    )
}

export default Rooms