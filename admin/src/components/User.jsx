import { useEffect, useState } from 'react'
import Table, { TD, TR } from './Table'
import Header from './Header';
import UserForm from './form/UserForm';
import { message } from "antd";

const User = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [editUserData, setEditUserData] = useState("");

    const getUsers = async () => {
        fetch(`${BASE_URL}/allUsers`)
            .then(res => res.json())
            .then(res => {
                if (res.message === "success") {
                    console.log(res)
                    setUsers(res?.users || []);
                }
            }).catch(err => console.log(err));
    }

    useEffect(() => {
        getUsers();
    }, [])

    const addNewUser = (user) => {
        if (!user?.userName || !user?.userEmail || !user?.userNumber || !user?.userPassword) {
            message.warning("Please fill all the fields!!");
            return;
        }
        fetch(`${BASE_URL}/registerUser`, {
            "method": "POST",
            "body": JSON.stringify(user),
            "headers": {
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                if (res.message == "success") {
                    message.success("User registered successfully!!");
                    setTimeout(() => {
                        getUsers();
                        closeForm();
                    }, 1000)
                } else {
                    message.error(res.message);
                }
            }).catch(err => {
                message.error(err);
            })
    }

    const editUser = (user) => {
        if (!user?.userName || !user?.userEmail || !user?.userNumber || !user?.userPassword) {
            message.warning("Please fill all the fields!!");
            return;
        }

        fetch(`${BASE_URL}/editUser`, {
            "method": "PATCH",
            "body": JSON.stringify(user),
            "headers": {
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                if (res.message == "success") {
                    message.success("User details edited successfully!!");
                    setTimeout(() => {
                        getUsers();
                        closeForm();
                    }, 1000)
                } else {
                    message.error(res.message);
                }
            }).catch(err => {
                message.error(err);
            })
    }

    const deleteUser = (user) => {
        const userConfirmation = confirm(`Are you sure, you want to delete ${user?.userName || "User"} ?`);

        if(!userConfirmation) return ;
        fetch(`${BASE_URL}/deleteUser`, {
            "method": "delete",
            "body": JSON.stringify(user),
            "headers": {
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                if (res.message == "success") {
                    message.success("User details deleted successfully!!");
                    getUsers();
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
                    />
                )
            }

        </div>
    )
}

export default User
