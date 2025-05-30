import { useEffect, useState } from "react";
import Table from "../components/table/Table"
import Wrapper from "../components/Wrapper";
import Heading from "../components/Heading";
import { fetchData, fetchGetData } from "../lib/fetchData";
import { message } from "antd";
import ConfirmModal from "../components/ConfirmModal";
import Loader from "../components/Loader";
import Form, { FormField } from "../components/form/Form";
import { column } from "../components/table/TableHeader";

const Users = () => {

    const formFields: FormField[] = [
        {
            label: "Name",
            name: "name",
            type: "text",
            required: true
        },
        {
            label: "Email",
            name: "email",
            type: "email",
            required: true
        },
        {
            label: "Phone",
            name: "contactNumber",
            type: "number",
            required: true
        },
        {
            label: "Password",
            name: "password",
            type: "password",
            required: true
        },
    ]

    const columns: column[] = [
        {
            label: 'Image',
            key: 'image'
        },
        {
            label: 'Name',
            key: 'name'
        },
        {
            label: 'Email',
            key: 'email'
        },
        {
            label: 'Contact Number',
            key: 'contactNumber'
        }
    ];

    const [data, setData] = useState<any>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [editUserData, setEditUserData] = useState("");
    const [loading, setLoading] = useState(true);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState<any>({
        title: "",
        desc: "",
        cancelText: "",
        confirmText: "",
        confirmHandler: ""
    });

    const closeModal = () => {
        setShowModal(false);
    }

    const getUsers = async () => {
        const res = await fetchGetData("/user/allUsers", setLoading);
        if (res?.success) {
            setData(res?.data || []);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const addNewUser = async (user: any, image : File | null) => {
        console.log(image)
        if (!user?.name || !user?.email || !user?.contactNumber || !user?.password || !image) {
            message.warning("Please fill all the fields!!");
            return;
        }
        const formData = new FormData();
        formData.append('name', user?.name);
        formData.append('email', user?.email);
        formData.append('contactNumber', user?.contactNumber);
        formData.append('password', user?.password);
        formData.append('image', image);
        const res = await fetchData("/user/registerUser", setFormSubmitLoading, "POST", formData);
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

    const editUser = async (user: any, image : File | null ) => {
        const formData = new FormData();
        formData.append('name', user?.name);
        formData.append('email', user?.email);
        formData.append('contactNumber', user?.contactNumber);
        formData.append('password', user?.password);
        formData.append('userId', user?._id);
        formData.append('image', image ? image : user?.image);
        const res = await fetchData("/user/editUser", setFormSubmitLoading, "PATCH", formData);
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

    const handleEdit = (user: any, image : File | null ) => {

        if (!user?.name || !user?.email || !user?.contactNumber || !user?.password || !user?.image) {
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
                    editUser(user,image);
                }
            }
        ));
        setShowModal(true);
    }

    const deleteUser = async (user: any) => {
        const res = await fetchData("/user/deleteUser", setModalLoading, "DELETE", { userId: user?._id });
        if (res?.success) {
            message.success("User details deleted successfully!!");
            getUsers();
        } else {
            message.error(res.message);
        }
        closeModal();
    }

    const handleDelete = (user: any) => {

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
    }

    const handleBulkDelete = () => {
        setData((prev: any) => prev.filter((item: any) => !selectedIds.includes(item.id)));
        setSelectedIds([]);
    };

    const openEditingForm = (data: any) => {
        console.log("Editing data", data)
        setEditUserData(data);
        setEditForm(true);
        setShowForm(true);
    }

    const handleDownloadReport = () => {
        const csv = [
            ['ID','Name', 'Email', 'Role'],
            ...data.map((d: any) => [d?._id,d.name, d.email, d.role])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "users_report.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(data.map((item: any) => item._id));
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


    const filteredData = data
        .filter((user: any) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )

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
                    <Loader text="Loading User Data..." />
                ) :
                    !showForm ? (
                        <>
                            <Heading
                                handleBulkDelete={handleBulkDelete}
                                handleDownloadReport={handleDownloadReport}
                                searchTerm={searchTerm}
                                selectedIds={selectedIds}
                                setSearchTerm={setSearchTerm}
                                placeholder="Search Users..."
                                heading="Users"
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
                        <Form
                            title={editForm ? "Update User Details" : "Add New User"}
                            isEditing={editForm}
                            intialData={editUserData}
                            goBackHandler={closeForm}
                            onSubmit={editForm ? handleEdit : addNewUser}
                            loading={formSubmitLoading}
                            fields={formFields}
                        />
                    )
            }
        </Wrapper>
    )
}

export default Users ;
