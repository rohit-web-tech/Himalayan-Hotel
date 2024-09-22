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
        const res = await fetchGetData("/room", setLoading);
        if (res?.success) {
            setRooms(res.data || []);
        }
    }

    useEffect(() => {
        getrooms();
    }, [])

    const addNewRoom = async (room) => {
        if (!room?.roomName || !room?.rent || !room?.totalRooms || !room?.imageUrl) {
            message.warning("Please fill all the fields!!");
            return;
        }

        const res = await fetchData("/room", setFormSubmitLoading, "POST", room);
        if (res?.success) {
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
        if (!room?.roomName || !room?.rent || !room?.totalRooms || !room?.imageUrl) {
            message.warning("Please fill all the fields!!");
            return;
        }

        const res = await fetchData("/room", setFormSubmitLoading, "PATCH", { roomId: room?._id, ...room });
        if (res?.success) {
            message.success("Room details edited successfully!!");
            setTimeout(() => {
                getrooms();
                closeForm();
            }, 1000)
        } else {
            message.error(res.message);
        }
    }

    const deleteRoom = async (room) => {
        const userConfirmation = confirm(`Are you sure, you want to delete ${room?.roomName || "Room"} ?`);

        if (!userConfirmation) return;

        const res = await fetchData("/room", setFormSubmitLoading, "DELETE", { roomId: room?._id, ...room });
        if (res?.success) {
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
        "Rent",
        "Total Rooms",
        "Edit",
        "Delete"
    ]

    const rowData = () => {
        return rooms?.map((room, i) => (
            <TR key={rooms.id}>
                <TD>{i + 1}</TD>
                <TD>{room?.roomName || "Room"}</TD>
                <TD>{room?.rent || "00"}</TD>
                <TD>{room?.totalRooms || "1"}</TD>
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
                    !showForm ? (
                        <>
                            <Header
                                title="Rooms"
                                handleBtn={() => {
                                    setShowForm(true);
                                }}
                                btnText="Add new room"
                            />
                            {
                                rooms?.length < 1 ? (
                                    <>
                                        <div className='h-[calc(100vh-100px)] flex justify-center items-center'>
                                            <NoData
                                                title='No Room Data found !!'
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Table tableFields={tableFeilds} tableRows={rowData} />
                                    </>
                                )
                            }
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
            }

        </div>
    )
}

export default Rooms