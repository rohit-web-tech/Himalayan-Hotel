import { useState, useEffect } from 'react'
import InputBox from './InputBox'
import Submit from './Submit'
import ImagePreview from './ImagePreview'
import { message } from "antd";
import Loader from '../loader';
import { fetchData, fetchGetData } from '../../lib/fetchData';
import Modal from '../modal/Modal';

const Home = () => {
    const [data, setData] = useState({
        title: "",
        subtitle: "",
        imageUrl: ""
    })
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

    const addNewData = async () => {

        const res = await fetchData("/home", setModalLoading, "POST", data);
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


    const handleEdit = () => {

        if (!data?.title || !data?.subtitle || !data?.imageUrl) {
            message.warning("Please fill all the fields!!");
            return;
        }

        setModalData(() => (
            {
                title: `Are you sure, you want to edit home's details ?`,
                desc: `This action will edit home's details !!`,
                confirmText: "Confirm",
                cancelText: "Cancel",
                confirmHandler: addNewData
            }
        ));
        setShowModal(true);
    }

    const handleUserInput = (e) => {
        setData(data => ({ ...data, [e.target.name]: e.target.value }))
    }

    return (
        <div className='sm:px-14 px-6 mt-4  w-full md:w-[calc(100%-300px)]  mb-3 flex flex-col justify-center'>
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
                    <Loader styles="h-10 w-10 my-[calc(50vh-40px)]" />
                ) : (
                    <>
                        <h3 className='text-base text-gray-700 font-semibold mb-2 mt-3'>Home</h3>
                        <form className='flex flex-col gap-3' onSubmit={(e) => {
                            e.preventDefault();
                            handleEdit();
                        }}>
                            <InputBox
                                handleUserInput={handleUserInput}
                                name="title"
                                type="text"
                                placeholder="Enter Title"
                                value={data?.title}
                                label="Title"
                            />
                            <InputBox
                                handleUserInput={handleUserInput}
                                name="subtitle"
                                type="text"
                                placeholder="Enter subtitle"
                                value={data?.subtitle}
                                label="Subtitle"
                            />
                            <InputBox
                                handleUserInput={handleUserInput}
                                name="imageUrl"
                                type="text"
                                placeholder="Enter Image Url"
                                value={data?.imageUrl}
                                label="Image"
                            />
                            <ImagePreview
                                src={data?.imageUrl}
                            />
                            <Submit value={formSubmitLoading ? <Loader styles='h-4 w-4' /> : "Save Changes"} />
                        </form>
                    </>
                )
            }
        </div>
    )
}

export default Home