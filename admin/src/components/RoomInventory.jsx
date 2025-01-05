import { useEffect, useState } from 'react'
import Table, { TD, TR } from './Table'
import Header from './Header';
import { message } from "antd";
import Loader from "./loader.jsx"
import NoData from "./NoData.jsx";
import { fetchData, fetchGetData } from '../lib/fetchData.js';
import Modal from './modal/Modal.jsx';
import {useParams} from "react-router-dom";
import RoomInventoryForm from './form/RoomInventoryForm.jsx';

const RoomInventory = () => {
    const {id} = useParams() ;
    const [room,setRoom] = useState({});
    const [inventories, setInventories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [editUserData, setEditUserData] = useState("");
    const [loading, setLoading] = useState(true);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({
        title: "",
        desc: "",
        cancelText: "",
        confirmText: "",
        confirmHandler: ""
    });

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
        if(res?.success){
            setRoom(res?.data || {});
        }
    }

    useEffect(() => {
        getInventories();
        getRoomData();
    }, [])

    const addNewUser = async (inventory) => {
        if (!inventory?.inventory || !inventory?.quantity) {
            message.warning("Please fill all the fields!!");
            return;
        }
        const res = await fetchData("/inventory/room", setFormSubmitLoading, "POST", {room : id , ...inventory});
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

    const editInventory = async (inventory) => {
        const res = await fetchData("/inventory/room", setFormSubmitLoading, "PATCH", { _id : inventory?._id, room : id , ...inventory });
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

    const handleEdit = (inventory) => {

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

    const deleteInventory = async (inventory) => {
        const res = await fetchData("/inventory/room", setModalLoading, "DELETE", { _id: inventory?._id });
        if (res?.success) {
            message.success("Inventory details deleted successfully!!");
            getInventories();
        } else {
            message.error(res.message);
        }
        closeModal();
    }

    const handleDelete = (inventory) => {

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
        setSubmitHandler(() => { });
    }

    const tableFeilds = [
        "#",
        "Name",
        "Quantity",
        "Edit",
        "Delete"
    ]

    const rowData = () => {
        return inventories?.map((inventory, i) => (
            <TR key={inventory.id}>
                <TD>{i + 1}</TD>
                <TD>{inventory?.item?.name || "Unknown"}</TD>
                <TD>{inventory?.quantity || 0}</TD>
                <TD><button
                    className='bg-blue-600 py-1 px-6 text-white rounded-lg text-xs'
                    onClick={() => {
                        setEditUserData(inventory);
                        setEditForm(true);
                        setShowForm(true);
                    }}
                >Edit</button></TD>
                <TD><button
                    className='bg-red-600 py-1 px-6 text-white rounded-lg text-xs'
                    onClick={() => {
                        handleDelete(inventory);
                    }}
                >Delete</button></TD>
            </TR>
        ))
    }

    return (
        <div className='flex flex-col w-full md:w-[calc(100%-300px)] sm:px-14 px-6 py-3'>
            <Modal
                show={showModal}
                confirmText={modalData?.confirmText}
                cancelText={modalData?.cancelText}
                onConfirm={modalData?.confirmHandler}
                loading={modalLoading}
                title={modalData?.title}
                desc={modalData?.desc}
                type="confirm"
                onCancel={closeModal}
            />
            {
                loading ? (
                    <Loader styles='w-10 h-10 my-[calc(50vh-40px)]' />
                ) :
                    !showForm ? (
                        <>
                            <Header
                                title={`${room?.roomName ?? "Room"} Inventory`}
                                handleBtn={() => {
                                    setShowForm(true);
                                }}
                                btnText="Add new inventory"
                            />
                            {
                                inventories?.length < 1 ? (
                                    <div className='h-screen flex justify-center items-center'>
                                        <NoData
                                            title='No Inventory found !!'
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <Table tableFields={tableFeilds} tableRows={rowData} />
                                    </>
                                )
                            }
                        </>
                    ) : (
                        <RoomInventoryForm
                            title="Create New Inventory"
                            edit={editForm}
                            initialUserData={editUserData}
                            goBackHandler={closeForm}
                            submitHandler={editForm ? handleEdit : addNewUser}
                            loading={formSubmitLoading}
                        />
                    )

            }

        </div>
    )
}

export default RoomInventory ;