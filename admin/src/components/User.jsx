import { useEffect, useState } from 'react'
import Table, { TD, TR } from './Table'
import Header from './Header';
import UserForm from './form/UserForm';
import { message } from "antd";
import Loader from './loader';
import NoData from './NoData';
import { fetchData, fetchGetData } from '../lib/fetchData';

const User = () => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [editUserData, setEditUserData] = useState("");
    const [loading, setLoading] = useState(true);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);

    const getUsers = async () => {
        const res = await fetchGetData("/allUsers", setLoading);
        if (res?.success) {
            console.log(res)
            setUsers(res?.users || []);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const addNewUser = async (user) => {
        if (!user?.userName || !user?.userEmail || !user?.userNumber || !user?.userPassword) {
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
        if (!user?.userName || !user?.userEmail || !user?.userNumber || !user?.userPassword) {
            message.warning("Please fill all the fields!!");
            return;
        }
        const res = await fetchData("/editUser", setFormSubmitLoading, "PATCH", user);
        if (res?.success) {
            message.success("User details edited successfully!!");
            setTimeout(() => {
                getUsers();
                closeForm();
            }, 1000)
        } else {
            message.error(res.message);
        }
    }

    const deleteUser = async (user) => {
        const userConfirmation = confirm(`Are you sure, you want to delete ${user?.userName || "User"} ?`);

        if (!userConfirmation) return;

        const res = await fetchData("/deleteUser", setFormSubmitLoading, "DELETE", user);
        if (res?.success) {
            message.success("User details deleted successfully!!");
            getUsers();
        } else {
            message.error(res.message);
        }
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
                <TD>{user?.userName || "Guest"}</TD>
                <TD>{user?.userEmail || "guest@example.com"}</TD>
                <TD>{user?.userContact || user?.userNumber || "00000-999999"}</TD>
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
                        deleteUser(user);
                    }}
                >Delete</button></TD>
            </TR>
        ))
    }

    return (
        <div className='flex flex-col  w-full md:w-[calc(100%-300px)] sm:px-14 px-6 py-3'>
            {
                loading ? (
                    <Loader styles='w-10 h-10 my-[calc(50vh-40px)]' />
                ) :
                    users?.length < 1 ? (
                        <div className='h-screen flex justify-center items-center'>
                            <NoData
                                title='No User found !!'
                            />
                        </div>
                    ) : (
                        !showForm ? (
                            <>
                                <Header
                                    title="Users"
                                    handleBtn={() => {
                                        setShowForm(true);
                                    }}
                                    btnText="Add new user"
                                />
                                <Table tableFields={tableFeilds} tableRows={rowData} />
                            </>
                        ) : (
                            <UserForm
                                title="Create New User"
                                edit={editForm}
                                initialUserData={editUserData}
                                goBackHandler={closeForm}
                                submitHandler={editForm ? editUser : addNewUser}
                                loading={formSubmitLoading}
                            />
                        )
                    )
            }

        </div>
    )
}

export default User;