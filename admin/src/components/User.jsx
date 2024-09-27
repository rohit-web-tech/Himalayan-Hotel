import { useEffect, useState } from 'react'
import Table, { TD, TR } from './Table'
import Header from './Header';
import UserForm from './form/UserForm';
import { message } from "antd";
import Loader from './loader';
import NoData from './NoData';
import { fetchData, fetchGetData } from '../lib/fetchData';
import Modal from './modal/Modal';

const User = () => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [editUserData, setEditUserData] = useState("");
    const [loading, setLoading] = useState(true);
    const [modalLoading, setModalLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [modalData, setModalData] = useState({
        title: "",
        desc: "",
        cancelText: "",
        confirmText: "",
    });

    const closeModal = () => {
        setShowModal(false);
    }

    const getUsers = async () => {
        const res = await fetchGetData("/user/allUsers", setLoading);
        if (res?.success) {
            setUsers(res?.data || []);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const addNewUser = async (user) => {
        if (!user?.name || !user?.email || !user?.contactNumber || !user?.password) {
            message.warning("Please fill all the fields!!");
            return;
        }
        const res = await fetchData("/user/registerUser", setFormSubmitLoading, "POST", user);
        if (res?.success) {
            message.success("User registered successfully!!");
            setTimeout(() => {
                getUsers();
                closeForm();
            }, 1000)
        } else {
            message.error(res.message);
        }
    }

    const editUser = async (user) => {
        const res = await fetchData("/user/editUser", setFormSubmitLoading, "PATCH", { userId: user?._id, ...user });
        if (res?.success) {
            message.success("User details edited successfully!!");
            setTimeout(() => {
                getUsers();
                closeForm();
            }, 1000)
        } else {
            message.error(res.message);
        }
        closeModal();
    }

    const handleEdit = (user) => {

        if (!user?.name || !user?.email || !user?.contactNumber || !user?.password) {
            message.warning("Please fill all the fields!!");
            return;
        }

        setModalData(() => (
            {
                title: `Are you sure, you want to edit ${user?.name || "User"} 's details ?`,
                desc: `This action will edit ${user?.name || "User"}'s details !!`,
                confirmText: "Confirm",
                cancelText: "Cancel",
                confirmHandler: () => {
                    editUser(user);
                }
            }
        ));
        setShowModal(true);
    }

    const deleteUser = async (user) => {
        const res = await fetchData("/user/deleteUser", setModalLoading, "DELETE", { userId: user?._id });
        if (res?.success) {
            message.success("User details deleted successfully!!");
            getUsers();
        } else {
            message.error(res.message);
        }
        closeModal();
    }

    const handleDelete = (user) => {

        setModalData(() => (
            {
                title: `Are you sure, you want to delete ${user?.name || "User"} ?`,
                desc: `This action will permanently delete ${user?.name || "User"}'s profile and can't be undo!!`,
                confirmText: "Delete",
                cancelText: "Cancel",
                confirmHandler: () => {
                    deleteUser(user);
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
        "Email",
        "Phone No.",
        "Edit",
        "Delete"
    ]

    const rowData = () => {
        return users?.map((user, i) => (
            <TR key={user.id}>
                <TD>{i + 1}</TD>
                <TD>{user?.name || "Guest"}</TD>
                <TD>{user?.email || "guest@example.com"}</TD>
                <TD>{user?.contactNumber || user?.userNumber || "00000-999999"}</TD>
                <TD><button
                    className='bg-blue-600 py-1 px-6 text-white rounded-lg text-xs'
                    onClick={() => {
                        setEditUserData(user);
                        setEditForm(true);
                        setShowForm(true);
                    }}
                >Edit</button></TD>
                <TD><button
                    className='bg-red-600 py-1 px-6 text-white rounded-lg text-xs'
                    onClick={() => {
                        handleDelete(user);
                    }}
                >Delete</button></TD>
            </TR>
        ))
    }

    return (
        <div className='flex flex-col  w-full md:w-[calc(100%-300px)] sm:px-14 px-6 py-3'>
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
                                title="Users"
                                handleBtn={() => {
                                    setShowForm(true);
                                }}
                                btnText="Add new user"
                            />
                            {
                                users?.length < 1 ? (
                                    <div className='h-screen flex justify-center items-center'>
                                        <NoData
                                            title='No User found !!'
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
                        <UserForm
                            title="Create New User"
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

export default User;