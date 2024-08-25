import { useEffect, useState } from 'react'
import Table, { TD, TR } from './Table'
import Header from './Header';
import { message } from "antd";
import RoomForm from './form/RoomForm';

const Rooms = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [rooms, setRooms] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [editRoomData, seteditRoomData] = useState("");

    const getrooms = async () => {
        fetch(`${BASE_URL}/getRooms`)
            .then(res => res.json())
            .then(res => {
                    console.log(res)
                    setRooms(res || []);
            }).catch(err => console.log(err));
    }

    useEffect(() => {
        getrooms();
    }, [])

    const addNewRoom = (room) => {
        console.log(room)
        if (!room?.roomName || !room?.roomRent || !room?.maxCount || !room?.room_id || !room?.imageUrls) {
            message.warning("Please fill all the fields!!");
            return;
        }
        fetch(`${BASE_URL}/setRoomData`, {
            "method": "POST",
            "body": JSON.stringify(room),
            "headers": {
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                if (res.message == "success") {
                    message.success("Room added successfully!!");
                    setTimeout(() => {
                        getrooms();
                        closeForm();
                    }, 1000)
                } else {
                    message.error(res.message);
                }
            }).catch(err => {
                message.error(err);
            })
    }

    const editRoom = (room) => {
        if (!room?.roomName || !room?.roomRent || !room?.maxCount || !room?.room_id || !room?.imageUrls) {
            message.warning("Please fill all the fields!!");
            return;
        }

        fetch(`${BASE_URL}/editRoom`, {
            "method": "PATCH",
            "body": JSON.stringify(room),
            "headers": {
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                if (res.message == "success") {
                    message.success("Room details edited successfully!!");
                    setTimeout(() => {
                        getrooms();
                        closeForm();
                    }, 1000)
                } else {
                    message.error(res.message);
                }
            }).catch(err => {
                message.error(err);
            })
    }

    const deleteRoom = (room) => {
        fetch(`${BASE_URL}/deleteRoom`, {
            "method": "delete",
            "body": JSON.stringify(room),
            "headers": {
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                if (res.message == "success") {
                    message.success("Room details deleted successfully!!");
                    getrooms();
                } else {
                    message.error(res.message);
                }
            }).catch(err => {
                message.error(err);
            })
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
                    />
                )
            }

        </div>
    )
}

export default Rooms