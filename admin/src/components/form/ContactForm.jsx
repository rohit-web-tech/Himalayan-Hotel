import { useState, useEffect } from 'react'
import InputBox from './InputBox'
import Submit from './Submit'
import ImagePreview from './ImagePreview'
import { message } from "antd";
import Loader from '../loader';

const Contact = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [data, setData] = useState({
        contact: "",
        email: "",
        address: "",
        imageUrl: ""
    })
    const [loading, setLoading] = useState(true);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        fetch(`${BASE_URL}/getContact`)
            .then(res => res.json())
            .then(res => {
                if (res.message == "success") {
                    setData(res?.contact || {
                        contact: "",
                        email: "",
                        address: "",
                        imageUrl: ""
                    });
                }
            }).catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getData();
    }, [])

    const addNewData = () => {
        if (!data?.contact || !data?.email || !data?.address || !data?.imageUrl) {
            message.warning("Please fill all the fields!!");
            return;
        }
        setFormSubmitLoading(true);
        fetch(`${BASE_URL}/setContact`, {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": {
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                if (res.message == "success") {
                    message.success("Contact details edited successfully!!");
                    setData(res?.contact || {
                        contact: "",
                        email: "",
                        address: "",
                        imageUrl: ""
                    });
                } else {
                    message.error(res.message);
                }
            }).catch(err => {
                message.error(err);
            }).finally(() => {
                setFormSubmitLoading(false)
            })
    }

    const handleUserInput = (e) => {
        setData(data => ({ ...data, [e.target.name]: e.target.value }))
    }

    return (
        <div className='sm:px-14 px-6 mt-4 w-full md:w-[calc(100%-300px)]  mb-3 flex flex-col justify-center'>
            {
                loading ? (
                    <Loader styles="h-10 w-10 my-[calc(50vh-40px)]" />
                ) : (
                    <>
                        <h3 className='text-base text-gray-700 font-semibold mb-2 mt-3'>Contact</h3>
                        <form className='flex flex-col gap-3' onSubmit={(e) => {
                            e.preventDefault();
                            addNewData();
                        }}>
                            <InputBox
                                handleUserInput={handleUserInput}
                                name="contact"
                                type="text"
                                placeholder="Enter Contact Number"
                                value={data?.contact}
                                label="Contact Number"
                            />
                            <InputBox
                                handleUserInput={handleUserInput}
                                name="email"
                                type="text"
                                placeholder="Enter Email"
                                value={data?.email}
                                label="Email"
                            />
                            <InputBox
                                handleUserInput={handleUserInput}
                                name="address"
                                type="text"
                                placeholder="Enter Address"
                                value={data?.address}
                                label="Address"
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

export default Contact