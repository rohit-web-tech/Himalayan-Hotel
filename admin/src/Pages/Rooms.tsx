import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import Table from "../components/table/Table";
import Heading from "../components/Heading";
import { DropdownItem } from "../components/Dropdown";
import { fetchData, fetchGetData } from "../lib/fetchData";
import { message } from "antd";
import Loader from "../components/Loader";
import Form, { FormField } from "../components/form/Form";
import ConfirmModal from "../components/ConfirmModal";
import { useNavigate } from "react-router-dom";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [editRoomData, setEditRoomData] = useState("");
    const [loading, setLoading] = useState(true);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [roomFilter, setRoomFilter] = useState("all");
    const [modalData, setModalData] = useState<any>({
        title: "",
        desc: "",
        cancelText: "",
        confirmText: "",
        confirmHandler: ""
    });

    const navigate = useNavigate();

    const formFields : FormField[] = [
        {
            name : "roomName",
            label : "Room Name",
            type : "text",
            required : true
        },
        {
            name : "rent",
            label : "Rent/Day",
            type : "number",
            required : true
        },
        {
            name : "totalRooms",
            label : "Total Rooms",
            type : "number",
            required : true
        },
    ]

    const closeModal = () => {
        setShowModal(false);
    }

    const getrooms = async () => {
        const res = await fetchGetData("/room", setLoading);
        if (res?.success) {
            setRooms(res.data || []);
        }
    }

    useEffect(() => {
        getrooms();
    }, [])

    const addNewRoom = async (room : any, image : File | null) => {
        if (!room?.roomName || !room?.rent || !room?.totalRooms || !image) {
            message.warning("Please fill all the fields!!");
            return;
        }

        const formData = new FormData();
        formData.append('roomName', room?.roomName);
        formData.append('rent', room?.rent);
        formData.append('totalRooms', room?.totalRooms);
        formData.append('image', image );

        const res = await fetchData("/room", setFormSubmitLoading, "POST", formData);
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

    const editRoom = async (room : any, image : File | null) => {

        const formData = new FormData();
        formData.append('_id', room?._id);
        formData.append('roomName', room?.roomName);
        formData.append('rent', room?.rent);
        formData.append('totalRooms', room?.totalRooms);
        formData.append('image', image ? image : room?.image);

        const res = await fetchData("/room", setModalLoading, "PATCH", formData);
        if (res?.success) {
            message.success("Room details edited successfully!!");
            setTimeout(() => {
                getrooms();
                closeForm();
            }, 1000)
        } else {
            message.error(res.message);
        }
        closeModal();

    }

    const handleEdit = (room : any, image : File | null) => {
        
        if (!room?.roomName || !room?.rent || !room?.totalRooms) {
            message.warning("Please fill all the fields!!");
            return;
        }

        setModalData(() => (
            {
                title: `Are you sure, you want to edit ${room?.roomName || "this room"} 's details ?`,
                desc: `This action will edit ${room?.roomName || "this room"}'s details !!`,
                confirmText: "Confirm",
                cancelText: "Cancel",
                confirmHandler: () => {
                    editRoom(room,image);
                }
            }
        ));
        setShowModal(true);
    }

    const deleteRoom = async (room : any) => {
        const res = await fetchData("/room", setModalLoading, "DELETE", { roomId: room?._id, ...room });
        if (res?.success) {
            message.success("Room details deleted successfully!!");
            getrooms();
        } else {
            message.error(res.message);
        }
        closeModal();
    }

    const handleDelete = (room : any) => {

        setModalData(() => (
            {
                title: `Are you sure, you want to delete ${room?.roomName ?? "Room"} ?`,
                desc: `This action will permanently delete ${room?.roomName ?? "this room"} and can't be undo!!`,
                confirmText: "Delete",
                cancelText: "Cancel",
                confirmHandler: () => {
                    deleteRoom(room);
                }
            }
        ));
        setShowModal(true);
    }

    const closeForm = () => {
        setShowForm(false);
        setEditForm(false);
        setEditRoomData("");
    }
    
    const columns = [
        {
            label : "Image",
            key : "imageUrl"
        }, 
        {
            label : "Name",
            key : "roomName"
        }, 
        {
            label : "Rent/Day",
            key : "rent"
        }, 
        {
            label : "Total Rooms",
            key : "totalRooms"
        }
    ];

    const filterItems : DropdownItem[] = [
        {
            label: "All Rooms",
            onClick: () => setRoomFilter("all"),
        },
        {
            label: "1 Room",
            onClick: () => setRoomFilter("1"),
        },
        {
            label: "2 Rooms",
            onClick: () => setRoomFilter("2"),
        },
        {
            label: "3 Rooms",
            onClick: () => setRoomFilter("3"),
        },
        {
            label: "4 Rooms",
            onClick: () => setRoomFilter("4"),
        },
    ]

    const handleBulkDelete = () => {
        setRooms(prev => prev.filter((item:any) => !selectedIds.includes(item?._id)));
        setSelectedIds([]);
    };

    const handleDownloadReport = () => {
        const csv = [
            ['ID','Name', 'Rent', 'Total Rooms'],
            ...filteredData.map((d:any) => [d?._id,d.roomName, `$${d.rent}/day`, d.totalRooms])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "rooms_report.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
          setSelectedIds(rooms.map((item:any) => item.id));
        } else {
          setSelectedIds([]);
        }
      };
    
      const handleSelect = (id: string, checked: boolean) => {
        if (checked) {
          setSelectedIds([...selectedIds, id]);
        } else {
          setSelectedIds(selectedIds?.filter((itemId) => itemId !== id));
        }
      };

    
    const filteredData = rooms
        .filter((room:any) =>
            room.roomName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((room:any) =>
            roomFilter === "all" ? true : room?.totalRooms === parseInt(roomFilter)
        )

        const openEditingForm = (data: any) => {
            setEditRoomData(data);
            setEditForm(true);
            setShowForm(true);
        }

    return (
        <Wrapper className="mx-3 py-5">

            <ConfirmModal
                isOpen={showModal}
                onClose={closeModal}
                onConfirm={modalData?.confirmHandler}
                message={modalData?.desc}
                title={modalData?.title}
                cancelText={modalData?.cancelText}
                confirmText={modalData?.confirmText}
                loading={modalLoading}
            />

            {
                loading ? (
                    <Loader text="Loading Rooms Data..." />
                ) :
                    !showForm ? (
                        <>
                            <Heading
                                handleBulkDelete={handleBulkDelete}
                                handleDownloadReport={handleDownloadReport}
                                searchTerm={searchTerm}
                                selectedIds={selectedIds}
                                setSearchTerm={setSearchTerm}
                                placeholder="Search Rooms..."
                                heading="Rooms"
                                showFilter={false}
                                onAdd={() => setShowForm(true)}
                                filterItems={filterItems}
                                filterLabel="Select Rooms"
                            />

                            <div className="overflow-x-auto">
                                <Table
                                    data={filteredData}
                                    columns={columns}
                                    onEdit={openEditingForm}
                                    onDelete={handleDelete}
                                    onInventory={(id)=>{
                                        navigate(`/room-inventory?id=${id}`)
                                    }}
                                    onSelect={handleSelect}
                                    onSelectAll={handleSelectAll}
                                    selectedIds={selectedIds}
                                />
                            </div>
                        </>
                    ) : (
                        <Form
                            title={editForm ? "Update Room Details" : "Add New Room"}
                            isEditing={editForm}
                            intialData={editRoomData}
                            goBackHandler={closeForm}
                            onSubmit={editForm ? handleEdit : addNewRoom}
                            loading={formSubmitLoading}
                            fields={formFields}
                        />
                    )
            }
        </Wrapper>
    );
};

export default Rooms;
