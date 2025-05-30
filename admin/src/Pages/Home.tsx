import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { fetchData, fetchGetData } from "../lib/fetchData";
import { message } from "antd";
import Loader from "../components/Loader";
import Form, { FormField } from "../components/form/Form";
import ConfirmModal from "../components/ConfirmModal";

const Home = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const [formLoading, setFormLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState<any>({
        title: "",
        desc: "",
        cancelText: "",
        confirmText: "",
        confirmHandler: ""
    });

    const formFields : FormField[] = [
        {
            label: "Title",
            name: "title",
            type: "text",
            required: true
        },
        {
            label: "Description",
            name: "subtitle",
            type: "textarea",
            required: true
        }
    ] 

    const closeModal = () => {
        setShowModal(false);
    }

    const getData = async () => {
        const data = await fetchGetData("/home", setLoading);
        console.log(data)
        if (data?.success) {
            setData(data?.data || {
                title: "",
                subtitle: "",
                imageUrl: ""
            });
        } else {
            message.error(data.message);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const addNewData = async (data:any, image : File | null) => {

        const formData = new FormData();
        formData.append("title", data?.title)
        formData.append("subtitle", data?.subtitle)
        formData.append("image", image ? image : data?.image)

        const res = await fetchData("/home", setFormLoading, "POST", formData);
        if (res?.success) {
            message.success("Home details edited successfully!!");
            setData(res?.data || {
                title: "",
                subtitle: "",
                imageUrl: ""
            });
        } else {
            message.error(res?.message);
        }
        closeModal();

    }

    const handleEdit = (data : any, image : File | null) => {

        if (!data?.title || !data?.subtitle || (!data?.image && !image)) {
            message.warning("Please fill all the fields!!");
            return;
        }

        setModalData(() => (
            {
                title: `Are you sure, you want to edit home's details ?`,
                desc: `This action will edit home's details !!`,
                confirmText: "Confirm",
                cancelText: "Cancel",
                confirmHandler: () => addNewData(data,image)
            }
        ));
        setShowModal(true);
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
                loading={false}
            />

            {
                loading ? (
                    <Loader text="Loading Home Data..." />
                ) : (
                    <Form
                        title={"Update Home Details"}
                        isEditing={true}
                        intialData={data}
                        goBackHandler={()=>{}}
                        onSubmit={handleEdit}
                        loading={formLoading}
                        fields={formFields}
                    />
                )
            }
        </Wrapper>
    );
};

export default Home;
