import { useEffect, useState } from "react";
import Table from "../components/table/Table";
import Wrapper from "../components/Wrapper";
import Heading from "../components/Heading";
import { fetchData, fetchGetData } from "../lib/fetchData";
import { message } from "antd";
import Form, { FormField } from "../components/form/Form";
import Loader from "../components/Loader";
import ConfirmModal from "../components/ConfirmModal";

const Inventory = () => {

    const columns = [
        {
            label: 'Image',
            key: 'image',
        },
        {
            label: 'Inventory',
            key: 'name',
        },
        {
            label: 'Quantity',
            key: 'totalQuantity',
        },
        {
            label: 'Price',
            key: 'price',
        },
        {
            label: 'Total Cost',
            key: 'totalPrice',
        }
    ];

    const formFields: FormField[] = [
        {
            label: "Inventory Name",
            name: "name",
            type: "text",
        },
        {
            label: "Price",
            name: "price",
            type: "number",
        }
    ]

    const [inventories, setInventories] = useState([]);
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

    const getInventories = async () => {
        const res = await fetchGetData("/inventory/allWithQuantity", setLoading);
        if (res?.success) {
            setInventories(res?.data || []);
        }
    }

    useEffect(() => {
        getInventories();
    }, [])

    const addNewInventory = async (inventory: any, image: File | null) => {
        if (!inventory?.name || !inventory?.price || !image) {
            message.warning("Please fill all the fields!!");
            return;
        }
        const formData = new FormData();
        formData.append('name', inventory?.name);
        formData.append('price', inventory?.price);
        formData.append('image', image);
        const res = await fetchData("/inventory", setFormSubmitLoading, "POST", formData);
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

    const editInventory = async (inventory: any, image: File | null) => {
        const formData = new FormData();
        formData.append('_id', inventory?._id);
        formData.append('newName', inventory?.name);
        formData.append('price', inventory?.price);
        formData.append('image', image ? image : inventory?.image);
        const res = await fetchData("/inventory", setFormSubmitLoading, "PATCH", formData)
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

    const handleEdit = (inventory: any, image: File | null) => {

        if (!inventory?.name || !inventory?.price) {
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
                    editInventory(inventory, image);
                }
            }
        ));
        setShowModal(true);
    }

    const deleteInventory = async (inventory: any) => {
        const res = await fetchData("/inventory", setModalLoading, "DELETE", { _id: inventory?._id });
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

    const [data, setData] = useState([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleBulkDelete = () => {
        setData(prev => prev.filter((item: any) => !selectedIds.includes(item._id)));
        setSelectedIds([]);
    };

    const handleDownloadReport = () => {
        const csv = [
            ['Inventory', 'Quantity', 'Price'],
            ...data.map((d : any) => [d.inventory, d.quantity, d.price])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "inventory_report.csv";
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
            setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
        }
    };

    const filteredData = inventories.filter((item : any) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const openEditingForm = (data: any) => {
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
                    <Loader text="Loading Staff Data..." />
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
                                heading="Inventory"
                                onAdd={() => setShowForm(true)}
                                showFilter={false}
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
                            title={editForm ? "Update Inventory Details" : "Add New Inventory"}
                            isEditing={editForm}
                            intialData={editUserData}
                            goBackHandler={closeForm}
                            onSubmit={editForm ? handleEdit : addNewInventory}
                            loading={formSubmitLoading}
                            fields={formFields}
                        />
                    )
            }
        </Wrapper>
    );
};

export default Inventory;