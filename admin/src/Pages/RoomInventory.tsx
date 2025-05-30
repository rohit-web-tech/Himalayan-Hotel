import React, { useEffect, useState } from 'react'
import { fetchData, fetchGetData } from '../lib/fetchData';
import { useLocation } from 'react-router-dom';
import { message } from 'antd';
import Loader from '../components/Loader';
import Heading from '../components/Heading';
import Form from '../components/form/Form';
import Table from '../components/table/Table';
import ConfirmModal from '../components/ConfirmModal';
import Wrapper from '../components/Wrapper';
import { column } from '../components/table/TableHeader';
import RoomInventoryForm from '../components/form/RoomInventoryForm';

const RoomInventory = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [room, setRoom] = useState<any>({});
    const [inventories, setInventories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [editUserData, setEditUserData] = useState<any>("");
    const [loading, setLoading] = useState(true);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState<any>({
        title: "",
        desc: "",
        cancelText: "",
        confirmText: "",
        confirmHandler: ""
    });

    const columns: column[] = [
        {
            key: 'image',
            label: "Image"
        },
        {
            key: 'name',
            label: "Name"
        },
        {
            key: 'quantity',
            label: "Quantity/Room"
        }
    ]

    const closeModal = () => {
        setShowModal(false);
    }

    const getInventories = async () => {
        const res = await fetchGetData(`/inventory/room/${id}`, setLoading);
        if (res?.success) {
            setInventories(res?.data || []);
        }
    }

    const getRoomData = async () => {
        const res = await fetchGetData(`/room/${id}`);
        if (res?.success) {
            setRoom(res?.data || {});
        }
    }

    useEffect(() => {
        getInventories();
        getRoomData();
    }, [])

    const addNewUser = async (inventory: any) => {
        if (!inventory?.inventory || !inventory?.quantity) {
            message.warning("Please fill all the fields!!");
            return;
        }
        const res = await fetchData("/inventory/room", setFormSubmitLoading, "POST", { room: id, ...inventory });
        if (res?.success) {
            message.success("Inventory added successfully!!");
            setTimeout(() => {
                getInventories();
                closeForm();
            }, 1000)
        } else {
            message.error(res.message);
        }
    }

    const editInventory = async (inventory: any) => {
        const res = await fetchData("/inventory/room", setFormSubmitLoading, "PATCH", { _id: inventory?._id, room: id, ...inventory });
        if (res?.success) {
            message.success("Inventory details edited successfully!!");
            setTimeout(() => {
                getInventories();
                closeForm();
            }, 1000)
        } else {
            message.error(res.message);
        }
        closeModal();
    }

    const handleEdit = (inventory: any) => {

        if (!inventory?.inventory || !inventory?.quantity) {
            message.warning("Please fill all the fields!!");
            return;
        }

        setModalData(() => (
            {
                title: `Are you sure, you want to edit ${inventory?.name || "inventory"} 's details ?`,
                desc: `This action will edit ${inventory?.name || "inventory"}'s details !!`,
                confirmText: "Confirm",
                cancelText: "Cancel",
                confirmHandler: () => {
                    editInventory(inventory);
                }
            }
        ));
        setShowModal(true);
    }

    const deleteInventory = async (inventory: any) => {
        const res = await fetchData("/inventory/room", setModalLoading, "DELETE", { _id: inventory?._id });
        if (res?.success) {
            message.success("Inventory details deleted successfully!!");
            getInventories();
        } else {
            message.error(res.message);
        }
        closeModal();
    }

    const handleDelete = (inventory: any) => {

        setModalData(() => (
            {
                title: `Are you sure, you want to delete ${inventory?.name || "inventory"} ?`,
                desc: `This action will permanently delete ${inventory?.name || "inventory"} inventory and can't be undo!!`,
                confirmText: "Delete",
                cancelText: "Cancel",
                confirmHandler: () => {
                    deleteInventory(inventory);
                }
            }
        ));
        setShowModal(true);
    }

    const closeForm = () => {
        setShowForm(false);
        setEditForm(false);
        setEditUserData("");
    }

    const handleBulkDelete = () => {
        // setInven((prev:any) => prev.filter((item: any) => !selectedIds.includes(item?._id)));
        // setSelectedIds([]);
    };

    const handleDownloadReport = () => {
        const csv = [
            ['Name', 'Rent', 'Rooms'],
            ...filteredData.map((d: any) => [d.roomName, `$${d.rent}/day`, d.totalRooms])
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
            setSelectedIds(inventories.map((item: any) => item._id));
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


    const filteredData = inventories
        .filter((item : any) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const openEditingForm = (data: any) => {
        console.log(data)
        setEditUserData(data);
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
                    <Loader text="Loading Room Inventory..." />
                ) :
                    !showForm ? (
                        <>
                            <Heading
                                handleBulkDelete={handleBulkDelete}
                                handleDownloadReport={handleDownloadReport}
                                searchTerm={searchTerm}
                                selectedIds={selectedIds}
                                setSearchTerm={setSearchTerm}
                                placeholder="Search Inventory..."
                                heading={`${room?.roomName || "Room"} Inventory`}
                                showFilter={false}
                                onAdd={() => setShowForm(true)}
                            />

                            <div className="overflow-x-auto">
                                <Table
                                    data={filteredData}
                                    columns={columns}
                                    onEdit={openEditingForm}
                                    onDelete={handleDelete}
                                    onSelect={handleSelect}
                                    onSelectAll={handleSelectAll}
                                    selectedIds={selectedIds}
                                />
                            </div>
                        </>
                    ) : (
                        <RoomInventoryForm
                            title={editForm ? "Update Room Inventory" : "Add New Inventory"}
                            edit={editForm}
                            initialUserData={editUserData}
                            goBackHandler={closeForm}
                            submitHandler={editForm ? handleEdit : addNewUser}
                            loading={formSubmitLoading}
                        />
                    )
            }
        </Wrapper>
    )
}

export default RoomInventory
